#!/usr/bin/env python

#  Copyright 2014->future! Mikko Korpela
#
#  Licensed under the Apache License, Version 2.0 (the "License");
#  you may not use this file except in compliance with the License.
#  You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
#  Unless required by applicable law or agreed to in writing, software
#  distributed under the License is distributed on an "AS IS" BASIS,
#  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#  See the License for the specific language governing permissions and
#  limitations under the License.
#
#  partly based on work by Nokia Solutions and Networks Oyj
"""A parallel executor for Robot Framework test cases.
Version 0.43.

Supports all Robot Framework command line options and also following
options (these must be before normal RF options):

--verbose
  more output

--command [ACTUAL COMMANDS TO START ROBOT EXECUTOR] --end-command
  RF script for situations where pybot is not used directly

--processes [NUMBER OF PROCESSES]
  How many parallel executors to use (default max of 2 and cpu count)

--resourcefile [FILEPATH]
  Indicator for a file that can contain shared variables for
  distributing resources.

--pabotlib
  Start PabotLib remote server. This enables locking and resource
  distribution between parallel test executions.

--pabotlibhost [HOSTNAME]
  Host name of the PabotLib remote server (default is 127.0.0.1)

--pabotlibport [PORT]
  Port number of the PabotLib remote server (default is 8270)

--suitesfrom [FILEPATH TO OUTPUTXML]
  Optionally read suites from output.xml file. Failed suites will run
  first and longer running ones will be executed before shorter ones.

--argumentfile[INTEGER] [FILEPATH]
  Run same suite with multiple argumentfile options.
  For example "--argumentfile1 arg1.txt --argumentfile2 arg2.txt".

Copyright 2017 Mikko Korpela - Apache 2 License
"""

from __future__ import absolute_import, print_function

import os
import re
import sys
import time
import datetime
import multiprocessing
import uuid
from glob import glob
from io import BytesIO, StringIO
import shutil
import subprocess
import threading
from contextlib import contextmanager
from robot import run, rebot
from robot import __version__ as ROBOT_VERSION
from robot.api import ExecutionResult
from robot.errors import Information
from robot.result.visitor import ResultVisitor
from robot.libraries.Remote import Remote
from multiprocessing.pool import ThreadPool
from robot.run import USAGE
from robot.utils import ArgumentParser, SYSTEM_ENCODING, is_unicode, PY2
import signal
from . import pabotlib
from .result_merger import merge

try:
    import queue
except ImportError:
    import Queue as queue

CTRL_C_PRESSED = False
MESSAGE_QUEUE = queue.Queue()
EXECUTION_POOL_IDS = []
EXECUTION_POOL_ID_LOCK = threading.Lock()
_PABOTLIBURI = '127.0.0.1:8270'
_PABOTLIBPROCESS = None
ARGSMATCHER = re.compile(r'--argumentfile(\d+)')
_BOURNELIKE_SHELL_BAD_CHARS_WITHOUT_DQUOTE = "!#$^&*?[(){}<>~;'`\\|= \t\n" # does not contain '"'


class Color:
    SUPPORTED_OSES = ['posix']

    GREEN = '\033[92m'
    RED = '\033[91m'
    ENDC = '\033[0m'
    YELLOW = '\033[93m'


