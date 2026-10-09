# The latest stable version name of a GitHub repo is available in the docs
# through a special syntax: {{ version gh_owner/gh_repo_name }}.
# The version is found only at build time. For a given repo used in the docs,
# the latest version is found only once because we cache the version name.

import json
import re
import urllib
import urllib.request as req

gh_version_cache = {}


def sub_replace_func(match):
    owner = match.group("owner")
    repo = match.group("repo")
    name = f"{owner}/{repo}"
    if name not in gh_version_cache:
        gh_version_cache[name] = latest_release_for_github_repo(name)
    return gh_version_cache[name]


sub_pattern = (
    r"(?<!\{\{)\{\{(\s*)version(\s+)(?P<owner>\S+)\/(?P<repo>\S+)(\s*)\}\}(?!\}\})"
)


def latest_gh_replace(app, docname, source):
    result = source[0]
    result = re.sub(sub_pattern, sub_replace_func, result)
    source[0] = result


def latest_gh_include_replace(app, relative_path, parent_docname, content):
    return latest_gh_replace(app, parent_docname, content)


def latest_release_for_github_repo(repo):
    latest_release_url = "https://api.github.com/repos/" + repo + "/releases/latest"
    try:
        with req.urlopen(latest_release_url) as response:
            commit = json.load(response)
            return commit["name"]
    except urllib.error.HTTPError as e:
        # Handles HTTP errors (e.g., 404, 500)
        print(f"HTTP Error: {e.code} - {e.reason}")
    except urllib.error.URLError as e:
        # Handles URL errors (e.g., DNS failure, refused connection)
        print(f"URL Error: {e.reason}")
    except TimeoutError:
        # Handles timeout specifically
        print("Request timed out.")


def setup(app):
    app.connect("source-read", latest_gh_replace)
    app.connect("include-read", latest_gh_include_replace)
    return {
        "version": "1.0.0",
    }
