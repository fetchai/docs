import base64
import requests
import os
import re

access_token = os.getenv("ACCESS_TOKEN")


def delete_code_sample(file):
    ...

def getGitHubData(owner, repo, filePath, startLine, endLine):
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
    # iterate over every .mdx / .md file, and find jsxObjRegex
    # for each match, replace.

    print(filePath)

    with open(filePath, "r+") as f:
        data = f.read()

        base_regex = r"<GithubCodeSegment>(.*?)</GithubCodeSegment>"
        jsx_obj_regex = re.compile(base_regex, re.DOTALL)

        def insert_tag(match):
            print(match.group(0))

            key_value_pairs = []

            code_groups_base_regex = r"<CodeSegment(.*?)/>"
            code_groups_regex = re.compile(code_groups_base_regex, re.DOTALL)

            code_groups = re.findall(code_groups_regex, match.group(0))

            regex = r'(\w+)=["{]?([^"}]+)["}]?'
            # Use re.finditer to find all matches and loop through them
            for code_group in code_groups:
                print(code_group)
                l = {}

                for internal_match in re.finditer(regex, code_group):
                    # print (internal_match)
                    key = internal_match.group(1)
                    value = internal_match.group(2)
                    l[key] = value

                key_value_pairs.append(l)

            print(key_value_pairs)

            code_block = ""

            for code_group in key_value_pairs:
                # // Split the URL by '/'
                parts = code_group["path"].split("/");

                username = parts[3];
                repository = parts[4];
                filePath = "/".join(parts[7:])
                filename = parts[len(parts) - 1]
                print(filename)

                # print(username, repository, filePath)

                lines = getGitHubData(username, repository, filePath, code_group["lineStart"],
                                      code_group["lineEnd"])

                selection = lines.split("\n")[int(code_group["lineStart"]) - 1:int(code_group["lineEnd"])]
                print(selection)
                selection = ["\t\t" + s for s in selection]
                s = '\n'.join(selection)

                code_block = code_block + f"""\n\n\t```py copy filename="{filename}"\n\n{s}\n\n```"""

            new_jsx_object = f"<CodeGroup hasCopy isLocalHostedFile>\n{code_block}\n</CodeGroup>"

            return f"{match.group(0)}\n{new_jsx_object}"

        result_string = re.sub(jsx_obj_regex, insert_tag, data)
        f.seek(0)
        f.write(result_string)


# Specify the path of the file you want to modify
filePath = './pages/guides/agents/quickstart.mdx';

# Call the function to insert <html/> after each comment
insert_Html_after_jsx(filePath)
