# -*- coding: utf-8 -*-
__filename = 'login_form'

__tokens = {166: ('string:${here/absolute_url}/login', 11, 33), 291: ('request/came_from | string:', 14, 35)}

from Products.PageTemplates.engine import _compile_zt_expr as __compile_zt_expr
from Products.PageTemplates.engine import _C2ZContextWrapper as __C2ZContextWrapper
from sys import exc_info as _exc_info
from chameleon.tales import DEFAULT_MARKER as _DEFAULT_MARKER

_static_4603273488 = {'type': 'submit', 'value': ' Log In ', }
_static_4599363664 = {'colspan': '2', }
_static_4613097808 = {'type': 'password', 'name': '__ac_password', 'size': '30', }
_static_4653873232 = {'type': 'text', 'name': '__ac_name', 'size': '30', }
_static_4598946832 = {'cellpadding': '2', }
_static_4598944208 = {'type': 'hidden', 'name': 'came_from', 'value': '', }
_static_4602089616 = __C2ZContextWrapper
_static_4602089936 = __compile_zt_expr
_static_4596393808 = {'method': 'post', 'action': '', }
_static_4601924944 = {}

import re
import functools
from itertools import chain as __chain
from sys import intern
__default = intern('__default__')
__marker = object()
g_re_amp = re.compile('&(?!([A-Za-z]+|#[0-9]+);)')
g_re_needs_escape = re.compile('[&<>\\"\\\']').search
__re_whitespace = functools.partial(re.compile('\\s+').sub, ' ')

