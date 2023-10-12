#!/usr/bin/env python3
import os
import re
import subprocess
import sys
import time
from typing import Union, List

SERVICE_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCHEMA_ROOT = os.path.join(SERVICE_ROOT, "schemas")
MIGRATION_LOG = "migration.log"


def wait_for_db_connection(attempts: int, delay: Union[float, int]) -> bool:
    connected = False
    for _ in range(attempts):
        with open(os.devnull, "w") as null_file:
            status = subprocess.call(
                ["psql", "-c", "SELECT 1"], stdout=null_file, stderr=subprocess.STDOUT
            )

        if status == 0:
            connected = True
            break

        time.sleep(delay)

    return connected


def determine_last_migration() -> int:
    # lookup the existing migrations table
    cmd = ["psql", "-c", "SELECT id FROM migrations ORDER BY id DESC LIMIT 1", "--csv"]
    try:
        with open(os.devnull, "w") as null_file:
            output = (
                subprocess.check_output(cmd, stderr=null_file).decode().splitlines()[1:]
            )
    except subprocess.CalledProcessError:
        return 0  # the table does not exist

    if len(output) == 0:
        return 0  # the table is present, but is empty

    return int(output[0])


def scan_migrations() -> List[str]:
    collected = {}

    items = os.listdir(SCHEMA_ROOT)
    for line in items:
        match = re.match(r"^(\d{3})-.*\.sql$", line.strip())
        if match is None:
            continue

        idx = int(match.group(1))
        assert idx not in collected
        collected[idx] = os.path.join(SCHEMA_ROOT, line)

    if len(collected) == 0:
        return []

    min_idx = min(collected.keys())
    max_idx = max(collected.keys())

    if min_idx != 0:
        raise RuntimeError("Bad starting index")

    output = []
    for n in range(max_idx + 1):
        if n not in collected:
            raise RuntimeError(f"Unable to lookup migration {n}")

        output.append(collected[n])

    return output


def apply_migration(index: int, path: str):
    print(f"Applying migration {index}...")

    with open(MIGRATION_LOG, "a") as migration_log:
        subprocess.check_call(
            ["psql", "-f", path], stdout=migration_log, stderr=subprocess.STDOUT
        )
        subprocess.check_call(
            ["psql", "-c", f"INSERT INTO migrations(id) VALUES ({index})"],
            stdout=migration_log,
            stderr=subprocess.STDOUT,
        )

    print(f"Applying migration {index}...complete")


def main():
    migrations = scan_migrations()

    # wait for the database connection to spin up
    if not wait_for_db_connection(2, 1):
        print("Database appears not to be online")
        sys.exit(1)

    last_migration = determine_last_migration()

    next_migration = last_migration + 1
    applied_migrations = False
    for idx, path in enumerate(migrations[next_migration:], start=next_migration):
        apply_migration(idx, path)
        applied_migrations = True

    # clean up the migration log if present
    if os.path.isfile(MIGRATION_LOG):
        os.remove(MIGRATION_LOG)

    if not applied_migrations:
        print("No migrations to apply")


if __name__ == "__main__":
    main()