def execute_and_wait_with(args):
    global CTRL_C_PRESSED
    if CTRL_C_PRESSED:
        # Keyboard interrupt has happened!
        return
    time.sleep(0)
    datasources, outs_dir, options, suite_name, command, verbose, (argfile_index, argfile) = args
    datasources = [d.encode('utf-8') if PY2 and is_unicode(d) else d
                   for d in datasources]
    outs_dir = os.path.join(outs_dir, argfile_index, suite_name)
    pool_id = _make_id()
    caller_id = uuid.uuid4().hex
    cmd = command + _options_for_custom_executor(options,
                                                 outs_dir,
                                                 suite_name,
                                                 argfile,
                                                 caller_id) + datasources
    cmd = [c if not any(bad in c for bad in _BOURNELIKE_SHELL_BAD_CHARS_WITHOUT_DQUOTE) else '"%s"' % c for c in cmd]
    os.makedirs(outs_dir)
    try:
        with open(os.path.join(outs_dir, 'stdout.txt'), 'w') as stdout:
            with open(os.path.join(outs_dir, 'stderr.txt'), 'w') as stderr:
                process, (rc, elapsed) = _run(cmd, stderr, stdout, suite_name, verbose, pool_id)
    except:
        print(sys.exc_info()[0])
    if rc != 0:
        _write_with_id(process, pool_id, _execution_failed_message(suite_name, stdout, stderr, rc, verbose), Color.RED)
        if _PABOTLIBPROCESS or _PABOTLIBURI != '127.0.0.1:8270':
            Remote(_PABOTLIBURI).run_keyword('release_locks', [caller_id], {})
    else:
        _write_with_id(process, pool_id, _execution_passed_message(suite_name, stdout, stderr, elapsed, verbose), Color.GREEN)


def _write_with_id(process, pool_id, message, color=None, timestamp=None):
    timestamp = timestamp or datetime.datetime.now()
    _write("%s [PID:%s] [%s] %s" % (timestamp, process.pid, pool_id, message), color)


def _make_id():
    global EXECUTION_POOL_IDS, EXECUTION_POOL_ID_LOCK
    thread_id = threading.current_thread().ident
    with EXECUTION_POOL_ID_LOCK:
        if thread_id not in EXECUTION_POOL_IDS:
            EXECUTION_POOL_IDS += [thread_id]
        return EXECUTION_POOL_IDS.index(thread_id)


def _run(cmd, stderr, stdout, suite_name, verbose, pool_id):
    timestamp = datetime.datetime.now()
    # isinstance(cmd,list)==True
    cmd = ' '.join(cmd)
    # isinstance(cmd,basestring if PY2 else str)==True
    if PY2:
        cmd = cmd.decode('utf-8').encode(SYSTEM_ENCODING)
    process = subprocess.Popen(cmd,
                               shell=True,
                               stderr=stderr,
                               stdout=stdout)
    if verbose:
        _write_with_id(process, pool_id, 'EXECUTING PARALLEL SUITE %s with command:\n%s' % (suite_name, cmd),timestamp=timestamp)
    else:
        _write_with_id(process, pool_id, 'EXECUTING %s' % suite_name, timestamp=timestamp)
    return process, _wait_for_return_code(process, suite_name, pool_id)


def _wait_for_return_code(process, suite_name, pool_id):
    rc = None
    elapsed = 0
    ping_time = ping_interval = 150
    while rc is None:
        rc = process.poll()
        time.sleep(0.1)
        elapsed += 1
        if elapsed == ping_time:
            ping_interval += 50
            ping_time += ping_interval
            _write_with_id(process, pool_id, 'still running %s after %s seconds '
                                             '(next ping in %s seconds)'
                           % (suite_name, elapsed / 10.0, ping_interval / 10.0))
    return rc, elapsed / 10.0

def _read_file(file_handle):
    try:
        with open(file_handle.name, 'r') as content_file:
            content = content_file.read()
        return content
    except:
        return 'Unable to read file %s' % file_handle

def _execution_failed_message(suite_name, stdout, stderr, rc, verbose):
    if not verbose:
        return 'FAILED %s' % suite_name
    return 'Execution failed in %s with %d failing test(s)\n%s\n%s' % (suite_name, rc, _read_file(stdout), _read_file(stderr))

def _execution_passed_message(suite_name, stdout, stderr, elapsed, verbose):
    if not verbose:
        return 'PASSED %s in %s seconds' % (suite_name, elapsed)
    return 'PASSED %s in %s seconds\n%s\n%s' % (suite_name, elapsed, _read_file(stdout), _read_file(stderr))

def _options_for_custom_executor(*args):
    return _options_to_cli_arguments(_options_for_executor(*args))


