#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Author: Xie Yanbo <xieyanbo@gmail.com>
# This software is licensed under the New BSD License. See the LICENSE
# file in the top distribution directory for the full license text.

"""A debug library and REPL for RobotFramework.
"""

from __future__ import print_function

import cmd
import os
import re
import sys
import tempfile
from functools import wraps

from prompt_toolkit.auto_suggest import AutoSuggestFromHistory
from prompt_toolkit.completion import Completer, Completion
from prompt_toolkit.history import FileHistory
from prompt_toolkit.interface import AbortAction
from prompt_toolkit.shortcuts import print_tokens, prompt
from prompt_toolkit.styles import style_from_dict
from pygments.token import Token

from robot import run_cli
from robot.api import logger
from robot.errors import ExecutionFailed, HandlerExecutionFailed
from robot.libdocpkg.model import LibraryDoc
from robot.libdocpkg.robotbuilder import KeywordDocBuilder, LibraryDocBuilder
from robot.libraries import STDLIBS
from robot.libraries.BuiltIn import BuiltIn
from robot.running.namespace import IMPORTER
from robot.running.signalhandler import STOP_SIGNAL_MONITOR
from robot.variables import is_var

__version__ = '1.1.2'

HISTORY_PATH = os.environ.get('RFDEBUG_HISTORY', '~/.rfdebug_history')
KEYWORD_SEP = re.compile('  +|\t')


def get_command_line_encoding():
    """Get encoding from shell environment, default utf-8"""
    encoding = ''
    try:
        encoding = sys.stdout.encoding
    except AttributeError:
        encoding = sys.__stdout__.encoding
    return encoding or 'utf-8'


COMMAND_LINE_ENCODING = get_command_line_encoding()


class HelpMeta(type):

    def __init__(cls, name, bases, attrs):
        for key, value in attrs.items():
            if key.startswith('do_') and hasattr(value, '__call__'):
                def auto_help(self):
                    print(self.get_help_string(key))
                attrs['help_' + key] = help  # assign help method

        type.__init__(cls, name, bases, attrs)


class BaseCmd(cmd.Cmd, object):

    """Basic REPL tool"""

    __metaclass__ = HelpMeta

    def emptyline(self):
        """By default Cmd runs last command if an empty line is entered.
        Disable it."""

        pass

    def do_exit(self, arg):
        """Exit the interpreter. You can also use the Ctrl-D shortcut."""

        return True

    do_EOF = do_exit

    def help_help(self):
        """Help of Help command"""

        print('Show help message.')

    def do_pdb(self, arg):
        """Enter the python debuger pdb. For development only."""
        print('break into python debugger: pdb')
        import pdb
        pdb.set_trace()


def get_libs():
    """Get libraries robotframework imported"""
    return sorted(IMPORTER._library_cache._items, key=lambda _: _.name)


def match_libs(name=''):
    """Find libraries by prefix of library name, default all"""
    libs = [_.name for _ in get_libs()]
    matched = [_ for _ in libs if _.lower().startswith(name.lower())]
    return matched


def memoize(function):
    """Memoization decorator"""
    memo = {}

    @wraps(function)
    def wrapper(*args):
        if args in memo:
            return memo[args]
        else:
            rv = function(*args)
            memo[args] = rv
            return rv
    return wrapper


class ImportedLibraryDocBuilder(LibraryDocBuilder):

    def build(self, lib):
        libdoc = LibraryDoc(name=lib.name,
                            doc=self._get_doc(lib),
                            doc_format=lib.doc_format)
        libdoc.inits = self._get_initializers(lib)
        libdoc.keywords = KeywordDocBuilder().build_keywords(lib)
        return libdoc


@memoize
def get_lib_keywords(library):
    """Get keywords of imported library"""
    lib = ImportedLibraryDocBuilder().build(library)
    keywords = []
    for keyword in lib.keywords:
        doc = keyword.doc.split('\n')[0]
        keywords.append({'name': keyword.name,
                         'lib': library.name,
                         'doc': doc})
    return keywords


def get_keywords():
    """Get all keywords of libraries"""
    for lib in get_libs():
        for keyword in get_lib_keywords(lib):
            yield keyword


NORMAL_STYLE = style_from_dict({
    Token.Head: '#00FF00',
    Token.Message: '#CCCCCC',
})

ERROR_STYLE = style_from_dict({
    Token.Head: '#FF0000',
    Token.Message: '#FFFFFF',
})


def print_output(head, message, style=NORMAL_STYLE):
    """Print prompt-toolkit tokens to output"""
    tokens = [
        (Token.Head, head + ' '),
        (Token.Message, message),
        (Token, '\n'),
    ]
    print_tokens(tokens, style=style)


