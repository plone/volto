# -*- coding: utf-8 -*-
from robot.api import logger

import os
import signal
import six
import subprocess

__version__ = '1.0'
ROBOT_LIBRARY_DOC_FORMAT = 'reST'


def safe_bytes(str):
    """Returns bytes on Py3 and a string on Py2."""
    if six.PY3:
        try:
            return bytes(str, 'utf-8')
        except TypeError:
            return str
    else:
        return str


class WebpackLibrary:
    """WebpackLibrary is a Robot Framework library to start and stop Webpack.
    """

    webpack_pid = None

    # TEST CASE => New instance is created for every test case.
    # TEST SUITE => New instance is created for every test suite.
    # GLOBAL => Only one instance is created during the whole test execution.
    ROBOT_LIBRARY_SCOPE = 'GLOBAL'

    def __init__(self):
        """WebpackLibrary can be imported without any optional arguments.
        """
        pass

    def start_webpack(self,
                      command='npm start',
                      path='.',
                      check='Compiled successfully'):
        """The `Start Webpack` keyword allows to provide additional arguments.
        `command` is the command that is used to start Webpack. Default value
        is 'npm start'.
        `path` is the path to your project where the Webpack config can be
        found. Default value is '.' (the current directory).
        `check` is the string that will be used to determine when the Webpack
        compile process has ended. Default value is 'Compiled successfully'.
        Examples:
        | Start Webpack |                    |                |                               |  # noqa
        | Start Webpack | command=yarn start | path=frontend/ | check='Compilation completed' |  # noqa
        """
        try:
            self.path = os.path.realpath(path)
        except:
           logger.console('ERROR: File not found in path: {}'.format(path))

        try:
            args = command.split(' ')
            # start process in a new process group (preexec_fn)
            # see https://stackoverflow.com/a/22582602/644831 for details
            self.webpack_process = subprocess.Popen(
                args,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                bufsize=1,
                cwd=self.path,
                preexec_fn=os.setsid,
            )
        except OSError as e:
            logger.console(
                'ERROR: Starting Webpack failed with: {}'.format(e)
            )
            logger.console(
                'command: {}'.format(command)
            )
            logger.console(
                'path: {}'.format(path)
            )

        if not getattr(self, 'webpack_process', False):
            logger.console('hola')
            print('\n\n')  # noqa
            print('ERROR: Starting Webpack failed with:\n')  # noqa
            print(e)  # noqa
            print('\n')  # noqa
            exit(1)

        if self.webpack_process.returncode == 1:
            logger.console('dodo')
            print('\n\n')  # noqa
            print('ERROR: Starting Webpack failed with exit code: {}\n'.format(  # noqa
                self.webpack_process.returncode
            ))
            print(self.webpack_process.communicate('n\n')[0])  # noqa
            print('\n')  # noqa
            exit(1)

        self.webpack_pid = self.webpack_process.pid
        stdout = []
        # with self.webpack_process.stdout:
        #     for line in iter(self.webpack_process.stdout.readline, b''):
        #         if safe_bytes(check) in safe_bytes(line):
        #             return
        #     raise RuntimeError(
        #         'Webpack process terminated unexpectedly: \n{}'.format(
        #             safe_bytes('\n'.join([x for x in self.webpack_process.stderr]))
        #         )
        #     )

    def stop_webpack(self):
        """Stop Webpack."""
        try:
            os.killpg(os.getpgid(self.webpack_pid), signal.SIGTERM)
        except OSError as e:
            raise RuntimeError(
                'Webpack process could not be terminated: {}'.format(
                    e
                )
            )