def _options_for_executor(options, outs_dir, suite_name, argfile, caller_id):
    options = options.copy()
    options['log'] = 'NONE'
    options['report'] = 'NONE'
    options['xunit'] = 'NONE'
    options['suite'] = suite_name
    options['outputdir'] = outs_dir
    options['variable'] = options.get('variable')[:]
    options['variable'].append('CALLER_ID:%s' % caller_id)
    pabotLibURIVar = 'PABOTLIBURI:%s' % _PABOTLIBURI
    # Prevent multiple appending of PABOTLIBURI variable setting
    if pabotLibURIVar not in options['variable']:
        options['variable'].append(pabotLibURIVar)
    pabotExecutionPoolId = "PABOTEXECUTIONPOOLID:%d" % _make_id()
    if pabotExecutionPoolId not in options['variable']:
        options['variable'].append(pabotExecutionPoolId)
    if argfile:
        options['argumentfile'] = argfile
    return _set_terminal_coloring_options(options)


def _set_terminal_coloring_options(options):
    if ROBOT_VERSION >= '2.9':
        options['consolecolors'] = 'off'
        options['consolemarkers'] = 'off'
    else:
        options['monitorcolors'] = 'off'
    if ROBOT_VERSION >= '2.8' and ROBOT_VERSION < '2.9':
        options['monitormarkers'] = 'off'
    return options


def _options_to_cli_arguments(opts):
    res = []
    for k, v in opts.items():
        if isinstance(v, str):
            res += ['--' + str(k), str(v)]
        elif PY2 and is_unicode(v):
            res += ['--' + str(k), v.encode('utf-8')]
        elif isinstance(v, bool) and (v is True):
            res += ['--' + str(k)]
        elif isinstance(v, list):
            for value in v:
                if PY2 and is_unicode(value):
                    res += ['--' + str(k), value.encode('utf-8')]
                else:
                    res += ['--' + str(k), str(value)]
    return res


class GatherSuiteNames(ResultVisitor):
    def __init__(self):
        self.result = []

    def end_suite(self, suite):
        if len(suite.tests):
            self.result.append(suite.longname)


def get_suite_names(output_file):
    if not os.path.isfile(output_file):
        print("get_suite_names: output_file='%s' does not exist" % output_file)
        return []
    try:
        e = ExecutionResult(output_file)
        gatherer = GatherSuiteNames()
        e.visit(gatherer)
        return gatherer.result
    except:
        print("Exception in get_suite_names!")
        return []


def _processes_count():
    try:
        return max(multiprocessing.cpu_count(), 2)
    except NotImplementedError:
        return 2


def _parse_args(args):
    pabot_args = {'command': ['pybot'],
                  'verbose': False,
                  'tutorial': False,
                  'help': False,
                  'pabotlib': False,
                  'pabotlibhost': '127.0.0.1',
                  'pabotlibport': 8270,
                  'processes': _processes_count(),
                  'argumentfiles': []}
    while args and (args[0] in ['--' + param for param in ['command',
                                                           'processes',
                                                           'verbose',
                                                           'tutorial',
                                                           'resourcefile',
                                                           'pabotlib',
                                                           'pabotlibhost',
                                                           'pabotlibport',
                                                           'suitesfrom',
                                                           'help']] or
                        ARGSMATCHER.match(args[0])):
        if args[0] == '--command':
            end_index = args.index('--end-command')
            pabot_args['command'] = args[1:end_index]
            args = args[end_index + 1:]
        if args[0] == '--processes':
            pabot_args['processes'] = int(args[1])
            args = args[2:]
        if args[0] == '--verbose':
            pabot_args['verbose'] = True
            args = args[1:]
        if args[0] == '--resourcefile':
            pabot_args['resourcefile'] = args[1]
            args = args[2:]
        if args[0] == '--pabotlib':
            pabot_args['pabotlib'] = True
            args = args[1:]
        if args[0] == '--pabotlibhost':
            pabot_args['pabotlibhost'] = args[1]
            args = args[2:]
        if args[0] == '--pabotlibport':
            pabot_args['pabotlibport'] = int(args[1])
            args = args[2:]
        if args[0] == '--suitesfrom':
            pabot_args['suitesfrom'] = args[1]
            args = args[2:]
        match = ARGSMATCHER.match(args[0])
        if ARGSMATCHER.match(args[0]):
            pabot_args['argumentfiles'] += [(match.group(1), args[1])]
            args = args[2:]
        if args[0] == '--tutorial':
            pabot_args['tutorial'] = True
            args = args[1:]
        if args and args[0] == '--help':
            pabot_args['help'] = True
            args = args[1:]
    options, datasources = ArgumentParser(USAGE,
                                          auto_pythonpath=False,
                                          auto_argumentfile=False,
                                          env_options='ROBOT_OPTIONS'). \
        parse_args(args)
    if len(datasources) > 1 and options['name'] is None:
        options['name'] = 'Suites'
    keys = set()
    for k in options:
        if options[k] is None:
            keys.add(k)
    for k in keys:
        del options[k]
    return options, datasources, pabot_args


