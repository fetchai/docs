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
custom_dict_path = '.github/spelling/known_words_corpus.txt'
with open(custom_dict_path, 'r') as f:
    custom_words = set(line.strip().lower() for line in f)

# Regex patterns
import_pattern = re.compile(r'import\s*{\s*([\s\S]*?)\s*}\s*from\s*["\']([^"\']+)["\'];', re.MULTILINE)
jsx_like_tags_pattern = re.compile(r'<[^>]*>[\s\S]*?<\/[^>]*>|<[^>]*?/>', re.DOTALL)
path_pattern = re.compile(r'path:\s*"/[^"]*"')
guidebox_pattern = re.compile(r'<GuideBox[\s\S]*?/>', re.IGNORECASE)

# Corrected word pattern to allow apostrophes in valid words
word_pattern = re.compile(r"\b\w+(?:'\w+)?\b")

# Function to extract text while ignoring specified components and skipping code blocks
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

    # Extract text while skipping code blocks
    text = []

    def traverse(node):
        if node.type == 'fence':  # Skip fenced code blocks
            return
        elif node.type == 'code_inline':  # Skip inline code
            return
        elif node.type == 'text':
            text.append(node.content)

        for child in node.children or []:
            traverse(child)

    for node in parsed:
        traverse(node)

    return '\n'.join(text)

# Function to check for spelling errors
def check_spelling(text):
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

    # Debugging: Print all extracted words
    print("Extracted words for debugging:", processed_words)

    # Patterns to exclude
    css_value_pattern = re.compile(r'^\d+(px|%|em|rem|vh|vw|pt|cm|mm|in|s|ms|deg)?$')  # CSS values
    hex_color_pattern = re.compile(r'^(#?[A-Fa-f0-9]{3}|#?[A-Fa-f0-9]{6})$')  # Hex colors
    eth_address_pattern = re.compile(r'^0x[a-fA-F0-9]{40}$')  # Ethereum addresses
    hash_pattern = re.compile(r'^[a-f0-9]{40}$')  # Hash-like strings (40 hex characters)

    # Filter out custom words, valid words, and patterns to exclude
    reduced_words = [
        i.lower() for i in processed_words
        if (
            i.lower() not in custom_words
            and not css_value_pattern.match(i)  # Exclude CSS values
            and not hex_color_pattern.match(i)  # Exclude hex colors
            and not eth_address_pattern.match(i)  # Exclude Ethereum addresses
            and not hash_pattern.match(i)  # Exclude hash-like strings
            and i.strip()  # Exclude empty strings
        )
    ]

    # Identify misspelled words
    misspelled = spell.unknown(reduced_words)

    # Debugging: Print filtered words and misspelled words
    print("Filtered words:", reduced_words)
    print("Misspelled words:", misspelled)

    return misspelled

# Function to check all .mdx files in a directory
def check_directory(directory):
    has_errors = False

    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.mdx'):
                file_path = os.path.join(root, file)
                print(f'========== Checking file: {file_path} ==========')

                # Extract text from the MDX file
                text = extract_text_from_mdx(file_path)

                # Check for spelling errors in text
                errors = check_spelling(text)
                if errors:
                    print(f'Spelling errors in {file_path}:')
                    for error in errors:
                        print(f'  - {error}')
                    has_errors = True

    return has_errors

# Directory to check
directory_path = 'pages'
has_errors = check_directory(directory_path)

# Exit with status code
sys.exit(1 if has_errors else 0)
