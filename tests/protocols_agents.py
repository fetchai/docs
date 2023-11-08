import time
import subprocess

from utils import create_files_from_json, multiple_file_struture, close_process_on_port
from constants import PORTS

base_path = "."

cleaning_demo_structure = {
    "cleaning_demo": {
        "protocols": {"cleaning": {"__init__.py": "", "models.py": ""}},
        "cleaner.py": "",
        "user.py": "",
    }
}

booking_demo_structure = {
    "booking_demo": {
        "protocols": {"query.py": "", "book.py": ""},
        "restaurant.py": "",
        "user.py": "",
    }
}


def booking_demo(mdx_filename):
    file_contents = multiple_file_struture(mdx_filename)
    create_files_from_json(base_path, booking_demo_structure, file_contents)
    time.sleep(4)
    message_from_user = "Table reservation was successful"
    [close_process_on_port(port) for port in PORTS]
    shell_script_path = "./scripts/booking_demo.sh"
    result = subprocess.run(
        ["/bin/bash", shell_script_path],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
    )
    output = result.stdout
    print(output)
    error = result.stderr

    if message_from_user in output:
        assert True
    else:
        assert False


def cleaning_demo(mdx_filename):
    file_contents = multiple_file_struture(mdx_filename)
    create_files_from_json(base_path, cleaning_demo_structure, file_contents)
    time.sleep(4)
    message_from_user = "Booking was successful"
    [close_process_on_port(port) for port in PORTS]
    shell_script_path = "./scripts/cleaning_demo.sh"
    result = subprocess.run(
        ["/bin/bash", shell_script_path],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
    )
    output = result.stdout
    print(output)
    error = result.stderr

    if message_from_user in output:
        assert True
    else:
        assert False
