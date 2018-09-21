# -*- coding: utf-8 -*-
# robotsuite
# Copyright (C) 2014 Asko Soukka and contributors
#
# This program is free software; you can redistribute it and/or modify it under
# the terms of the GNU General Public License version 2 as published by the
# Free Software Foundation.
#
# This program is distributed in the hope that it will be useful, but WITHOUT
# ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
# FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
# details.
#
# You should have received a copy of the GNU General Public License along with
# this program; if not, write to the Free Software Foundation, Inc., 51
# Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
"""Python unittest wrapper for Robot Framework
"""
from __future__ import print_function

import six
from six import StringIO
import doctest
import logging
import os
import re
import shutil
import string
import types
import unicodedata
import unittest

from robot import parsing as robot_parsing
from robot import model as robot_model
from robot.output import LOGGER
from robot.rebot import rebot as robot_rebot
from robot.conf import RobotSettings
from robot.reporting import ResultWriter
from robot.running import TestSuiteBuilder

from lxml import etree

try:
    loglevel = int(getattr(logging, os.environ.get('ROBOTSUITE_LOGLEVEL')))
except (AttributeError, TypeError, ValueError):
    loglevel = 20
append_output_xml = bool(os.environ.get('ROBOTSUITE_APPEND_OUTPUT_XML'))

last_status = None
last_message = None


# noinspection PyBroadException
def normalize(s, replace_spaces=True):
    """Normalize non-ascii characters to their closest ascii counterparts
    """
    whitelist = (' -' + string.ascii_letters + string.digits)

    if type(s) == six.binary_type:
        s = six.text_type(s, 'utf-8', 'ignore')

    table = {}
    for ch in [ch for ch in s if ch not in whitelist]:
        if ch not in table:
            try:
                replacement = unicodedata.normalize('NFKD', ch)[0]
                if replacement in whitelist:
                    table[ord(ch)] = replacement
                else:
                    table[ord(ch)] = u'_'
            except:
                table[ord(ch)] = u'_'

    if replace_spaces:
        return s.translate(table).replace(u'_', u'').replace(' ', '_')
    else:
        return s.translate(table).replace(u'_', u'')


def get_robot_variables():
    """Return list of Robot Framework -compatible cli-variables parsed
    from ROBOT_-prefixed environment variable

    """
    prefix = 'ROBOT_'
    variables = []

    def safe_str(s):
        if isinstance(s, six.text_type):
            return s
        else:
            return six.text_type(s, 'utf-8', 'ignore')
    for key in os.environ:
        if key.startswith(prefix) and len(key) > len(prefix):
            variables.append(safe_str(
                '%s:%s' % (key[len(prefix):], os.environ[key]),
            ))
    return variables