def print_error(head, message, style=ERROR_STYLE):
    """Print to output with error style"""
    print_output(head, message, style=style)


def parse_keyword(command):
    unicode_command = ''
    if sys.version_info > (3,):
        unicode_command = command
    else:
        unicode_command = command.decode(COMMAND_LINE_ENCODING)
    return KEYWORD_SEP.split(unicode_command)


def assign_variable(bi, variable_name, args):
    variable_value = bi.run_keyword(*args)
    bi._variables.__setitem__(variable_name, variable_value)
    return variable_value


def run_keyword(bi, command):
    """Run a keyword in robotframewrk environment"""
    if not command:
        return
    try:
        keyword_args = parse_keyword(command)
        keyword = keyword_args[0]
        args = keyword_args[1:]

        is_comment = keyword.strip().startswith('#')
        if is_comment:
            return

        variable_name = keyword.rstrip('= ')
        if is_var(variable_name):
            variable_only = not args
            if variable_only:
                display_value = ['Log to console', keyword]
                bi.run_keyword(*display_value)
            else:
                variable_value = assign_variable(bi,
                                                 variable_name,
                                                 args)
                print_output('#',
                             '{} = {!r}'.format(variable_name,
                                                variable_value))
        else:
            result = bi.run_keyword(keyword, *args)
            if result:
                print_output('<', repr(result))
    except ExecutionFailed as exc:
        print_error('! keyword:', command)
        print_error('!', exc.message)
    except HandlerExecutionFailed as exc:
        print_error('! keyword:', command)
        print_error('!', exc.full_message)
    except Exception as exc:
        print_error('! keyword:', command)
        print_error('! FAILED:', repr(exc))


class CmdCompleter(Completer):

    """Completer for debug shell"""

    def __init__(self, commands, cmd_repl=None):
        self.names = []
        self.displays = {}
        self.display_metas = {}
        for name, display, display_meta in commands:
            self.names.append(name)
            self.displays[name] = display
            self.display_metas[name] = display_meta
        self.cmd_repl = cmd_repl

    def get_argument_completions(self, completer, document):
        """Using Cmd.py's completer to complete arguments"""
        endidx = document.cursor_position_col
        line = document.current_line
        begidx = (line[:endidx].rfind(' ') + 1
                  if line[:endidx].rfind(' ') >= 0 else 0)
        prefix = line[begidx:endidx]

        completions = completer(prefix,
                                line,
                                begidx,
                                endidx)
        for comp in completions:
            yield Completion(comp, begidx - endidx, display=comp)

    def get_completions(self, document, complete_event):
        """Compute suggestions"""
        text = document.text_before_cursor.lower()
        parts = KEYWORD_SEP.split(text)

        if len(parts) >= 2:
            cmd_name = parts[0].strip()
            completer = getattr(self.cmd_repl, 'complete_' + cmd_name, None)
            if completer:
                for c in self.get_argument_completions(completer, document):
                    yield c
            return

        for name in self.names:
            library_level = '.' in name and '.' in text
            root_level = '.' not in name and '.' not in text
            if not (root_level or library_level):
                continue

            if name.lower().strip().startswith(text.strip()):
                display = self.displays.get(name, '')
                display_meta = self.display_metas.get(name, '')
                yield Completion(name,
                                 -len(text),
                                 display=display,
                                 display_meta=display_meta)


