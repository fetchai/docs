import os
import re
import spacy
from markdown_it import MarkdownIt
from markdown_it.tree import SyntaxTreeNode
from spellchecker import SpellChecker

# Load the spaCy model and spell checker
nlp = spacy.load("en_core_web_sm")
spell = SpellChecker()

# Load custom dictionary
custom_dict_path = 'dictionaries/custom_dict.txt'
with open(custom_dict_path, 'r') as f:
    custom_words = set(line.strip().lower() for line in f)

# Function to extract text while ignoring specified components
def extract_text_from_mdx(file_path):
    with open(file_path, 'r') as file:
        content = file.read()

    # Regex patterns for import statements, JSX components, paths, and specific components
    import_pattern = re.compile(r'^import\s+.*\s+from\s+.*\s*;', re.MULTILINE)
    path_pattern = re.compile(r'path:\s*"/[^"]*"')
    guidebox_pattern = re.compile(r'<GuideBox[\s\S]*?/>', re.IGNORECASE)
    fenced_code_block_pattern = re.compile(r'```[\s\S]*?```')

    # Remove import statements
    content = import_pattern.sub('', content)

    # Remove paths and GuideBox components
    content = path_pattern.sub('', content)
    content = guidebox_pattern.sub('', content)

    # Remove JSX components, fenced code blocks, and JSX-like tags
    content = fenced_code_block_pattern.sub('', content)

    # Initialize the Markdown parser
    md = MarkdownIt()
    parsed = md.parse(content)

    # Extract text while ignoring code blocks and inline code
    text = []
    in_code_block = False
    inside_html_tag = False

    def traverse(node):
        nonlocal in_code_block, inside_html_tag
        if node.type == 'fence':
            in_code_block = not in_code_block
        elif node.type == 'code_inline' and not in_code_block:
            return
        elif node.type == 'html_block':
            inside_html_tag = not inside_html_tag
        elif node.type == 'text' and not (in_code_block or inside_html_tag):
            text.append(node.content)

        for child in node.children or []:
            traverse(child)

    for node in parsed:
        traverse(node)

    return '\n'.join(text)

# Function to check for spelling errors
def check_spelling(text):
    words = re.findall(r'\b\w+\b', text)
    reduced_words = [i.lower() for i in words if i.lower() not in custom_words]
    misspelled = spell.unknown(reduced_words)
    return misspelled

# Directory containing the .mdx files
pages_dir = 'pages'

# Iterate through all .mdx files in the /pages directory
for root, _, files in os.walk(pages_dir):
    for file in files:
        if file.endswith('.mdx') and any(root.startswith(os.path.join(pages_dir, subdir)) for subdir in [
            'api', 'apis', 'concepts', 'guides', 'examples', 'references'
        ]):
            file_path = os.path.join(root, file)
            print(f'Checking file: {file_path}')

            # Extract text from the MDX file
            text = extract_text_from_mdx(file_path)

            # Check for spelling errors
            errors = check_spelling(text)
            if errors:
                print(f'Spelling errors in {file_path}:')
                for error in errors:
                    print(f'  - {error}')
            else:
                print(f'No spelling errors found in {file_path}')