def solve_suite_names(outs_dir, datasources, options, pabot_args):
    if 'suitesfrom' in pabot_args:
        return _suites_from_outputxml(pabot_args['suitesfrom'])
    opts = _options_for_dryrun(options, outs_dir)
    with _with_modified_robot():
        run(*datasources, **opts)
    output = os.path.join(outs_dir, opts['output'])
    suite_names = get_suite_names(output)
    if not suite_names:
        stdout_value = opts['stdout'].getvalue()
        if stdout_value:
            print("[STDOUT] from suite search:")
            print(stdout_value)
            print("[STDOUT] end")
        stderr_value = opts['stderr'].getvalue()
        if stderr_value:
            print("[STDERR] from suite search:")
            print(stderr_value)
            print("[STDERR] end")
    return sorted(set(suite_names))


@contextmanager
def _with_modified_robot():
    TsvReader = None
    old_read = None
    try:
        from robot.parsing.tsvreader import TsvReader, Utf8Reader

        def new_read(self, tsvfile, populator):
            process = False
            first = True
            for row in Utf8Reader(tsvfile).readlines():
                row = self._process_row(row)
                cells = [self._process_cell(cell)
                         for cell in self.split_row(row)]
                if cells and cells[0].strip().startswith('*') and \
                        populator.start_table([c.replace('*', '')
                                               for c in cells]):
                    process = True
                elif process:
                    if cells[0].strip() != '' or \
                            (len(cells) > 1 and
                                 ('[' in cells[1] or (first and '...' in cells[1]))):
                        populator.add(cells)
                        first = True
                    elif first:
                        populator.add(['', 'No Operation'])
                        first = False
            populator.eof()

        old_read = TsvReader.read
        TsvReader.read = new_read
    except:
        pass

    try:
        yield
    finally:
        if TsvReader:
            TsvReader.read = old_read


class SuiteNotPassingsAndTimes(ResultVisitor):
    def __init__(self):
        self.suites = []

    def start_suite(self, suite):
        if len(suite.tests) > 0:
            self.suites.append((not suite.passed,
                                suite.elapsedtime,
                                suite.longname))


def _suites_from_outputxml(outputxml):
    res = ExecutionResult(outputxml)
    suite_times = SuiteNotPassingsAndTimes()
    res.visit(suite_times)
    return [suite for (_, _, suite) in reversed(sorted(suite_times.suites))]


def _options_for_dryrun(options, outs_dir):
    options = options.copy()
    options['log'] = 'NONE'
    options['report'] = 'NONE'
    options['xunit'] = 'NONE'
    if ROBOT_VERSION >= '2.8':
        options['dryrun'] = True
    else:
        options['runmode'] = 'DryRun'
    options['output'] = 'suite_names.xml'
    # --timestampoutputs is not compatible with hard-coded suite_names.xml
    options['timestampoutputs'] = False
    options['outputdir'] = outs_dir
    if PY2:
        options['stdout'] = BytesIO()
        options['stderr'] = BytesIO()
    else:
        options['stdout'] = StringIO()
        options['stderr'] = StringIO()
    options['listener'] = []
    return _set_terminal_coloring_options(options)