def merge(a, b):
    """Merge two unicode Robot Framework reports so that report 'b' is merged
    into report 'a'. This merge may not be complete and may be is lossy. Still,
    note that the original single test reports will remain untouched.

    """
    global loglevel

    # Iterate throughout the currently merged node set
    for child in b.iterchildren():

        # Merge suites
        if child.tag == 'suite':
            source = child.get('source')
            suites = a.xpath('suite[@source="%s"]' % source)
            # When matching suite is found, merge
            if suites:
                merge(suites[0], child)
            # When no matching suite is found, append and fix ids
            else:
                suites = a.xpath('suite')
                child_id = child.get('id')
                parent_id = a.get('id', '')
                if parent_id:
                    suite_id = '%s-s%s' % (parent_id, str(len(suites) + 1))
                else:
                    suite_id = 's%s' % str(len(suites) + 1)
                for node in child.xpath('//*[contains(@id, "%s")]' % child_id):
                    node.set('id', re.sub('^%s' % child_id, suite_id,
                                          node.get('id')))
                a.append(child)
                # Gather separate top-level suites into a single top-level
                # suite
            if a.tag == 'robot' and a.xpath('suite[@source]'):
                for merge_root in a.xpath('suite[not(@source)]'):
                    mergeable = etree.Element('robot')
                    for suite in a.xpath('suite[@source]'):
                        mergeable.append(suite)
                    merge(merge_root, mergeable)
        # Merge keywords
        elif child.tag == 'kw':
            name = child.get('name')
            type_ = child.get('type')
            keywords = a.xpath('kw[@name="%s" and @type="%s"]' % (name, type_))
            # When matching keyword is found, merge
            if len(keywords) == 1:
                merge(keywords[0], child)
            # When multiple matching keywords is found, merge with position
            elif len(keywords) > 1:
                child_keywords = child.getparent().xpath(
                    'kw[@name="%s" and @type="%s"]' % (name, type_))
                child_position = child_keywords.index(child)
                merge(keywords[min(child_position, len(keywords) - 1)], child)
            # When no matching suite is found, append
            else:
                a.append(child)

        # Merge (append) tests
        elif child.tag == 'test':
            tests = a.xpath('test')
            child.set('id', '%s-t%s' % (a.get('id'), str(len(tests) + 1)))
            a.append(child)

        # Merge (append) statuses
        elif child.tag == 'status':
            a.append(child)

        # Merge statistics
        elif child.tag == 'statistics':
            statistics = a.xpath('statistics')
            # When no statistics are found, append to root
            if not statistics:
                a.append(child)
            # When statistics are found, merge matching or append
            else:
                for grandchild in child.xpath('total'):
                    totals = a.xpath('statistics/total')
                    if totals:
                        merge(totals[0], grandchild)
                    else:
                        statistics.append(child)
                for grandchild in child.xpath('suite'):
                    suites = a.xpath('statistics/suite')
                    if suites:
                        merge(suites[0], grandchild)
                    else:
                        statistics.append(child)

        # Merge individual statistics
        elif child.tag == 'stat':
            stats = a.xpath('stat[text() = "%s"]' % child.text)
            if stats:
                stats[0].set('fail', str(int(stats[0].get('fail'))
                                         + int(child.get('fail'))))
                stats[0].set('pass', str(int(stats[0].get('pass'))
                                         + int(child.get('pass'))))
            else:
                suites = a.xpath('//suite[@name="%s"]' % child.get('name'))
                if suites:
                    child.set('id', suites[0].get('id'))
                a.append(child)

        # Merge errors
        elif child.tag == 'errors':
            errors = a.xpath('errors')
            # Filter by loglevel
            for grandchild in tuple(child.iterchildren()):
                try:
                    level = int(getattr(logging, grandchild.get('level')))
                except (TypeError, AttributeError, ValueError):
                    level = 0
                if level < loglevel:
                    child.remove(grandchild)
            # When no errors are found, append to root
            if not errors:
                a.append(child)
            # When errors are found, append the children
            else:
                for grandchild in child.iterchildren():
                    errors[0].append(grandchild)


class RobotListener(object):
    """Robot Framework test runner test listener for registering the
    last known test result into a global variable

    """
    ROBOT_LISTENER_API_VERSION = 2

    def __init__(self, test_name = ''):
        self.test_name = test_name

    def end_test(self, name, attributes):
        global last_status
        global last_message
        last_status = attributes['status']
        last_message = attributes['message']


