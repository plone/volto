Jupyter Robot Framework notebook
================================

Jupyter notebook with Robot Framework kernel makes it easy to learn, sketch and debug Robot Framework tests directly from browser, from a Jupyter notebook.

This should be convenient way to write and debug Robot Framework tests with
quick feedback on test issues.

Usage with plone-react
----------------------

0. Ensure that Plone React has been built with ``yarn`` and ``yarn build`` at the project root ``./``.

1. Start Plone API docker image with ``docker-compose up`` at ``./api/``.

2. Start Plone React Server with ``HTTP_API=http://localhost:55001/plone yarn start`` at ``./``.

3. Start Jupyter notebook here with ``make``.

Once Jupyter notebook environment has been opened on your default browser, you can open ``Example.ipynb`` on it for example of use.
