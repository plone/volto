"""Update locales."""

from pathlib import Path

import logging
import re
import subprocess


logger = logging.getLogger("i18n")
logger.setLevel(logging.DEBUG)


PATTERN = r"^[a-z]{2}.*"
domains = ("collective.addon",)
cwd = Path.cwd()
target_path = Path(__file__).parent.parent.resolve()
locale_path = target_path / "locales"

i18ndude = cwd / "bin" / "i18ndude"
if not i18ndude.exists():
    i18ndude = cwd / "i18ndude"

# ignore node_modules files resulting in errors
excludes = '"*.html *json-schema*.xml"'


def locale_folder_setup(domain: str):
    languages = [path for path in locale_path.glob("*") if path.is_dir()]
    for lang_folder in languages:
        lc_messages_path = lang_folder / "LC_MESSAGES"
        lang = lang_folder.name
        if lc_messages_path.exists():
            continue
        elif re.match(PATTERN, lang):
            lc_messages_path.mkdir()
            cmd = (
                f"msginit --locale={lang} "
                f"--input={locale_path}/{domain}.pot "
                f"--output={locale_path}/{lang}/LC_MESSAGES/{domain}.po"
            )
            subprocess.call(
                cmd,
                shell=True,
            )


def _rebuild(domain: str):
    cmd = (
        f"{i18ndude} rebuild-pot --pot {locale_path}/{domain}.pot "
        f"--exclude {excludes} "
        f"--create {domain} {target_path}"
    )
    subprocess.call(
        cmd,
        shell=True,
    )


def _sync(domain: str):
    cmd = (
        f"{i18ndude} sync --pot {locale_path}/{domain}.pot "
        f"{locale_path}/*/LC_MESSAGES/{domain}.po"
    )
    subprocess.call(
        cmd,
        shell=True,
    )


def update_locale():
    if i18ndude.exists():
        for domain in domains:
            logger.info(f"Updating translations for {domain}")
            locale_folder_setup(domain)
            _rebuild(domain)
            _sync(domain)
    else:
        logger.error("Not able to find i18ndude")
