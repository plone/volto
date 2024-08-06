# -*- coding: utf-8 -*-
__filename = '/opt/buildoutcache/egg-cache/Products.CMFPlone-5.2.2-py3.7.egg/Products/CMFPlone/browser/templates/plone-frontpage.pt'

__tokens = {}

from sys import exc_info as _exc_info

_static_4578920848 = {'href': 'https://plone.org/sponsors/be-a-hero', 'target': '_blank', }
_static_4606267536 = {'class': 'link-plain', 'href': 'https://www.python.org', 'target': '_blank', }
_static_4567494864 = {'class': 'link-plain', 'href': 'https://plone.org', 'target': '_blank', }
_static_4628884624 = {'class': 'link-plain', 'href': 'https://plone.com', 'target': '_blank', }
_static_4628663120 = {'class': 'link-plain', 'href': 'https://plone.com/success-stories/', 'target': '_blank', }
_static_4571478096 = {'class': 'link-plain', 'href': 'https://plone.com/providers/', 'target': '_blank', }
_static_4628913232 = {'href': '@@overview-controlpanel', 'target': '_blank', }
_static_4628914640 = {'href': '@@markup-controlpanel', 'target': '_blank', }
_static_4571604240 = {'class': 'discreet', }
_static_4628808528 = {'class': 'discreet', }
_static_4628644112 = {'href': '@@content-controlpanel', 'target': '_blank', }
_static_4628894928 = {'class': 'discreet', }
_static_4628878096 = {'class': 'link-plain', 'href': 'https://plone.org/download/add-ons', 'target': '_blank', }
_static_4628957072 = {'href': '@@theming-controlpanel', 'target': '_blank', }
_static_4629034512 = {'class': 'link-plain', 'href': 'https://plone.com/success-stories/', 'target': '_blank', }
_static_4629076880 = {'class': 'link-plain', 'href': 'https://plone.org/support', 'target': '_blank', }
_static_4629114832 = {'class': 'link-plain', 'href': 'https://plone.org/download/add-ons', 'target': '_blank', }
_static_4629177424 = {'class': 'link-plain', 'href': 'https://training.plone.org', 'target': '_blank', }
_static_4629207120 = {'class': 'link-plain', 'href': 'https://docs.plone.org', 'target': '_blank', }
_static_4629245264 = {'class': 'link-plain', 'href': 'https://plone.com/features/', 'target': '_blank', }
_static_4629321744 = {'class': 'discreet', }
_static_4629347728 = {'href': '@@security-controlpanel', 'target': '_blank', }
_static_4629383120 = {'class': 'discreet', }
_static_4629407760 = {'href': '@@mail-controlpanel', 'target': '_blank', }
_static_4629420880 = {'class': 'discreet', }
_static_4629462736 = {'class': 'discreet', }
_static_4629499536 = {'class': 'context', 'href': 'https://plone.com', 'target': '_blank', }
_static_4629460304 = {'class': 'hero', }
_static_4564887568 = {}
_static_4629513680 = {'xmlns': 'http://www.w3.org/1999/xhtml', 'xml:lang': 'en', 'lang': 'en', }

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

            # <Static value=<_ast.Dict object at 0x113f0c5d0> name=None at 113f0c590> -> __attrs_4632075216
            __attrs_4632075216 = _static_4629513680
            __previous_i18n_domain_4629482576 = __i18n_domain
            __i18n_domain = 'plonefrontpage'

            # <html ... (0:0)
            # --------------------------------------------------------
            __append('<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">\n\n')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4629480784
            __attrs_4629480784 = _static_4564887568

            # <head ... (0:0)
            # --------------------------------------------------------
            __append('<head></head>\n\n')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4629479632
            __attrs_4629479632 = _static_4564887568

            # <body ... (0:0)
            # --------------------------------------------------------
            __append('<body>')
            __stream_4629480464 = []
            __append_4629480464 = __stream_4629480464.append
            __append_4629480464('\n\n  ')

            # <Static value=<_ast.Dict object at 0x113eff550> name=None at 113eff650> -> __attrs_4629459024
            __attrs_4629459024 = _static_4629460304

            # <div ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<div class="hero">\n    ')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4629462416
            __attrs_4629462416 = _static_4564887568

            # <h1 ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<h1>Welcome!</h1>\n    ')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4631680528
            __attrs_4631680528 = _static_4564887568

            # <p ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<p>')

            # <Static value=<_ast.Dict object at 0x113f08e90> name=None at 113f08f10> -> __attrs_4629497232
            __attrs_4629497232 = _static_4629499536

            # <a ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<a class="context" href="https://plone.com" target="_blank">Learn more about Plone</a></p>\n  </div>\n\n  ')

            # <Static value=<_ast.Dict object at 0x113effed0> name=None at 113effa50> -> __attrs_4629496272
            __attrs_4629496272 = _static_4629462736

            # <p ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<p class="discreet">\nIf you\'re seeing this instead of the web site you were expecting, the owner of\nthis web site has just installed Plone. Do not contact the Plone Team or the\nPlone support channels about this.\n</p>\n\n')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4629642896
            __attrs_4629642896 = _static_4564887568

            # <h2 ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<h2>Get started</h2>\n\n')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4629641424
            __attrs_4629641424 = _static_4564887568

            # <p ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<p>\nBefore you start exploring your newly created Plone site, please do the following:\n</p>\n\n')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4629640272
            __attrs_4629640272 = _static_4564887568

            # <ol ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<ol>\n    ')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4629640976
            __attrs_4629640976 = _static_4564887568

            # <li ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<li>Make sure you are logged in as an admin/manager user.\n        ')

            # <Static value=<_ast.Dict object at 0x113ef5b50> name=None at 113ef5cd0> -> __attrs_4629419728
            __attrs_4629419728 = _static_4629420880

            # <span ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<span class="discreet">(You should have a Site Setup entry in the user menu)</span></li>\n    ')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4629407888
            __attrs_4629407888 = _static_4564887568

            # <li ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<li>')

            # <Static value=<_ast.Dict object at 0x113ef2810> name=None at 113ef2ad0> -> __attrs_4629384464
            __attrs_4629384464 = _static_4629407760

            # <a ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<a href="@@mail-controlpanel" target="_blank">Set up your mail server</a>. ')

            # <Static value=<_ast.Dict object at 0x113eec7d0> name=None at 113eec910> -> __attrs_4629367952
            __attrs_4629367952 = _static_4629383120

            # <span ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<span class="discreet">(Plone needs a valid SMTP server to verify users and send out password reminders)</span></li>\n    ')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4629366416
            __attrs_4629366416 = _static_4564887568

            # <li ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<li>')

            # <Static value=<_ast.Dict object at 0x113ee3d90> name=None at 113ee3fd0> -> __attrs_4629323472
            __attrs_4629323472 = _static_4629347728

            # <a ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<a href="@@security-controlpanel" target="_blank">Decide what security level you want on your site</a>. ')

            # <Static value=<_ast.Dict object at 0x113edd810> name=None at 113edd990> -> __attrs_4629302480
            __attrs_4629302480 = _static_4629321744

            # <span ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<span class="discreet">(Allow self registration, password policies, etc)</span></li>\n</ol>\n\n')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4629301584
            __attrs_4629301584 = _static_4564887568

            # <h2 ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<h2>Get comfortable</h2>\n\n')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4629290896
            __attrs_4629290896 = _static_4564887568

            # <p ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<p>After that, we suggest you do one or more of the following:</p>\n\n')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4629288272
            __attrs_4629288272 = _static_4564887568

            # <ul ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<ul>\n    ')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4629264592
            __attrs_4629264592 = _static_4564887568

            # <li ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<li>Find out ')

            # <Static value=<_ast.Dict object at 0x113ecad50> name=None at 113ecae10> -> __attrs_4629232208
            __attrs_4629232208 = _static_4629245264

            # <a ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<a class="link-plain" href="https://plone.com/features/" target="_blank">What\'s new in Plone</a>.</li>\n    ')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4629230544
            __attrs_4629230544 = _static_4564887568

            # <li ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<li>Read the ')

            # <Static value=<_ast.Dict object at 0x113ec1850> name=None at 113ec1910> -> __attrs_4629186256
            __attrs_4629186256 = _static_4629207120

            # <a ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<a class="link-plain" href="https://docs.plone.org" target="_blank">documentation</a>.</li>\n    ')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4629184656
            __attrs_4629184656 = _static_4564887568

            # <li ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<li>Follow a ')

            # <Static value=<_ast.Dict object at 0x113eba450> name=None at 113eba510> -> __attrs_4629147856
            __attrs_4629147856 = _static_4629177424

            # <a ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<a class="link-plain" href="https://training.plone.org" target="_blank">training</a>.</li>\n    ')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4629130000
            __attrs_4629130000 = _static_4564887568

            # <li ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<li>Explore the ')

            # <Static value=<_ast.Dict object at 0x113eaafd0> name=None at 113eae0d0> -> __attrs_4629097680
            __attrs_4629097680 = _static_4629114832

            # <a ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<a class="link-plain" href="https://plone.org/download/add-ons" target="_blank">available add-ons</a> for Plone.</li>\n    ')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4629096208
            __attrs_4629096208 = _static_4564887568

            # <li ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<li>Read and/or subscribe to the ')

            # <Static value=<_ast.Dict object at 0x113ea1b90> name=None at 113ea1c50> -> __attrs_4629055568
            __attrs_4629055568 = _static_4629076880

            # <a ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<a class="link-plain" href="https://plone.org/support" target="_blank">support channels</a>.</li>\n    ')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4629053776
            __attrs_4629053776 = _static_4564887568

            # <li ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<li>Find out ')

            # <Static value=<_ast.Dict object at 0x113e97610> name=None at 113e976d0> -> __attrs_4629013328
            __attrs_4629013328 = _static_4629034512

            # <a ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<a class="link-plain" href="https://plone.com/success-stories/" target="_blank">how others are using Plone</a>.</li>\n</ul>\n\n')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4628991952
            __attrs_4628991952 = _static_4564887568

            # <h2 ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<h2>Make it your own</h2>\n\n')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4628989648
            __attrs_4628989648 = _static_4564887568

            # <p ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<p>Plone has a lot of different settings that can be used to make it do what you want it to. Some examples:</p>\n\n')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4628974928
            __attrs_4628974928 = _static_4564887568

            # <ul ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<ul>\n    ')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4628971920
            __attrs_4628971920 = _static_4564887568

            # <li ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<li>\n    Try out a different theme, either pick from\n    ')

            # <Static value=<_ast.Dict object at 0x113e84790> name=None at 113e849d0> -> __attrs_4628936656
            __attrs_4628936656 = _static_4628957072

            # <a ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<a href="@@theming-controlpanel" target="_blank">the included ones</a>, or one of the\n    ')

            # <Static value=<_ast.Dict object at 0x113e71310> name=None at 113e7f350> -> __attrs_4628896656
            __attrs_4628896656 = _static_4628878096

            # <a ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<a class="link-plain" href="https://plone.org/download/add-ons" target="_blank">available themes\n       from plone.org</a>. ')

            # <Static value=<_ast.Dict object at 0x113e754d0> name=None at 113e75650> -> __attrs_4628647376
            __attrs_4628647376 = _static_4628894928

            # <span ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<span class="discreet">(Make sure the theme is\n       compatible with the version of Plone you are currently using)</span>\n    </li>\n\n    ')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4628646032
            __attrs_4628646032 = _static_4564887568

            # <li ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<li>\n    ')

            # <Static value=<_ast.Dict object at 0x113e38110> name=None at 113e38690> -> __attrs_4628808400
            __attrs_4628808400 = _static_4628644112

            # <a ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<a href="@@content-controlpanel" target="_blank">\n    Decide what kind of workflow you want in your site.</a>\n    ')

            # <Static value=<_ast.Dict object at 0x113e60350> name=None at 113e60190> -> __attrs_4628768208
            __attrs_4628768208 = _static_4628808528

            # <span ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<span class="discreet">(The default is typical for a\n    public web site; if you want to use Plone as a closed intranet or extranet,\n    you can choose a different workflow.)</span>\n    </li>\n\n    ')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4628697680
            __attrs_4628697680 = _static_4564887568

            # <li ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<li>\n    By default, Plone uses a visual editor for content.\n    ')

            # <Static value=<_ast.Dict object at 0x1107d2510> name=None at 1107d28d0> -> __attrs_4571604816
            __attrs_4571604816 = _static_4571604240

            # <span ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<span class="discreet">(If you prefer text-based syntax and/or wiki\n        syntax, you can change this in the\n    ')

            # <Static value=<_ast.Dict object at 0x113e7a1d0> name=None at 1107d2b90> -> __attrs_4628918160
            __attrs_4628918160 = _static_4628914640

            # <a ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<a href="@@markup-controlpanel" target="_blank">markup control panel</a>)</span>\n    </li>\n\n    ')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4628911760
            __attrs_4628911760 = _static_4564887568

            # <li ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<li>…and many more settings are available in the\n        ')

            # <Static value=<_ast.Dict object at 0x113e79c50> name=None at 113e79dd0> -> __attrs_4576549328
            __attrs_4576549328 = _static_4628913232

            # <a ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<a href="@@overview-controlpanel" target="_blank">Site Setup</a>.\n    </li>\n\n</ul>\n\n')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4576550224
            __attrs_4576550224 = _static_4564887568

            # <h2 ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<h2>Tell us how you use it</h2>\n\n')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4628667408
            __attrs_4628667408 = _static_4564887568

            # <p ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<p>\nAre you doing something interesting with Plone? Big site deployments,\ninteresting use cases? Do you have a company that delivers Plone-based\nsolutions?\n</p>\n\n')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4628664592
            __attrs_4628664592 = _static_4564887568

            # <ul ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<ul>\n    ')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4571478160
            __attrs_4571478160 = _static_4564887568

            # <li ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<li>Add your company as a ')

            # <Static value=<_ast.Dict object at 0x1107b3850> name=None at 1107b3cd0> -> __attrs_4628865104
            __attrs_4628865104 = _static_4571478096

            # <a ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<a class="link-plain" href="https://plone.com/providers/" target="_blank">Plone provider</a>.</li>\n    ')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4628660816
            __attrs_4628660816 = _static_4564887568

            # <li ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<li>Add a ')

            # <Static value=<_ast.Dict object at 0x113e3cb50> name=None at 113e3ced0> -> __attrs_4628410320
            __attrs_4628410320 = _static_4628663120

            # <a ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<a class="link-plain" href="https://plone.com/success-stories/" target="_blank">success story</a> describing your\n        deployed project and customer.</li>\n</ul>\n\n')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4628669456
            __attrs_4628669456 = _static_4564887568

            # <h2 ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<h2>Find out more about Plone</h2>\n\n')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4628671760
            __attrs_4628671760 = _static_4564887568

            # <p ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<p>\nPlone is a powerful content management system built on a rock-solid application stack written using the Python programming\nlanguage. More about these technologies:\n</p>\n\n')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4628858448
            __attrs_4628858448 = _static_4564887568

            # <ul ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<ul>\n')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4628884944
            __attrs_4628884944 = _static_4564887568

            # <li ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<li>The ')

            # <Static value=<_ast.Dict object at 0x113e72c90> name=None at 113e72ed0> -> __attrs_4567498384
            __attrs_4567498384 = _static_4628884624

            # <a ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<a class="link-plain" href="https://plone.com" target="_blank">Plone open source\n    Content Management System</a> web site for evaluators and decision makers.</li>\n')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4567496336
            __attrs_4567496336 = _static_4564887568

            # <li ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<li>The ')

            # <Static value=<_ast.Dict object at 0x1103e70d0> name=None at 1103e7050> -> __attrs_4606299216
            __attrs_4606299216 = _static_4567494864

            # <a ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<a class="link-plain" href="https://plone.org" target="_blank">Plone community\n    </a> web site for developers.</li>\n')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4606298448
            __attrs_4606298448 = _static_4564887568

            # <li ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<li>The ')

            # <Static value=<_ast.Dict object at 0x1128e1090> name=None at 1128e12d0> -> __attrs_4606257424
            __attrs_4606257424 = _static_4606267536

            # <a ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<a class="link-plain" href="https://www.python.org" target="_blank">Python\n    programming language</a> web site.</li>\n</ul>\n\n')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4606256592
            __attrs_4606256592 = _static_4564887568

            # <h2 ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<h2>Support the Plone Foundation</h2>\n\n')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4606258704
            __attrs_4606258704 = _static_4564887568

            # <p ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<p>\nPlone is made possible only through the efforts of thousands of dedicated\nindividuals and hundreds of companies. The Plone Foundation:\n</p>\n')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4606280464
            __attrs_4606280464 = _static_4564887568

            # <ul ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<ul>\n    ')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4606281552
            __attrs_4606281552 = _static_4564887568

            # <li ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<li>…protects and promotes Plone.</li>\n    ')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4567244240
            __attrs_4567244240 = _static_4564887568

            # <li ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<li>…is a registered 501(c)(3) charitable organization.</li>\n    ')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4567243280
            __attrs_4567243280 = _static_4564887568

            # <li ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<li>…donations are tax-deductible.</li>\n    ')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4578922448
            __attrs_4578922448 = _static_4564887568

            # <li ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<li>')

            # <Static value=<_ast.Dict object at 0x110ecc990> name=None at 110ecc710> -> __attrs_4568971472
            __attrs_4568971472 = _static_4578920848

            # <a ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<a href="https://plone.org/sponsors/be-a-hero" target="_blank">Support the Foundation and help make Plone better!</a></li>\n</ul>\n\n')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4568971152
            __attrs_4568971152 = _static_4564887568

            # <p ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<p>Thanks for using our product; we hope you like it!</p>\n\n')

            # <Static value=<_ast.Dict object at 0x11016a810> name=None at 11016ab50> -> __attrs_4568969744
            __attrs_4568969744 = _static_4564887568

            # <p ... (0:0)
            # --------------------------------------------------------
            __append_4629480464('<p>—The Plone Team</p>\n')
            __msgid_4629480464 = __re_whitespace(''.join(__stream_4629480464)).strip()
            if 'front-text':
                __append(translate('front-text', mapping=None, default=__msgid_4629480464, domain=__i18n_domain, context=__i18n_context, target_language=getitem('target_language')))
            __append('</body>\n</html>')
            __i18n_domain = __previous_i18n_domain_4629482576
            __append('\n')
        except:
            if (__token is not None):
                rcontext.setdefault('__error__', []).append((__tokens[__token] + (__filename, _exc_info()[1], )))
            raise

    return {'render': render, }