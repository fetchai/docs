import time
import subprocess
import os
import re
import tempfile
import os
import socket
import psutil


with open("pages/guides/agents/create-a-uagent.mdx", "r") as file:
    markdown_content = file.read()

pattern = re.compile(r'```py copy filename="([^"]+)"\n(.*?)```', re.DOTALL)


def terminate_process_by_port(port):
    for proc in psutil.process_iter(attrs=["pid", "name"]):
        try:
            connections = proc.connections()
            for conn in connections:
                if conn.laddr.port == port:
                    print(f"Terminating process {proc.pid} using port {port}")
                    process = psutil.Process(proc.pid)
                    process.terminate()
                    process.wait()
        except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
            pass


class TestFetchAgents:
    def test_creating_yeour_first_uAgent(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            temp_file_path = os.path.join(temp_dir, "temp_script.py")
            matches = re.finditer(pattern, markdown_content)
            for match in matches:
                code_content = match.group(2)
            with open(temp_file_path, "w") as temp_file:
                temp_file.write(code_content)
            result = subprocess.Popen(
                ["python", temp_file_path, "--port", "8000"])
            print("Python script output:")
            print(result.stdout)
            time.sleep(10)
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            results = sock.connect_ex(("localhost", 8000))
            if results == 0:
                assert True
                terminate_process_by_port(8000)
            else:
                assert False
                print("Port 8000 is not in use.")
