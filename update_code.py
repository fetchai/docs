import base64
import json
from datetime import datetime
import requests
import os
import re

access_token = os.getenv("ACCESS_TOKEN")

def delete_code_sample(file):
    ...

def getGitHubData(owner, repo, filePath, startLine, endLine):

    url = f"https://api.github.com/repos/{owner}/{repo}/contents/{filePath}?ref=main"
    headers = {'Accept': 'application/vnd.github.v3.star+json', 'Authorization': f"Bearer {access_token}"}

    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S%z')

    try:
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            contents = response.json()
            # print (contents)
            json_data = contents["content"]
            print(json_data)
            # Decode the content from base64
            base = base64.b64decode(json_data).decode("utf-8")

            print (base)

            return base

    except Exception as e:
        print(f"Error fetching and updating data: {e}")

def insert_Html_after_jsx(filePath):

    print (filePath)

    with open(filePath, "r+") as f:
        data = f.read()

        # print (data)

        jsxObjRegex = r"<GithubCodeSegment\b[^>]*\/>"
        def insert_tag(match):
            # After finding <gitinsert ../>, we return the matched text followed by <gitcode ... />

            regex = r'(\w+)=["{]?([^"}]+)["}]?'
            key_value_pairs = {}

            # print (1)
            # print (match.group(0))

            # Use re.finditer to find all matches and loop through them
            for internal_match in re.finditer(regex, match.group(0)):
                # print (internal_match)
                key = internal_match.group(1)
                value = internal_match.group(2)
                key_value_pairs[key] = value

            # Print the resulting dictionary
            # print(key_value_pairs)

            # // Split the URL by '/'
            parts = key_value_pairs["path"].split("/");

            # print(parts)

            username = parts[3];
            repository = parts[4];
            filePath = "/".join(parts[7:])

            # print(username, repository, filePath)

            lines = getGitHubData(username, repository, filePath, key_value_pairs["lineStart"], key_value_pairs["lineEnd"])

            # print (key_value_pairs["lineStart"])
            selection = lines.split("\n")[int(key_value_pairs["lineStart"])-1:int(key_value_pairs["lineEnd"])]
            print(selection)
            s = '\n'.join(selection)

            newJsxObject = f"<CodeSample>{s}</CodeSample>"

            return f"{match.group(0)}\n{newJsxObject}"


        # Use re.sub to replace <gitinsert ../> with <gitinsert ../> + <gitcode ... />
        result_string = re.sub(jsxObjRegex, insert_tag, data)
        f.seek(0)
        f.write(result_string)

 # Specify the path of the file you want to modify
filePath = './pages/guides/agents/quickstart.mdx';

# Call the function to insert <html/> after each comment
insert_Html_after_jsx(filePath)
