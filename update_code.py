import base64
import sys
import requests
import os
import re
import hashlib

access_token = os.getenv("ACCESS_TOKEN")


def insert_updated_digest(match, digest):
    return match.replace('digest=""', f"""digest=\"{digest}\"""")


def delete_code_sample(filePath):
    with open(filePath, "r+") as f:
        data = f.read()

        base_regex = r"<CodeGroup[\s]dynamic.*?>[\s\S]*?</CodeGroup>"

        jsx_codegroup_regex = re.compile(base_regex, re.DOTALL)

        result_string = re.sub(jsx_codegroup_regex, "", data)
        result_string = re.sub(r'\n\s*\n', '\n\n', result_string)
        result_string = re.sub(r'digest="([^"]+)?"', 'digest=""', result_string)
        f.seek(0)
        f.truncate()
        f.write(result_string)


def get_github_data(owner, repo, filePath):
    url = f"https://api.github.com/repos/{owner}/{repo}/contents/{filePath}?ref=main"
    headers = {'Accept': 'application/vnd.github.v3.star+json', 'Authorization': f"Bearer {access_token}"}

    try:
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            contents = response.json()
            text_body = contents["content"]
            decoded_body = base64.b64decode(text_body).decode("utf-8")
            return decoded_body
        else:
            print(response.status_code, response.text)

    except Exception as e:
        print(f"Error fetching and updating data: {e}")


def insert_html_after_jsx(filepath):
    with open(filepath, "r+") as f:
        data = f.read()
        base_regex = r"<GithubCodeSegment(.*?)>(.*?)</GithubCodeSegment>"
        jsx_obj_regex = re.compile(base_regex, re.DOTALL)

        def insert_tag(match):

            code_groups_base_regex = r"<CodeSegment(.*?)/>"
            code_groups_regex = re.compile(code_groups_base_regex, re.DOTALL)
            regex = r'(\w+)=["{]?([^"}]+)["}]?'

            re_digest = r'digest="([^"]+)?"'
            digest_match = re.search(re_digest, match.group(0))
            og_digest = digest_match.group(1) if digest_match.group(1) else ""

            code_groups = re.findall(code_groups_regex, match.group(0))
            code_group = code_groups[0]
            code_block = ""

            pairs = {}

            for internal_match in re.finditer(regex, code_group):
                key = internal_match.group(1)
                value = internal_match.group(2).replace("{", "").replace("}", "")
                pairs[key] = value

            parts = pairs["path"].split("/");
            username = parts[3];
            repository = parts[4];
            code_filepath = "/".join(parts[7:]).replace("\"", "")
            filename = parts[len(parts) - 1]

            if "filename" in pairs:
                filename = pairs["filename"]

            hosted = pairs["hosted"]

            lines = get_github_data(username, repository, code_filepath)
            selection = lines.split("\n")[int(pairs["lineStart"]) - 1:int(pairs["lineEnd"])]
            selection = ["\t" + s for s in selection]
            reformed_code_block = '\n'.join(selection)

            code_block = code_block + f"""\n<DocsCode local={{{hosted}}}>\n\t```py copy filename="{filename}"\n\n{reformed_code_block}\n\n```\n</DocsCode>\n"""

            digest = hashlib.md5(code_block.encode('utf-8')).hexdigest()  # digest the entire jsx obj

            if og_digest == "":
                new_jsx_object = f"<CodeGroup dynamic hasCopy isLocalHostedFile digest='{digest}'>\n{code_block}\n</CodeGroup>\n\n"
                match_with_new_digest = insert_updated_digest(match.group(0), digest)
                return f"{match_with_new_digest}\n{new_jsx_object}", None

            if og_digest == digest:
                return None, "No need to update code, digest matches"

            if og_digest != digest:
                return None, f"=== Mismatch at {filepath}, from {code_filepath} ==="

        result = []
        last_end = 0

        for match in re.finditer(jsx_obj_regex, data):
            start, end = match.span()
            jsx, cl = insert_tag(match)
            if cl:
                print(cl)
            else:
                result.append(data[last_end:start])
                result.append(jsx)
                last_end = end

        result.append(data[last_end:])

        if len(result) == 0:
            f.close()
        else:
            f.seek(0)
            f.write(''.join(result))


def directory_loop(directory, removal):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".md") or file.endswith(".mdx"):
                if not removal:
                    insert_html_after_jsx(os.path.join(root, file))
                else:
                    delete_code_sample(os.path.join(root, file))


directory_loop('./pages/guides', True)
directory_loop('./pages/guides', False)

"""
todo: add in function to remove all CodeGroup and set all GithubCodeSegment digests to an empty string
todo: add in args to force an update if digests don't match
todo: force exit on a non-matching digest
"""
