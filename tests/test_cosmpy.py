import os
import subprocess
import tempfile

from black import FileMode, format_str
from utils import  is_valid_python_code, iterate_over_mdx_files , file_read
from constants import ROOT_DIR



def get_code_blocks_from_mdx(filename):
    for subdir, dirs, files in os.walk(ROOT_DIR):
        for file in files:
            file_path = os.path.join(subdir, file)
            if file_path.endswith(".mdx") and f"/use-cases/{filename}" in file_path:
                code_blocks = file_read(file_path)
                if len(code_blocks) == 0:
                    assert False
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
                ["python", temp_file_path],
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                universal_newlines=True,
            )
            while True:  
                output = process.stdout.read() 
                if output:
                    assert True
                    print(output)
                if "ERROR" in output:
                    assert False
                break
                

def iterate_over_mdx_files(filename):
    code_blocks = get_code_blocks_from_mdx(filename)
    process_code_block(code_blocks)

class TestCosmpy:
    def test_create_a_uagent(self):
        iterate_over_mdx_files("stake-auto-compounder")
    def test_stake_optimizer(self):
        iterate_over_mdx_files("stake-optimizer")

    # these are commented because the code required api in the code

    # def test_oracles(self):
    #     iterate_over_mdx_files("oracles")
    
    # def test_wallet_top_up(self):
    #     iterate_over_mdx_files("wallet-top-up")        
    
    def test_liquidity_pool(self):
        iterate_over_mdx_files("liquidity-pool") 
  
    # def test_swap_automation(self):
    #     iterate_over_mdx_files("swap_automation")               