import base64
import requests
import os
import re

access_token = os.getenv("ACCESS_TOKEN")

def delete_code_sample(filePath):
    with open(filePath, "r+") as f:
        data = f.read()

        base_regex = r"<CodeGroup[\s]dynamic.*?>[\s\S]*?</CodeGroup>"

        jsx_codegroup_regex = re.compile(base_regex, re.DOTALL)

        result_string = re.sub(jsx_codegroup_regex, "", data)
        f.seek(0)
        f.truncate()
        f.write(result_string)



def getGitHubData(owner, repo, filePath):
    url = f"https://api.github.com/repos/{owner}/{repo}/contents/{filePath}?ref=main"
    headers = {'Accept': 'application/vnd.github.v3.star+json', 'Authorization': f"Bearer {access_token}"}

    try:
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            contents = response.json()
            text_body = contents["content"]
            decoded_body = base64.b64decode(text_body).decode("utf-8")
            return decoded_body

    except Exception as e:
        print(f"Error fetching and updating data: {e}")


def insert_Html_after_jsx(filePath):

    offset =0

    with open(filePath, "r+") as f:
        data = f.read()

        base_regex = r"<GithubCodeSegment>(.*?)</GithubCodeSegment>"
        jsx_obj_regex = re.compile(base_regex, re.DOTALL)

        def insert_tag(match):

            key_value_pairs = []

            code_groups_base_regex = r"<CodeSegment(.*?)/>"
            code_groups_regex = re.compile(code_groups_base_regex, re.DOTALL)
            regex = r'(\w+)=["{]?([^"}]+)["}]?'

            code_groups = re.findall(code_groups_regex, match.group(0))

            for code_group in code_groups:
                l = {}

                for internal_match in re.finditer(regex, code_group):
                    key = internal_match.group(1)
                    value = internal_match.group(2)
                    l[key] = value

                key_value_pairs.append(l)

            code_block = ""

            for code_group in key_value_pairs:
                parts = code_group["path"].split("/");

                username = parts[3];
                repository = parts[4];
                filePath = "/".join(parts[7:])
                filename = parts[len(parts) - 1]

                hosted = code_group["hosted"]

                lines = getGitHubData(username, repository, filePath)

                selection = lines.split("\n")[int(code_group["lineStart"]) - 1:int(code_group["lineEnd"])]
                selection = [s for s in selection]
                s = '\n'.join(selection)

                print (hosted)

                code_block = code_block + f"""\n\n<DocsCode local={{{hosted}}}>\n\t```py copy filename="{filename}"\n\n{s}\n\n```\n</DocsCode>\n"""



            new_jsx_object = f"<CodeGroup dynamic hasCopy isLocalHostedFile>\n{code_block}\n</CodeGroup>"

            print (new_jsx_object)

            return f"\n{new_jsx_object}"

        for match in re.finditer(jsx_obj_regex, data):

            # Calculate the new position considering the offset from previous inserts
            insert_pos = match.end() + offset
            # Insert the string after the match
            result = insert_tag(match)
            data = data[:insert_pos] + result + data[insert_pos:]
            # Update offset to account for the inserted string length
            offset += len(result)

        f.seek(0)
        f.write(data)


# Specify the path of the file you want to modify
filePath = './pages/guides/agents/quickstart.mdx';


def directory_loop(directory, removal):
   for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".md") or file.endswith(".mdx"):
                if not removal:
                    insert_Html_after_jsx(os.path.join(root, file))
                else:
                    delete_code_sample(os.path.join(root, file))

filePath = './pages/guides/agents/quickstart.mdx';
delete_code_sample(filePath)
insert_Html_after_jsx(filePath)

import subprocess

subprocess.run(["pnpm", "run", "fmt"])