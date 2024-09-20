import os
import re
import spacy
from markdown_it import MarkdownIt
from spellchecker import SpellChecker
import sys

# Load the spaCy model and spell checker
nlp = spacy.load("en_core_web_sm")
spell = SpellChecker()

# Load custom dictionary
custom_dict_path = 'dictionaries/custom_dict.txt'
with open(custom_dict_path, 'r') as f:
    custom_words = set(line.strip().lower() for line in f)

# Regex patterns
import_pattern = re.compile(r'import\s*{\s*([\s\S]*?)\s*}\s*from\s*["\']([^"\']+)["\'];', re.MULTILINE)
jsx_like_tags_pattern = re.compile(r'<[^>]*>[\s\S]*?<\/[^>]*>|<[^>]*?/>', re.DOTALL)
path_pattern = re.compile(r'path:\s*"/[^"]*"')
guidebox_pattern = re.compile(r'<GuideBox[\s\S]*?/>', re.IGNORECASE)
hex_colours = re.compile(r'([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})')

# Corrected word pattern to allow apostrophes in valid words
word_pattern = re.compile(r"\b\w+(?:'\w+)?\b")

# Pattern to exclude words containing escape sequences (\n, \u, etc.)
escape_sequence_pattern = re.compile(r'\\[nu][0-9a-fA-F]+|u[0-9a-fA-F]{4}')

# Function to extract text while ignoring specified components and handling code blocks differently
def extract_text_from_mdx(file_path):
    with open(file_path, 'r') as file:
        content = file.read()

    # Remove import statements
    content = import_pattern.sub('', content)

    # Remove paths and GuideBox components
    content = path_pattern.sub('', content)
    content = guidebox_pattern.sub('', content)

    # Remove JSX components and JSX-like tags
    content = jsx_like_tags_pattern.sub('', content)

    # Initialize the Markdown parser
    md = MarkdownIt()
    parsed = md.parse(content)

    # Extract text while separating code blocks for warnings
    text = []
    code_blocks = []
    in_code_block = False

    def traverse(node):
        nonlocal in_code_block
        if node.type == 'fence':
            if not in_code_block:
                code_blocks.append(node.content)  # Capture code block content
            in_code_block = not in_code_block
        elif node.type == 'code_inline' and not in_code_block:
            return
        elif node.type == 'text' and not in_code_block:
            text.append(node.content)

        for child in node.children or []:
            traverse(child)

    for node in parsed:
        traverse(node)

    return '\n'.join(text), code_blocks

# Function to check for spelling errors
def check_spelling(text, is_code_block=False):
    def split_underscore_words(word):
        return re.split(r'[_\s]+', word)

    # Use the updated word pattern to find words
    words = word_pattern.findall(text)
    processed_words = []
    for word in words:
        if '_' in word:
            processed_words.extend(split_underscore_words(word))
        else:
            processed_words.append(word)

    # Patterns to exclude
    n_prefix_pattern = re.compile(r'\bn\w+')
    css_value_pattern = re.compile(r'^\d+(px|%|em|rem|vh|vw|pt|cm|mm|in|s|ms|deg)?$')  # CSS values
    hex_color_pattern = re.compile(r'^(#?[A-Fa-f0-9]{3}|#?[A-Fa-f0-9]{6})$')  # Hex colors
    eth_address_pattern = re.compile(r'^0x[a-fA-F0-9]{40}$')  # Ethereum addresses
    hash_pattern = re.compile(r'^[a-f0-9]{40}$')  # Hash-like strings (40 hex characters)

    # Filter out custom words, valid words with apostrophes,
    # words matching escape sequences, "n-prefixed" words, CSS values, hex colors, ETH addresses, and hash strings
    reduced_words = [
        i.lower() for i in processed_words
        if (
            i.lower() not in custom_words
            and not escape_sequence_pattern.search(i)
            and "'" not in i  # Exclude words with apostrophes for misspelling check
            and not n_prefix_pattern.match(i)  # Exclude "n-prefixed" words
            and not css_value_pattern.match(i)  # Exclude CSS values
            and not hex_color_pattern.match(i)  # Exclude hex colors
            and not eth_address_pattern.match(i)  # Exclude Ethereum addresses
            and not hash_pattern.match(i)  # Exclude hash-like strings
            and i.strip()  # Exclude empty strings
        )
    ]
    misspelled = spell.unknown(reduced_words)

    # Return misspelled words with a flag indicating if they came from code
    return misspelled if not is_code_block else {'warnings': misspelled}

# Function to check all .mdx files in a directory
def check_directory(directory):
    has_errors = False

    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.mdx'):
                file_path = os.path.join(root, file)
                print(f'========== Checking file: {file_path} ==========')

                # Extract text and code blocks from the MDX file
                text, code_blocks = extract_text_from_mdx(file_path)

                # Check for spelling errors in text
                errors = check_spelling(text)
                if errors:
                    print(f'Spelling errors in {file_path}:')
                    for error in errors:
                        print(f'  - {error}')
                    has_errors = True

                # Check for spelling errors in code blocks (warnings)
                warnings = []
                for code_block in code_blocks:
                    warnings = check_spelling(code_block, is_code_block=True).get('warnings', [])

                if warnings:
                    print(f'Warnings (spelling errors in code block) in {file_path}:')
                    for warning in warnings:
                        print(f'  - {warning}')

    return has_errors

# Directory to check
directory_path = 'pages'
has_errors = check_directory(directory_path)

# Return False if errors were found
sys.exit(1 if has_errors else 0)
