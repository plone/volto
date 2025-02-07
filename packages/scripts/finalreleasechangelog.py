import re

def extract_alpha_sections(changelog):
    # Define the regex pattern to match the sections
    pattern = re.compile(r'## 18\.0\.0-alpha\.\d+.*?\n(.*?)(?=\n## (18\.0\.0-alpha\.\d+|[^a]))', re.DOTALL)

    # Find all matches
    matches = pattern.findall(changelog)
    return [match[0] for match in matches]

def group_by_third_level_headers(section):
    # Define the regex pattern to match third-level headers and their content
    pattern = re.compile(r'### (.*?)\n(.*?)(?=\n### |\Z)', re.DOTALL)

    # Find all matches
    matches = pattern.findall(section)

    # Group content by third-level headers
    grouped_content = {}
    for header, content in matches:
        if header not in grouped_content:
            grouped_content[header] = []
        grouped_content[header].append(content.strip())
    return grouped_content

# Read the contents of the CHANGELOG.md file
with open('CHANGELOG.md', 'r') as file:
    changelog_content = file.read()

# Extract the alpha sections
alpha_sections = extract_alpha_sections(changelog_content)

# Group each section by third-level headers and print the summary
grouped_content = {}
for section in alpha_sections:
    section_content = group_by_third_level_headers(section)
    for header, content_list in section_content.items():
        if header not in grouped_content:
            grouped_content[header] = []
        grouped_content[header].extend(content_list)

# print(grouped_content)
# Print the grouped summary
for header, contents in grouped_content.items():
    print(f'### {header}\n')
    for content in contents:
        print(content)
    print('\n')  # Sepa