def initialize(modules, nothing, tales, zope_version_4_5_5_):

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

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4596350288
            __attrs_4596350288 = _static_4601924944

            # <html ... (0:0)
            # --------------------------------------------------------
            __append('<html>\n  ')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4613270032
            __attrs_4613270032 = _static_4601924944

            # <head ... (0:0)
            # --------------------------------------------------------
            __append('<head>\n    ')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4613269520
            __attrs_4613269520 = _static_4601924944

            # <title ... (0:0)
            # --------------------------------------------------------
            __append('<title> Login Form </title>\n  </head>\n\n  ')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4596395728
            __attrs_4596395728 = _static_4601924944

            # <body ... (0:0)
            # --------------------------------------------------------
            __append('<body>\n\n    ')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4596394192
            __attrs_4596394192 = _static_4601924944

            # <h3 ... (0:0)
            # --------------------------------------------------------
            __append('<h3> Please log in </h3>\n\n    ')

            # <Static value=<_ast.Dict object at 0x111f76750> name=None at 111f766d0> -> __attrs_4596392144
            __attrs_4596392144 = _static_4596393808

            # <form ... (0:0)
            # --------------------------------------------------------
            __append('<form method="post"')

            # <Symbol value=<DEFAULT> at 11240c050> -> __default_4596392976
            __default_4596392976 = _DEFAULT_MARKER

            # <Substitution 'string:${here/absolute_url}/login' (11:33)> -> __attr_action
            __token = 166
            try:
                __zt_tmp = __attrs_4596392144
            except get('NameError', NameError):
                __zt_tmp = None

            __attr_action = _static_4602089936('string', '${here/absolute_url}/login', econtext=econtext)(_static_4602089616(econtext, __zt_tmp))
            __attr_action = __quote(__attr_action, '"', '&quot;', '', _DEFAULT_MARKER)
            if (__attr_action is not None):
                __append((' action="%s"' % __attr_action))
            __append('>\n\n      ')

            # <Static value=<_ast.Dict object at 0x1121e51d0> name=None at 1121e55d0> -> __attrs_4598946512
            __attrs_4598946512 = _static_4598944208

            # <input ... (0:0)
            # --------------------------------------------------------
            __append('<input type="hidden" name="came_from"')

            # <Symbol value=<DEFAULT> at 11240c050> -> __default_4598946448
            __default_4598946448 = _DEFAULT_MARKER

            # <Substitution 'request/came_from | string:' (14:35)> -> __attr_value
            __token = 291
            try:
                __zt_tmp = __attrs_4598946512
            except get('NameError', NameError):
                __zt_tmp = None

            __attr_value = _static_4602089936('path', 'request/came_from | string:', econtext=econtext)(_static_4602089616(econtext, __zt_tmp))
            __attr_value = __quote(__attr_value, '"', '&quot;', '', _DEFAULT_MARKER)
            if (__attr_value is not None):
                __append((' value="%s"' % __attr_value))
            __append('/>\n      ')

            # <Static value=<_ast.Dict object at 0x1121e5c10> name=None at 1121e5b50> -> __attrs_4598947728
            __attrs_4598947728 = _static_4598946832

            # <table ... (0:0)
            # --------------------------------------------------------
            __append('<table cellpadding="2">\n        ')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4598951248
            __attrs_4598951248 = _static_4601924944

            # <tr ... (0:0)
            # --------------------------------------------------------
            __append('<tr>\n          ')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4598949968
            __attrs_4598949968 = _static_4601924944

            # <td ... (0:0)
            # --------------------------------------------------------
            __append('<td>')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4598948496
            __attrs_4598948496 = _static_4601924944

            # <b ... (0:0)
            # --------------------------------------------------------
            __append('<b>Login:</b> </td>\n          ')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4653871248
            __attrs_4653871248 = _static_4601924944

            # <td ... (0:0)
            # --------------------------------------------------------
            __append('<td>')

            # <Static value=<_ast.Dict object at 0x115647850> name=None at 115647a10> -> __attrs_4653871696
            __attrs_4653871696 = _static_4653873232

            # <input ... (0:0)
            # --------------------------------------------------------
            __append('<input type="text" name="__ac_name" size="30" /></td>\n        </tr>\n        ')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4653871824
            __attrs_4653871824 = _static_4601924944

            # <tr ... (0:0)
            # --------------------------------------------------------
            __append('<tr>\n          ')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4613098576
            __attrs_4613098576 = _static_4601924944

            # <td ... (0:0)
            # --------------------------------------------------------
            __append('<td>')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4613096272
            __attrs_4613096272 = _static_4601924944

            # <b ... (0:0)
            # --------------------------------------------------------
            __append('<b>Password:</b></td>\n          ')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4613096592
            __attrs_4613096592 = _static_4601924944

            # <td ... (0:0)
            # --------------------------------------------------------
            __append('<td>')

            # <Static value=<_ast.Dict object at 0x112f64950> name=None at 112f64810> -> __attrs_4599362000
            __attrs_4599362000 = _static_4613097808

            # <input ... (0:0)
            # --------------------------------------------------------
            __append('<input type="password" name="__ac_password" size="30" /></td>\n        </tr>\n        ')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4599362896
            __attrs_4599362896 = _static_4601924944

            # <tr ... (0:0)
            # --------------------------------------------------------
            __append('<tr>\n          ')

            # <Static value=<_ast.Dict object at 0x11224b850> name=None at 11224b450> -> __attrs_4603275856
            __attrs_4603275856 = _static_4599363664

            # <td ... (0:0)
            # --------------------------------------------------------
            __append('<td colspan="2">\n            ')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4603275152
            __attrs_4603275152 = _static_4601924944

            # <br ... (0:0)
            # --------------------------------------------------------
            __append('<br />\n            ')

            # <Static value=<_ast.Dict object at 0x112606110> name=None at 112606190> -> __attrs_4616480784
            __attrs_4616480784 = _static_4603273488

            # <input ... (0:0)
            # --------------------------------------------------------
            __append('<input type="submit" value=" Log In " />\n          </td>\n        </tr>\n      </table>\n\n    </form>\n\n  </body>\n\n</html>')
        except:
            if (__token is not None):
                rcontext.setdefault('__error__', []).append((__tokens[__token] + (__filename, _exc_info()[1], )))
            raise

    return {'render': render, }