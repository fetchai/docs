import os
import re
import ast
from black import FileMode, format_str
import socket
import psutil
import tempfile
import time
import subprocess
from constants import OUTPUT_FOLDER, ROOT_DIR


if not os.path.exists(OUTPUT_FOLDER):
    os.makedirs(OUTPUT_FOLDER)


def create_files(code_blocks, file_name):
    for block_filename, code_content in code_blocks:
        if not is_valid_python_code(code_content):
            assert False
        formatted_code = format_str(code_content, mode=FileMode())
        print(formatted_code, "code")
        code_file_path = os.path.join(OUTPUT_FOLDER, block_filename)
        with open(code_file_path, "w") as f:
            f.write(formatted_code)


def terminate_process_by_port(port):
    existing_ports = set(conn.laddr.port for conn in psutil.net_connections())
    if port in existing_ports:
        for proc in psutil.process_iter(attrs=["pid", "name"]):
            try:
                connections = proc.connections()
                for conn in connections:
                    if conn.laddr.port == port:
                        print(
                            f"Terminating process {proc.info['pid']} using port {port}"
                        )
                        process = psutil.Process(proc.info["pid"])
                        process.terminate()
                        process.wait(timeout=5)
            except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
                pass


def close_process_on_port(port):
    try:
        result = (
            subprocess.check_output(f"lsof -t -i:{port}", shell=True).decode().strip()
        )
        pids = result.split("\n")

        for pid in pids:
            subprocess.check_output(f"kill -9 {pid}", shell=True)
            print(f"Successfully terminated process with PID {pid} on port {port}")

    except subprocess.CalledProcessError as e:
        print(f"No process found on port {port} or error occurred: {e}")

    except ValueError:
        print(f"No process found on port {port}")


def file_read(file_path):
    with open(file_path, "r") as file:
        file_content = file.read()
        code_blocks = re.findall(
            r'```py copy filename="([^"]+)"\n(.*?)```',
            file_content,
            re.DOTALL,
        )
    return code_blocks


def process_code_block(code_blocks):
    for block_filename, code_content in code_blocks:
        if not is_valid_python_code(code_content):
            return
        formatted_code = format_str(code_content, mode=FileMode())
        with tempfile.TemporaryDirectory() as temp_dir:
            temp_file_path = os.path.join(temp_dir, block_filename)
            with open(temp_file_path, "w") as temp_file:
                temp_file.write(formatted_code)
            process = subprocess.Popen(
                ["python", temp_file_path], stdout=subprocess.PIPE
            )
            while True:
                sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                results = sock.connect_ex(("localhost", 8000))
                if results == 0:
                    terminate_process_by_port(8000)
                    time.sleep(5)
                    output = process.stdout.read()
                    print(output.decode("utf-8"))
                    if "ERROR" in output.decode("utf-8"):
                        assert False
                    else:
                        assert True
                    break


def is_valid_python_code(code_content):
    try:
        ast.parse(code_content)
        return True
    except SyntaxError:
        return False


def get_code_blocks_from_mdx(filename):
    for subdir, dirs, files in os.walk(ROOT_DIR):
        for file in files:
            file_path = os.path.join(subdir, file)
            if file_path.endswith(".mdx") and f"/agents/{filename}" in file_path:
                code_blocks = file_read(file_path)
                if len(code_blocks) == 0:
                    assert False
                return code_blocks


def iterate_over_mdx_files(filename):
    code_blocks = get_code_blocks_from_mdx(filename)
    process_code_block(code_blocks)


def create_output_file(filename):
    code_blocks = get_code_blocks_from_mdx(filename)
    create_files(code_blocks, filename)


def multiple_file_struture(mdx_filename):
    file_contents = {}
    for block_filename, code_content in get_code_blocks_from_mdx(mdx_filename):
        if not is_valid_python_code(code_content):
            assert False
        file_contents[block_filename] = code_content
    return file_contents


def create_files_from_json(directory, structure, file_contents):
    for key, value in structure.items():
        path = os.path.join(directory, key)
        if isinstance(value, dict):
            os.makedirs(path, exist_ok=True)
            create_files_from_json(path, value, file_contents)
        else:
            code_content = file_contents.get(key, "")
            # Format the code using black
            formatted_code = format_str(code_content, mode=FileMode())
            with open(path, "w") as file:
                file.write(formatted_code)


def agent_function(file_name):
    create_output_file(file_name)
    time.sleep(4)
    message_from_alice = "hello there bob"
    message_from_bob = "hello there alice"

    shell_script_path = "./scripts/agents_communication.sh"
    result = subprocess.run(
        ["/bin/bash", shell_script_path],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
    )
    output = result.stdout
    print(output)
    error = result.stderr

    if message_from_alice in output and message_from_bob in output:
        assert True
    else:
        assert False
