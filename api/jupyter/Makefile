all: run

env: requirements.txt
	python3 -m venv env --upgrade
	env/bin/pip install -U -r requirements.txt
	curl -O https://raw.githubusercontent.com/datakurre/robotkernel/master/robotframework.js
	mkdir -p env/lib/python3.6/site-packages/notebook/static/components/codemirror/mode/robotframework
	mv robotframework.js env/lib/python3.6/site-packages/notebook/static/components/codemirror/mode/robotframework/robotframework.js
	env/bin/jupyter kernelspec install $$(pwd)/kernelspec --user

run: env
	env/bin/jupyter notebook