class RobotTestCase(unittest.TestCase):
    """Robot Framework test suite for running a single test case
    """
    # noinspection PyUnusedLocal
    def __init__(self, filename, module_relative=True, package=None,
                 source=None, name=None, tags=None, variables=None,
                 outputdir=None, setUp=None, tearDown=None, critical=None,
                 noncritical=None, **kw):
        unittest.TestCase.__init__(self)

        filename = doctest._module_relative_path(package, filename)
        suite = robot_parsing.TestData(source=filename)
        suite_parent = os.path.dirname(filename)
        self._relative_path = None

        def walk(child_suite, test_case, suite_parent):
            found = False
            if source and child_suite.source != source:
                child_suite.testcase_table.tests = []
            elif name:
                tests = child_suite.testcase_table.tests
                child_suite.testcase_table.tests = \
                    list(filter(lambda x: x.name == name, tests))
                test_case._relative_path = \
                    os.path.relpath(child_suite.source, suite_parent)
                if len(list(child_suite.testcase_table.tests)):
                    found = True
            for grandchild in getattr(child_suite, 'children', [])[:]:
                if not walk(grandchild, test_case, suite_parent):
                    child_suite.children.remove(grandchild)
                else:
                    found = True
            return found

        walk(suite, self, suite_parent)

        # Mimic DocTestCase to support plone.testing's way of settings test
        # layer as doctest global:
        class LayerPlaceHolder(object):
            globs = None
        setattr(self, '_dt_test', LayerPlaceHolder())
        setattr(self._dt_test, 'globs', {})

        # Set suite to be run by runTest
        self._robot_suite = suite
        # Set outputdir for log, report and screenshots
        self._robot_outputdir = outputdir
        # Set test method name from the test name
        self._testMethodName = normalize(name or 'runTest',
                                         replace_spaces=False)
        # Set tags to be included in tests' __str__
        self._tags = tags
        # Set variables to pass for pybot
        self._variables = variables or []
        setattr(self, self._testMethodName, self.runTest)

        # Set tags that should be considered (non)critical
        self._critical = critical or []
        self._noncritical = noncritical or []

        # Set test fixture setup and teardown methods when given
        if setUp:
            setattr(self, 'setUp', types.MethodType(setUp, self))
        if tearDown:
            setattr(self, 'tearDown', types.MethodType(tearDown, self))

        # Set module name from the package to please some report formatter
        self.__module__ = package.__name__

    def __str__(self):
        tags = ''
        prefix = os.environ.get('ROBOTSUITE_PREFIX') or ''
        if prefix:
            prefix += ':'
        for tag in (self._tags or []):
            tags += ' #' + tag
        return '%s (%s%s)%s' % (
            self._testMethodName, prefix, self._relative_path, tags)

    def id(self):
        return '%s.%s.%s' % (
            self.__module__, self.__class__.__name__, self._testMethodName)

    def _runTest(self, parsed, **options):
        settings = RobotSettings(options)
        output_config = getattr(settings, 'console_output_config', {
            'width': getattr(settings, 'console_width', 78),
            'colors': getattr(settings, 'console_colors', 'AUTO'),
            'markers': getattr(settings, 'console_markers', 'AUTO'),
            'stdout': settings['StdOut'],
            'stderr': settings['StdErr']
        })
        LOGGER.register_console_logger(**output_config)
        LOGGER.info('Settings:\n%s' % six.text_type(settings))
        suite = TestSuiteBuilder(
            settings['SuiteNames'],
            settings['WarnOnSkipped'])._build_suite(parsed)
        suite.configure(**settings.suite_config)
        result = suite.run(settings)
        LOGGER.info("Tests execution ended. Statistics:\n%s"
                    % result.suite.statistics.message)
        rc = result.return_code
        if settings.log or settings.report or settings.xunit:
            writer = ResultWriter(settings.output if settings.log else result)
            writer.write_results(settings.get_rebot_settings())
        return rc

    def runTest(self):
        # Create StringIO to capture stdout into
        stdout = StringIO()

        # Inject logged errors into our captured stdout
        logger = logging.getLogger()
        handler = logging.StreamHandler(stdout)
        formatter = logging.Formatter(
            '\n%(asctime)s - %(name)s - %(levelname)s - %(message)s')
        handler.setFormatter(formatter)
        handler.setLevel(logging.ERROR)
        logger.addHandler(handler)

        # Run robot with capturing stdout
        options = {
            'variable': self._variables,
            'listener': ('robotsuite.RobotListener',),
            'outputdir': self._robot_outputdir,
            'stdout': stdout,
            'critical': self._critical,
            'noncritical': self._noncritical,
        }
        self._runTest(self._robot_suite, **options)
        stdout.seek(0)

        # Dump stdout on test failure or error
        if last_status != 'PASS':
            print('\n%s' % stdout.read())

        # XXX: Up to this point, everything was easy. Unfortunately, now we
        # must merge all the separate test reports into a one big summary and
        # copy all the captured screenshots into the current working directory
        # (to make it easy to publish them on Jenkins).

        # Get full relative path for the 'output.xml' and read it into 'data'
        current_data_source = os.path.join(self._robot_outputdir, 'output.xml')
        with open(current_data_source, 'rb') as handle:
            data = six.text_type(handle.read(), 'utf-8')

        # Copy screenshots in to the current working directory
        dirname = os.path.dirname(current_data_source)
        prefix = 'robot_%s_' % dirname.replace(os.path.sep, '_')
        screenshots = re.findall('src="([^"]+\.png)"', data)
        for filename in screenshots:
            path = os.path.join(dirname, filename)
            if os.path.isfile(path):
                copy_filename = filename\
                    .replace(os.path.sep, '')\
                    .replace(os.pardir, '')
                shutil.copyfile(path, "%s%s" % (prefix, copy_filename))
        # Fix 'a' and 'img' tags to target the copied versions
        data = re.sub('(href|src)="([^"]+\.png)"',
                      '\\1="%s\\2"' % prefix, data)

        # Try to merge the second 'output.xml' into the first one or into the
        # final one from the previous test run when requested by setting
        # environment variable ROBOTSUITE_PRESERVE_OUTPUT_XML
        global append_output_xml
        if not append_output_xml:
            append_output_xml = True
        elif os.path.exists('robot_output.xml'):
            with open('robot_output.xml', 'rb') as handle:
                merged_output = etree.fromstring(handle.read())
            try:
                current_output = etree.fromstring(data.encode('utf-8'))
                # Merge multiple test suites into the same (pseudo) root
                # to make the result work with rebot
                try:
                    merged_root = merged_output.xpath('suite[not(@source)]')
                    merged_source = merged_output.find('suite').get('source')
                    current_source = current_output.find('suite').get('source')
                    if not merged_root and merged_source != current_source:
                        temp = etree.fromstring(
                            '<robot>'
                            '<suite id="s1" name="Robot"/>'
                            '<statistics><total/><tag/><suite/></statistics>'
                            '<errors/>'
                            '</robot>'
                        )
                        merge(temp, merged_output)
                        merged_output = temp
                except AttributeError:
                    pass
                merge(merged_output, current_output)
                data = etree.tostring(merged_output).decode('utf-8')
            # Catch any exception here and print it (to help fixing it)
            except Exception as e:
                import traceback

                stacktrace = StringIO()
                traceback.print_exc(None, stacktrace)
                print("ROBOTSUITE ERROR when merging test reports: %s\n%s" %
                      (str(e), stacktrace.getvalue()))

        # Save the merged 'output.xml' and generate merged reports
        with open('robot_output.xml', 'wb') as handle:
            handle.write(data.encode('utf-8'))
        robot_rebot('robot_output.xml', stdout=stdout, output='NONE',
                    log='robot_log.html', report='robot_report.html',
                    critical=self._critical, noncritical=self._noncritical)

        # If the test is critical, raise AssertionError when it has failed
        criticality = robot_model.Criticality(
            critical_tags=self._critical, non_critical_tags=self._noncritical)
        is_critical = (
            criticality.critical_tags
            and criticality.critical_tags.match(self._tags)
        ) or (
            not criticality.non_critical_tags.match(self._tags)
        )
        if is_critical:
            assert last_status == 'PASS', last_message