class PtkCmd(BaseCmd):

    """CMD shell using prompt-toolkit"""

    prompt = u'> '
    get_prompt_tokens = None
    prompt_style = None
    intro = '''\
Only accepted plain text format keyword seperated with two or more spaces.
Type "help" for more information.\
'''

    def __init__(self, completekey='tab', stdin=None, stdout=None):
        BaseCmd.__init__(self, completekey, stdin, stdout)
        self.history = FileHistory(os.path.expanduser(HISTORY_PATH))

    def get_cmd_names(self):
        """Get all command names of CMD shell"""
        pre = 'do_'
        cut = len(pre)
        return [_[cut:] for _ in self.get_names() if _.startswith(pre)]

    def get_help_string(self, command_name):
        """Get help document of command"""
        func = getattr(self, 'do_' + command_name, None)
        if not func:
            return ''
        return func.__doc__

    def get_helps(self):
        """Get all help documents of commands"""
        return [(name, self.get_help_string(name) or name)
                for name in self.get_cmd_names()]

    def get_completer(self):
        """Get completer instance"""
        commands = [(name, '', doc) for name, doc in self.get_helps()]
        cmd_completer = CmdCompleter(commands, self)
        return cmd_completer

    def pre_loop(self):
        pass

    def cmdloop(self, intro=None):
        """Better command loop supported by prompt_toolkit

        override default cmdloop method
        """
        if intro is not None:
            self.intro = intro
        if self.intro:
            self.stdout.write(str(self.intro) + '\n')

        stop = None
        while not stop:
            self.pre_loop()
            if self.cmdqueue:
                line = self.cmdqueue.pop(0)
            else:
                kwargs = dict(history=self.history,
                              auto_suggest=AutoSuggestFromHistory(),
                              enable_history_search=True,
                              completer=self.get_completer(),
                              display_completions_in_columns=True,
                              on_abort=AbortAction.RETRY)
                if self.get_prompt_tokens:
                    kwargs['get_prompt_tokens'] = self.get_prompt_tokens
                    kwargs['style'] = self.prompt_style
                    prompt_str = u''
                else:
                    prompt_str = self.prompt
                try:
                    line = prompt(prompt_str, **kwargs)
                except EOFError:
                    line = 'EOF'
            line = self.precmd(line)
            stop = self.onecmd(line)
            stop = self.postcmd(stop, line)
        self.postloop()


def get_prompt_tokens(self, cli):
    """Print prompt-toolkit prompt"""
    return [
        (Token.Prompt, u'> '),
    ]


class DebugCmd(PtkCmd):

    """Interactive debug shell for robotframework"""

    get_prompt_tokens = get_prompt_tokens
    prompt_style = style_from_dict({Token.Prompt: '#0000FF'})

    def __init__(self, completekey='tab', stdin=None, stdout=None):
        PtkCmd.__init__(self, completekey, stdin, stdout)
        self.rf_bi = BuiltIn()

    def postcmd(self, stop, line):
        """Run after a command"""
        return stop

    def reset_robotframework_exception(self):
        if STOP_SIGNAL_MONITOR._signal_count:
            STOP_SIGNAL_MONITOR._signal_count = 0
            STOP_SIGNAL_MONITOR._running_keyword = True
            logger.info('Reset last exception by DebugLibrary')

    def pre_loop(self):
        self.reset_robotframework_exception()

    def do_help(self, arg):
        """Show help message."""
        if not arg.strip():
            print('''\
Input Robotframework keywords, or commands listed below.
Use "libs" or "l" to see available libraries,
use "keywords" or "k" see the list of library keywords,
use the TAB keyboard key to autocomplete keywords.\
''')

        PtkCmd.do_help(self, arg)

    def get_completer(self):
        """Get completer instance specified for robotframework"""
        # commands
        commands = [(cmd_name,
                     cmd_name,
                     'DEBUG command: {0}'.format(doc))
                    for cmd_name, doc in self.get_helps()]

        # libraries
        for lib in get_libs():
            commands.append((lib.name,
                             lib.name,
                             'Library: {0} {1}'.format(lib.name, lib.version)))

        # keywords
        for keyword in get_keywords():
            # name with library
            name = keyword['lib'] + '.' + keyword['name']
            commands.append((name,
                             keyword['name'],
                             u'Keyword: {0}'.format(keyword['doc'])))
            # name without library
            commands.append((keyword['name'],
                             keyword['name'],
                             u'Keyword[{0}.]: {1}'.format(keyword['lib'],
                                                          keyword['doc'])))

        cmd_completer = CmdCompleter(commands, self)
        return cmd_completer

    def do_selenium(self, arg):
        """Start a selenium webdriver and open url in browser you expect.

        s(elenium)  [<url>]  [<browser>]

        default url is google.com, default browser is firefox.
        """

        command = 'import library  SeleniumLibrary'
        print_output('#', command)
        run_keyword(self.rf_bi, command)

        # Set defaults, overriden if args set
        url = 'http://www.google.com/'
        browser = 'firefox'
        if arg:
            args = KEYWORD_SEP.split(arg)
            if len(args) == 2:
                url, browser = args
            else:
                url = arg
        if '://' not in url:
            url = 'http://' + url

        command = 'open browser  %s  %s' % (url, browser)
        print_output('#', command)
        run_keyword(self.rf_bi, command)

    do_s = do_selenium

    def complete_selenium(self, text, line, begin_idx, end_idx):
        """complete selenium command"""
        webdrivers = ['firefox',
                      'chrome',
                      'ie',
                      'opera',
                      'safari',
                      'phantomjs',
                      'remote']
        if len(line.split()) == 3:
            command, url, driver_name = line.lower().split()
            return [d for d in webdrivers if d.startswith(driver_name)]
        elif len(line.split()) == 2 and line.endswith(' '):
            return webdrivers
        return []

    complete_s = complete_selenium

    def default(self, line):
        """Run RobotFramework keywords"""
        command = line.strip()

        run_keyword(self.rf_bi, command)

    def do_libs(self, args):
        """Print imported and builtin libraries, with source if `-s` specified.

        l(ibs) [-s]
        """
        print_output('<', 'Imported libraries:')
        for lib in get_libs():
            print_output('   {}'.format(lib.name), lib.version)
            if lib.doc:
                print('       {}'.format(lib.doc.split('\n')[0]))
            if '-s' in args:
                print('       {}'.format(lib.source))
        print_output('<', 'Builtin libraries:')
        for name in sorted(list(STDLIBS)):
            print_output('   ' + name, '')

    do_l = do_libs

    def complete_libs(self, text, line, begin_idx, end_idx):
        """complete libs command"""
        if len(line.split()) == 1 and line.endswith(' '):
            return ['-s']
        return []

    complete_l = complete_libs

    def do_keywords(self, args):
        """Print keywords of libraries, all or starts with <lib_name>

        k(eywords) [<lib_name>]
        """
        lib_name = args
        matched = match_libs(lib_name)
        if not matched:
            print_error('< not found library', lib_name)
            return
        for name in matched:
            print_output('< Keywords of library', name)
            for keyword in get_lib_keywords(name):
                print_output('   {}\t'.format(keyword['name']),
                             keyword['doc'])

    do_k = do_keywords

    def complete_keywords(self, text, line, begin_idx, end_idx):
        """complete keywords command"""
        if len(line.split()) == 2:
            command, lib_name = line.split()
            return match_libs(lib_name)
        elif len(line.split()) == 1 and line.endswith(' '):
            return [_.name for _ in get_libs()]
        return []

    complete_k = complete_keywords