def _options_for_rebot(options, start_time_string, end_time_string):
    rebot_options = options.copy()
    rebot_options['starttime'] = start_time_string
    rebot_options['endtime'] = end_time_string
    rebot_options['monitorcolors'] = 'off'
    if ROBOT_VERSION >= '2.8':
        options['monitormarkers'] = 'off'
    return rebot_options


def _now():
    return datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f')


def _print_elapsed(start, end):
    elapsed = end - start
    millis = int((elapsed * 1000) % 1000)
    seconds = int(elapsed) % 60
    elapsed_minutes = (int(elapsed) - seconds) / 60
    minutes = elapsed_minutes % 60
    elapsed_hours = (elapsed_minutes - minutes) / 60
    elapsed_string = ''
    if elapsed_hours > 0:
        elapsed_string += '%d hours ' % elapsed_hours
    elapsed_string += '%d minutes %d.%d seconds' % (minutes, seconds, millis)
    print('Elapsed time: ' + elapsed_string)


def keyboard_interrupt(*args):
    global CTRL_C_PRESSED
    CTRL_C_PRESSED = True


def _parallel_execute(datasources, options, outs_dir, pabot_args, suite_names):
    original_signal_handler = signal.signal(signal.SIGINT, keyboard_interrupt)
    pool = ThreadPool(pabot_args['processes'])
    result = pool.map_async(execute_and_wait_with,
                            ((datasources, outs_dir, options, suite,
                              pabot_args['command'], pabot_args['verbose'], argfile)
                             for suite in suite_names
                             for argfile in pabot_args['argumentfiles'] or [("", None)]),1)
    pool.close()
    while not result.ready():
        # keyboard interrupt is executed in main thread
        # and needs this loop to get time to get executed
        try:
            time.sleep(0.1)
        except IOError:
            keyboard_interrupt()
    signal.signal(signal.SIGINT, original_signal_handler)


def _output_dir(options, cleanup=True):
    outputdir = options.get('outputdir', '.')
    outpath = os.path.join(outputdir, 'pabot_results')
    if cleanup and os.path.isdir(outpath):
        shutil.rmtree(outpath)
    return outpath


def _copy_screenshots(options):
    pabot_outputdir = _output_dir(options, cleanup=False)
    outputdir = options.get('outputdir', '.')
    for location, dir_names, file_names in os.walk(pabot_outputdir):
        for file_name in file_names:
            # We want ALL screenshots copied, not just selenium ones!
            if file_name.endswith(".png"):
                prefix = os.path.relpath(location, pabot_outputdir)
                # But not .png files in any sub-folders of "location"
                if os.sep in prefix:
                    continue
                dst_file_name = '-'.join([prefix, file_name])
                shutil.copyfile(os.path.join(location, file_name),
                                os.path.join(outputdir, dst_file_name))


def _report_results(outs_dir, pabot_args, options, start_time_string, tests_root_name):
    if pabot_args['argumentfiles']:
        outputs = []
        for index, _ in pabot_args['argumentfiles']:
            outputs += [_merge_one_run(os.path.join(outs_dir, index), options, tests_root_name,
                                       outputfile=os.path.join('pabot_results', 'output%s.xml' % index))]
            _copy_screenshots(options)
        options['output'] = 'output.xml'
        return rebot(*outputs, **_options_for_rebot(options,
                                                    start_time_string, _now()))
    else:
        return _report_results_for_one_run(outs_dir, options, start_time_string, tests_root_name)


def _report_results_for_one_run(outs_dir, options, start_time_string, tests_root_name):
    output_path = _merge_one_run(outs_dir, options, tests_root_name)
    _copy_screenshots(options)
    print('Output:  %s' % output_path)
    options['output'] = None  # Do not write output again with rebot
    return rebot(output_path, **_options_for_rebot(options,
                                                   start_time_string, _now()))


def _merge_one_run(outs_dir, options, tests_root_name, outputfile='output.xml'):
    output_path = os.path.abspath(os.path.join(
        options.get('outputdir', '.'),
        options.get('output', outputfile)))
    files = sorted(glob(os.path.join(_glob_escape(outs_dir), '**/*.xml')))
    if not files:
        _write('WARN: No output files in "%s"' % outs_dir, Color.YELLOW)
        return ""
    merge(files, options, tests_root_name).save(output_path)
    return output_path


