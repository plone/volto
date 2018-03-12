SHELL := /bin/bash
CURRENT_DIR:=$(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))

all: clean tests/bin test

clean:
	@echo "Clean"
	rm -rf tests/bin tests/lib tests/include

tests/bin:
	@echo "Build"
	virtualenv-2.7 tests/ || virtualenv tests/
	(cd tests && bin/pip install -r requirements.txt)

test:
	@echo "Run Tests"
	(cd tests && bin/pybot test.robot)