def RobotTestSuite(*paths, **kw):
    """Build up a test suite similarly to doctest.DocFileSuite
    """
    suite = unittest.TestSuite()
    if 'ROBOTSUITE_LEVEL' in os.environ:
        try:
            suite.level = int(os.environ.get('ROBOTSUITE_LEVEL', 1))
        except ValueError:
            pass
    if kw.get('module_relative', True):
        kw['package'] = doctest._normalize_module(kw.get('package'))

    variables = get_robot_variables()

    for path in paths:
        filename = doctest._module_relative_path(kw['package'], path)
        robot_suite = robot_parsing.TestData(source=filename)

        # Split the robot suite into separate test cases

        outputdir = []

        def recurs(child_suite):
            suite_base = os.path.basename(child_suite.source)
            suite_dir = os.path.splitext(suite_base)[0]
            outputdir.append(suite_dir)
            for test in child_suite.testcase_table.tests:
                test_dir = normalize(test.name)
                outputdir.append(test_dir)
                suite.addTest(RobotTestCase(path, name=test.name,
                                            tags=test.tags.value,
                                            variables=variables,
                                            source=child_suite.source,
                                            outputdir='/'.join(outputdir),
                                            **kw))
                outputdir.pop()
            for grandchild in getattr(child_suite, 'children', []):
                recurs(grandchild)
            outputdir.pop()

        recurs(robot_suite)

    return suite