# This is from https://github.com/django/django/blob/master/django/utils/glob.py
_magic_check = re.compile('([*?[])')


def _glob_escape(pathname):
    """
    Escape all special characters.
    """
    drive, pathname = os.path.splitdrive(pathname)
    pathname = _magic_check.sub(r'[\1]', pathname)
    return drive + pathname


def _writer():
    while True:
        message = MESSAGE_QUEUE.get()
        print(message)
        sys.stdout.flush()


def _write(message, color=None):
    MESSAGE_QUEUE.put(_wrap_with(color, message))


def _wrap_with(color, message):
    if _is_output_coloring_supported() and color:
        return "%s%s%s" % (color, message, Color.ENDC)
    return message


def _is_output_coloring_supported():
    return sys.stdout.isatty() and os.name in Color.SUPPORTED_OSES


def _start_message_writer():
    t = threading.Thread(target=_writer)
    t.setDaemon(True)
    t.start()


def _start_remote_library(pabot_args):
    global _PABOTLIBURI
    _PABOTLIBURI = '%s:%s' % (pabot_args['pabotlibhost'],
                              pabot_args['pabotlibport'])
    if not pabot_args['pabotlib']:
        return None
    if pabot_args.get('resourcefile') and not os.path.exists(
            pabot_args['resourcefile']):
        _write('Warning: specified resource file doesn\'t exist.'
               ' Some tests may fail or continue forever.', Color.YELLOW)
        pabot_args['resourcefile'] = None
    return subprocess.Popen('{python} {pabotlibpath} {resourcefile} {pabotlibhost} {pabotlibport}'.format(
        python=sys.executable,
        pabotlibpath=os.path.abspath(pabotlib.__file__),
        resourcefile=pabot_args.get('resourcefile'),
        pabotlibhost=pabot_args['pabotlibhost'],
        pabotlibport=pabot_args['pabotlibport']),
        shell=True)


def _stop_remote_library(process):
    _write('Stopping PabotLib process')
    Remote(_PABOTLIBURI).run_keyword('stop_remote_server', [], {})
    i = 50
    while i > 0 and process.poll() is None:
        time.sleep(0.1)
        i -= 1
    if i == 0:
        _write('Could not stop PabotLib Process in 5 seconds ' \
               '- calling terminate', Color.YELLOW)
        process.terminate()
    else:
        _write('PabotLib process stopped')


def _get_suite_root_name(suite_names):
    top_names = [x.split('.')[0] for x in suite_names]
    if top_names.count(top_names[0]) == len(top_names):
        return top_names[0]
    return ''


def _run_tutorial():
    print('Hi, This is a short introduction to using Pabot.')
    user_input = raw_input if PY2 else input
    user_input("Press Enter to continue...")
    print('This is another line in the tutorial.')


def main(args):
    global _PABOTLIBPROCESS
    start_time = time.time()
    start_time_string = _now()
    # NOTE: timeout option
    try:
        _start_message_writer()
        options, datasources, pabot_args = _parse_args(args)
        if pabot_args['tutorial']:
            _run_tutorial()
            sys.exit(0)
        if pabot_args['help']:
            print(__doc__)
            sys.exit(0)
        _PABOTLIBPROCESS = _start_remote_library(pabot_args)
        outs_dir = _output_dir(options)
        suite_names = solve_suite_names(outs_dir, datasources, options,
                                        pabot_args)
        if suite_names:
            _parallel_execute(datasources, options, outs_dir, pabot_args,
                              suite_names)
            sys.exit(_report_results(outs_dir, pabot_args, options, start_time_string,
                                     _get_suite_root_name(suite_names)))
        else:
            print('No tests to execute')
    except Information as i:
        print(__doc__)
        print(i.message)
    finally:
        if _PABOTLIBPROCESS:
            _stop_remote_library(_PABOTLIBPROCESS)
        _print_elapsed(start_time, time.time())


if __name__ == '__main__':
    main(sys.argv[1:])
