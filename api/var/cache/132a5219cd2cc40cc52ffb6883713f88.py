# -*- coding: utf-8 -*-
__filename = 'login_form'

__tokens = {166: ('string:${here/absolute_url}/login', 11, 33), 291: ('request/came_from | string:', 14, 35)}

from Products.PageTemplates.engine import _compile_zt_expr as __compile_zt_expr
from Products.PageTemplates.engine import _C2ZContextWrapper as __C2ZContextWrapper
from sys import exc_info as _exc_info
from chameleon.tales import DEFAULT_MARKER as _DEFAULT_MARKER

_static_4552403024 = {'type': 'submit', 'value': ' Log In ', }
_static_4552418256 = {'colspan': '2', }
_static_4552420688 = {'type': 'password', 'name': '__ac_password', 'size': '30', }
_static_4568764752 = {'type': 'text', 'name': '__ac_name', 'size': '30', }
_static_4576516112 = {'cellpadding': '2', }
_static_4576518032 = {'type': 'hidden', 'name': 'came_from', 'value': '', }
_static_4565018192 = __C2ZContextWrapper
_static_4565018576 = __compile_zt_expr
_static_4567456144 = {'method': 'post', 'action': '', }
_static_4564887568 = {}

import re
import functools
from itertools import chain as __chain
from sys import intern
__default = intern('__default__')
__marker = object()
g_re_amp = re.compile('&(?!([A-Za-z]+|#[0-9]+);)')
g_re_needs_escape = re.compile('[&<>\\"\\\']').search
__re_whitespace = functools.partial(re.compile('\\s+').sub, ' ')

