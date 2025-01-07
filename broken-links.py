import os
import glob
import re
import requests

# Base URL for internal links in the staging environment
STAGING_BASE_URL = "http://localhost:3000/docs/"

# Function to check if a link is broken
def check_link(link, file_path):
    # Skip links starting with '#' (internal page anchors)
    if link.startswith("#"):
        return None

    # Skip links starting with '../../'
    if link.startswith("../../"):
        return None

    # If the link is an internal link, prepend the base URL
    if link.startswith("/"):
        full_url = STAGING_BASE_URL + link[1:]  # Remove leading '/'
    else:
        full_url = link

    print(f"Checking link: {full_url} (from file: {file_path})")

    try:
        # Make a GET request to check if the link is reachable
        response = requests.get(full_url, allow_redirects=True, timeout=15)  # Increased timeout
        if not (200 <= response.status_code < 300):
            print(f"Broken link detected: {full_url} (status code: {response.status_code})")
            return full_url
    except requests.exceptions.Timeout:
        print(f"Timeout error for link: {full_url} (file: {file_path})")
        return f"{full_url} (timeout)"
    except requests.exceptions.RequestException as e:
        print(f"Error checking {full_url}: {e}")
        return full_url

    return None

# Function to extract all links from a file excluding code blocks, tables, and image links
def extract_links_from_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Skip content inside code blocks (```)
    content = re.sub(r'```.*?```', '', content, flags=re.DOTALL)

    # Skip content inside <CodeGroup> and <GithubCodeSegment> blocks
    content = re.sub(r'<CodeGroup.*?>.*?</CodeGroup>', '', content, flags=re.DOTALL)
    content = re.sub(r'<GithubCodeSegment.*?>.*?</GithubCodeSegment>', '', content, flags=re.DOTALL)

    # Skip content inside tables (| ... |)
    content = re.sub(r'\|.*?\[(.*?)\]\((.*?)\).*?\|', '', content, flags=re.DOTALL)

    # Skip image links (![...](...))
    content = re.sub(r'!\[.*?\]\(.*?\)', '', content)

    # Find all links in the content (both internal and external)
    links = set(re.findall(r'\[.*?\]\((.*?)\)', content))

    return links

# Function to check all .mdx files in the pages folder
def check_links_in_files(pages_dir):
    # Get a list of all .mdx files in the specified directory
    mdx_files = glob.glob(os.path.join(pages_dir, '**/*.mdx'), recursive=True)

    broken_links = {}

    for file_path in mdx_files:
        print(f"Scanning file: {file_path}")
        links = extract_links_from_file(file_path)
        broken_links_in_file = []

        # Check each link
        for link in links:
            broken_link = check_link(link, file_path)
            if broken_link:
                broken_links_in_file.append(broken_link)

        if broken_links_in_file:
            broken_links[file_path] = broken_links_in_file

    return broken_links

# Main function to run the script
if __name__ == "__main__":
    pages_dir = "pages"  # Adjust to your project structure

    broken_links = check_links_in_files(pages_dir)

    if broken_links:
        print("\nBroken links found:")
        for file_path, links in broken_links.items():
            print(f"\nIn file {file_path}:")
            for link in links:
                print(f" - {link}")
    else:
        print("No broken links found.")