class DebugLibrary(object):

    """Debug Library for RobotFramework"""

    ROBOT_LIBRARY_SCOPE = 'GLOBAL'
    ROBOT_LIBRARY_VERSION = __version__

    def debug(self):
        """Open a interactive shell, run any RobotFramework keywords.

        Keywords seperated by two space or one tab, and Ctrl-D to exit.
        """

        # re-wire stdout so that we can use the cmd module and have readline
        # support
        old_stdout = sys.stdout
        sys.stdout = sys.__stdout__
        print_output('\n>>>>>', 'Enter interactive shell')
        debug_cmd = DebugCmd()
        debug_cmd.cmdloop()
        print_output('\n>>>>>', 'Exit shell.')
        # put stdout back where it was
        sys.stdout = old_stdout

    def get_remote_url(self):
        """Get selenium URL for connecting to remote WebDriver."""
        s = BuiltIn().get_library_instance('Selenium2Library')
        url = s._current_browser().command_executor._url

        return url

    def get_session_id(self):
        """Get selenium browser session id."""
        s = BuiltIn().get_library_instance('Selenium2Library')
        job_id = s._current_browser().session_id

        return job_id

    def get_webdriver_remote(self):
        """Print the way connecting to remote selenium server."""
        remote_url = self.get_remote_url()
        session_id = self.get_session_id()

        s = 'from selenium import webdriver;' \
            'd=webdriver.Remote(command_executor="%s",' \
            'desired_capabilities={});' \
            'd.session_id="%s"' % (
                remote_url,
                session_id
            )

        logger.console('''
DEBUG FROM CONSOLE
# geckodriver user please check https://stackoverflow.com/a/37968826/150841
%s
''' % (s))
        logger.info(s)

        return s


TEST_SUITE = b'''*** Settings ***
Library  DebugLibrary

** test case **
RFDEBUG REPL
    debug
'''


def shell():
    """A standalone robotframework shell"""

    with tempfile.NamedTemporaryFile(prefix='robot-debug-',
                                     suffix='.txt',
                                     delete=False) as test_file:
        try:
            test_file.write(TEST_SUITE)
            test_file.flush()

            default_no_logs = '-l None -x None -o None -L None -r None'
            if len(sys.argv) > 1:
                args = sys.argv[1:] + [test_file.name]
            else:
                args = default_no_logs.split() + [test_file.name]
            rc = run_cli(args)

            sys.exit(rc)
        finally:
            # pybot will raise PermissionError on Windows NT or later
            # if NamedTemporaryFile called with `delete=True`,
            # deleting test file seperated will be OK.
            if os.path.exists(test_file.name):
                os.unlink(test_file.name)


if __name__ == '__main__':
    shell()
