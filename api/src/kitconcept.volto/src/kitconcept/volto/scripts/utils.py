import logging
import csv


logger = logging.getLogger("kitconcept.migrator.scripts")
fh = logging.FileHandler("scripts.log", mode="w")
formatter = logging.Formatter(
    fmt="%(asctime)s %(levelname)s %(message)s", datefmt="%Y-%m-%d %H:%M:%S"
)
fh.setFormatter(formatter)
logger.addHandler(fh)


def save_csv(data, filename):
    with open(filename, "w", newline="", encoding="utf-8") as csvfile:
        csvfile.write("\ufeff")  # byte order mark for ease of use
        writer = csv.writer(csvfile, delimiter=";")
        writer.writerows(sorted(data))


def print_error(error_string):  # RED
    # removed error string
    print("\033[31m{}\033[0m".format(error_string))


def print_info(info_string):  # YELLOW
    print("\033[33m{}\033[0m".format(info_string))
    logger.info("{}".format(info_string))


def print_ok(info_string):  # GREEN
    print("\033[32m{}\033[0m".format(info_string))
    logger.info("{}".format(info_string))