def initialize(modules, nothing, tales, zope_version_4_5_1_):

    def render(__stream, econtext, rcontext, __i18n_domain=None, __i18n_context=None):
        __append = __stream.append
        __re_amp = g_re_amp
        __token = None
        __re_needs_escape = g_re_needs_escape

        def __convert(target):
            if (target is None):
                return
            __tt = type(target)
            if ((__tt is int) or (__tt is float) or (__tt is int)):
                target = str(target)
            else:
                if (__tt is bytes):
                    target = decode(target)
                else:
                    if (__tt is not str):
                        try:
                            target = target.__html__
                        except AttributeError:
                            __converted = convert(target)
                            target = (str(target) if (target is __converted) else __converted)
                        else:
                            target = target()
            return target

        def __quote(target, quote, quote_entity, default, default_marker):
            if (target is None):
                return
            if (target is default_marker):
                return default
            __tt = type(target)
            if ((__tt is int) or (__tt is float) or (__tt is int)):
                target = str(target)
            else:
                if (__tt is bytes):
                    target = decode(target)
                else:
                    if (__tt is not str):
                        try:
                            target = target.__html__
                        except:
                            __converted = convert(target)
                            target = (str(target) if (target is __converted) else __converted)
                        else:
                            return target()
                if (target is not None):
                    try:
                        escape = (__re_needs_escape(target) is not None)
                    except TypeError:
                        pass
                    else:
                        if escape:
                            if ('&' in target):
                                target = target.replace('&', '&amp;')
                            if ('<' in target):
                                target = target.replace('<', '&lt;')
                            if ('>' in target):
                                target = target.replace('>', '&gt;')
                            if ((quote is not None) and (quote in target)):
                                target = target.replace(quote, quote_entity)
            return target
        translate = econtext['__translate']
        decode = econtext['__decode']
        convert = econtext['__convert']
        on_error_handler = econtext['__on_error_handler']
        try:
            getitem = econtext.__getitem__
            get = econtext.get

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4567497872
            __attrs_4567497872 = _static_4564887568

            # <html ... (0:0)
            # --------------------------------------------------------
            __append('<html>\n  ')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4567275088
            __attrs_4567275088 = _static_4564887568

            # <head ... (0:0)
            # --------------------------------------------------------
            __append('<head>\n    ')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4567274384
            __attrs_4567274384 = _static_4564887568

            # <title ... (0:0)
            # --------------------------------------------------------
            __append('<title> Login Form </title>\n  </head>\n\n  ')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4567457168
            __attrs_4567457168 = _static_4564887568

            # <body ... (0:0)
            # --------------------------------------------------------
            __append('<body>\n\n    ')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4567456592
            __attrs_4567456592 = _static_4564887568

            # <h3 ... (0:0)
            # --------------------------------------------------------
            __append('<h3> Please log in </h3>\n\n    ')

            # <Static value=<_ast.Dict object at 0x1103dd990> name=None at 1103ddad0> -> __attrs_4567455120
            __attrs_4567455120 = _static_4567456144

            # <form ... (0:0)
            # --------------------------------------------------------
            __append('<form method="post"')

            # <Symbol value=<DEFAULT> at 1100af290> -> __default_4567455312
            __default_4567455312 = _DEFAULT_MARKER

            # <Substitution 'string:${here/absolute_url}/login' (11:33)> -> __attr_action
            __token = 166
            try:
                __zt_tmp = __attrs_4567455120
            except get('NameError', NameError):
                __zt_tmp = None

            __attr_action = _static_4565018576('string', '${here/absolute_url}/login', econtext=econtext)(_static_4565018192(econtext, __zt_tmp))
            __attr_action = __quote(__attr_action, '"', '&quot;', '', _DEFAULT_MARKER)
            if (__attr_action is not None):
                __append((' action="%s"' % __attr_action))
            __append('>\n\n      ')

            # <Static value=<_ast.Dict object at 0x110c81f90> name=None at 1103dd0d0> -> __attrs_4576516432
            __attrs_4576516432 = _static_4576518032

            # <input ... (0:0)
            # --------------------------------------------------------
            __append('<input type="hidden" name="came_from"')

            # <Symbol value=<DEFAULT> at 1100af290> -> __default_4576517264
            __default_4576517264 = _DEFAULT_MARKER

            # <Substitution 'request/came_from | string:' (14:35)> -> __attr_value
            __token = 291
            try:
                __zt_tmp = __attrs_4576516432
            except get('NameError', NameError):
                __zt_tmp = None

            __attr_value = _static_4565018576('path', 'request/came_from | string:', econtext=econtext)(_static_4565018192(econtext, __zt_tmp))
            __attr_value = __quote(__attr_value, '"', '&quot;', '', _DEFAULT_MARKER)
            if (__attr_value is not None):
                __append((' value="%s"' % __attr_value))
            __append('/>\n      ')

            # <Static value=<_ast.Dict object at 0x110c81810> name=None at 110c81910> -> __attrs_4576515472
            __attrs_4576515472 = _static_4576516112

            # <table ... (0:0)
            # --------------------------------------------------------
            __append('<table cellpadding="2">\n        ')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4618117392
            __attrs_4618117392 = _static_4564887568

            # <tr ... (0:0)
            # --------------------------------------------------------
            __append('<tr>\n          ')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4568728912
            __attrs_4568728912 = _static_4564887568

            # <td ... (0:0)
            # --------------------------------------------------------
            __append('<td>')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4568729936
            __attrs_4568729936 = _static_4564887568

            # <b ... (0:0)
            # --------------------------------------------------------
            __append('<b>Login:</b> </td>\n          ')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4568731600
            __attrs_4568731600 = _static_4564887568

            # <td ... (0:0)
            # --------------------------------------------------------
            __append('<td>')

            # <Static value=<_ast.Dict object at 0x11051d150> name=None at 11051d0d0> -> __attrs_4568765648
            __attrs_4568765648 = _static_4568764752

            # <input ... (0:0)
            # --------------------------------------------------------
            __append('<input type="text" name="__ac_name" size="30" /></td>\n        </tr>\n        ')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4568765904
            __attrs_4568765904 = _static_4564887568

            # <tr ... (0:0)
            # --------------------------------------------------------
            __append('<tr>\n          ')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4568779280
            __attrs_4568779280 = _static_4564887568

            # <td ... (0:0)
            # --------------------------------------------------------
            __append('<td>')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4568776976
            __attrs_4568776976 = _static_4564887568

            # <b ... (0:0)
            # --------------------------------------------------------
            __append('<b>Password:</b></td>\n          ')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4552420816
            __attrs_4552420816 = _static_4564887568

            # <td ... (0:0)
            # --------------------------------------------------------
            __append('<td>')

            # <Static value=<_ast.Dict object at 0x10f586d50> name=None at 10f586ad0> -> __attrs_4552418640
            __attrs_4552418640 = _static_4552420688

            # <input ... (0:0)
            # --------------------------------------------------------
            __append('<input type="password" name="__ac_password" size="30" /></td>\n        </tr>\n        ')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4552418576
            __attrs_4552418576 = _static_4564887568

            # <tr ... (0:0)
            # --------------------------------------------------------
            __append('<tr>\n          ')

            # <Static value=<_ast.Dict object at 0x10f5863d0> name=None at 10f5860d0> -> __attrs_4552404944
            __attrs_4552404944 = _static_4552418256

            # <td ... (0:0)
            # --------------------------------------------------------
            __append('<td colspan="2">\n            ')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4552403152
            __attrs_4552403152 = _static_4564887568

            # <br ... (0:0)
            # --------------------------------------------------------
            __append('<br />\n            ')

            # <Static value=<_ast.Dict object at 0x10f582850> name=None at 10f5827d0> -> __attrs_4567293456
            __attrs_4567293456 = _static_4552403024

            # <input ... (0:0)
            # --------------------------------------------------------
            __append('<input type="submit" value=" Log In " />\n          </td>\n        </tr>\n      </table>\n\n    </form>\n\n  </body>\n\n</html>')
        except:
            if (__token is not None):
                rcontext.setdefault('__error__', []).append((__tokens[__token] + (__filename, _exc_info()[1], )))
            raise

    return {'render': render, }