# -*- coding: utf-8 -*-
__filename = '/opt/buildoutcache/egg-cache/Products.CMFPlone-5.2.4-py3.7.egg/Products/CMFPlone/browser/templates/plone-frontpage.pt'

__tokens = {}

from sys import exc_info as _exc_info

_static_4667703120 = {'href': 'https://plone.org/sponsors/be-a-hero', 'target': '_blank', }
_static_4654696272 = {'class': 'link-plain', 'href': 'https://www.python.org', 'target': '_blank', }
_static_4643647184 = {'class': 'link-plain', 'href': 'https://plone.org', 'target': '_blank', }
_static_4597969168 = {'class': 'link-plain', 'href': 'https://plone.com', 'target': '_blank', }
_static_4591935888 = {'class': 'link-plain', 'href': 'https://plone.com/success-stories/', 'target': '_blank', }
_static_4653153616 = {'class': 'link-plain', 'href': 'https://plone.com/providers/', 'target': '_blank', }
_static_4616870544 = {'href': '@@overview-controlpanel', 'target': '_blank', }
_static_4662040016 = {'href': '@@markup-controlpanel', 'target': '_blank', }
_static_4662198544 = {'class': 'discreet', }
_static_4662201360 = {'class': 'discreet', }
_static_4662245648 = {'href': '@@content-controlpanel', 'target': '_blank', }
_static_4610483664 = {'class': 'discreet', }
_static_4654181776 = {'class': 'link-plain', 'href': 'https://plone.org/download/add-ons', 'target': '_blank', }
_static_4596334864 = {'href': '@@theming-controlpanel', 'target': '_blank', }
_static_4613773200 = {'class': 'link-plain', 'href': 'https://plone.com/success-stories/', 'target': '_blank', }
_static_4613656912 = {'class': 'link-plain', 'href': 'https://plone.org/support', 'target': '_blank', }
_static_4664533776 = {'class': 'link-plain', 'href': 'https://plone.org/download/add-ons', 'target': '_blank', }
_static_4613269456 = {'class': 'link-plain', 'href': 'https://training.plone.org', 'target': '_blank', }
_static_4664579600 = {'class': 'link-plain', 'href': 'https://docs.plone.org', 'target': '_blank', }
_static_4598979344 = {'class': 'link-plain', 'href': 'https://plone.com/features/', 'target': '_blank', }
_static_4664532304 = {'class': 'discreet', }
_static_4613577104 = {'href': '@@security-controlpanel', 'target': '_blank', }
_static_4666120144 = {'class': 'discreet', }
_static_4608500112 = {'href': '@@mail-controlpanel', 'target': '_blank', }
_static_4613754640 = {'class': 'discreet', }
_static_4666287120 = {'class': 'discreet', }
_static_4666361104 = {'class': 'context', 'href': 'https://plone.com', 'target': '_blank', }
_static_4666287312 = {'class': 'hero', }
_static_4601924944 = {}
_static_4666439824 = {'xmlns': 'http://www.w3.org/1999/xhtml', 'xml:lang': 'en', 'lang': 'en', }

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

            # <Static value=<_ast.Dict object at 0x116243890> name=None at 116243950> -> __attrs_4666429264
            __attrs_4666429264 = _static_4666439824
            __previous_i18n_domain_4666426960 = __i18n_domain
            __i18n_domain = 'plonefrontpage'

            # <html ... (0:0)
            # --------------------------------------------------------
            __append('<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">\n\n')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4666401232
            __attrs_4666401232 = _static_4601924944

            # <head ... (0:0)
            # --------------------------------------------------------
            __append('<head></head>\n\n')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4666403216
            __attrs_4666403216 = _static_4601924944

            # <body ... (0:0)
            # --------------------------------------------------------
            __append('<body>')
            __stream_4666404112 = []
            __append_4666404112 = __stream_4666404112.append
            __append_4666404112('\n\n  ')

            # <Static value=<_ast.Dict object at 0x11621e4d0> name=None at 11621e650> -> __attrs_4666372496
            __attrs_4666372496 = _static_4666287312

            # <div ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<div class="hero">\n    ')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4666366032
            __attrs_4666366032 = _static_4601924944

            # <h1 ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<h1>Welcome!</h1>\n    ')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4666364816
            __attrs_4666364816 = _static_4601924944

            # <p ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<p>')

            # <Static value=<_ast.Dict object at 0x116230510> name=None at 116230910> -> __attrs_4666143248
            __attrs_4666143248 = _static_4666361104

            # <a ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<a class="context" href="https://plone.com" target="_blank">Learn more about Plone</a></p>\n  </div>\n\n  ')

            # <Static value=<_ast.Dict object at 0x11621e410> name=None at 11621edd0> -> __attrs_4666377808
            __attrs_4666377808 = _static_4666287120

            # <p ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<p class="discreet">\nIf you\'re seeing this instead of the web site you were expecting, the owner of\nthis web site has just installed Plone. Do not contact the Plone Team or the\nPlone support channels about this.\n</p>\n\n')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4613595344
            __attrs_4613595344 = _static_4601924944

            # <h2 ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<h2>Get started</h2>\n\n')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4665374480
            __attrs_4665374480 = _static_4601924944

            # <p ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<p>\nBefore you start exploring your newly created Plone site, please do the following:\n</p>\n\n')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4665372944
            __attrs_4665372944 = _static_4601924944

            # <ol ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<ol>\n    ')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4613753744
            __attrs_4613753744 = _static_4601924944

            # <li ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<li>Make sure you are logged in as an admin/manager user.\n        ')

            # <Static value=<_ast.Dict object at 0x113004f10> name=None at 113004e10> -> __attrs_4613753424
            __attrs_4613753424 = _static_4613754640

            # <span ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<span class="discreet">(You should have a Site Setup entry in the user menu)</span></li>\n    ')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4654584848
            __attrs_4654584848 = _static_4601924944

            # <li ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<li>')

            # <Static value=<_ast.Dict object at 0x112b02190> name=None at 112b02c10> -> __attrs_4608503632
            __attrs_4608503632 = _static_4608500112

            # <a ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<a href="@@mail-controlpanel" target="_blank">Set up your mail server</a>. ')

            # <Static value=<_ast.Dict object at 0x1161f57d0> name=None at 1161f5850> -> __attrs_4613727440
            __attrs_4613727440 = _static_4666120144

            # <span ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<span class="discreet">(Plone needs a valid SMTP server to verify users and send out password reminders)</span></li>\n    ')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4613729168
            __attrs_4613729168 = _static_4601924944

            # <li ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<li>')

            # <Static value=<_ast.Dict object at 0x112fd9990> name=None at 112fd99d0> -> __attrs_4613578384
            __attrs_4613578384 = _static_4613577104

            # <a ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<a href="@@security-controlpanel" target="_blank">Decide what security level you want on your site</a>. ')

            # <Static value=<_ast.Dict object at 0x116071d50> name=None at 116071250> -> __attrs_4664532176
            __attrs_4664532176 = _static_4664532304

            # <span ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<span class="discreet">(Allow self registration, password policies, etc)</span></li>\n</ol>\n\n')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4664530384
            __attrs_4664530384 = _static_4601924944

            # <h2 ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<h2>Get comfortable</h2>\n\n')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4664531856
            __attrs_4664531856 = _static_4601924944

            # <p ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<p>After that, we suggest you do one or more of the following:</p>\n\n')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4613638608
            __attrs_4613638608 = _static_4601924944

            # <ul ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<ul>\n    ')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4613636496
            __attrs_4613636496 = _static_4601924944

            # <li ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<li>Find out ')

            # <Static value=<_ast.Dict object at 0x1121edb10> name=None at 1121edfd0> -> __attrs_4598978960
            __attrs_4598978960 = _static_4598979344

            # <a ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<a class="link-plain" href="https://plone.com/features/" target="_blank">What\'s new in Plone</a>.</li>\n    ')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4598978064
            __attrs_4598978064 = _static_4601924944

            # <li ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<li>Read the ')

            # <Static value=<_ast.Dict object at 0x11607d610> name=None at 11607df10> -> __attrs_4664581712
            __attrs_4664581712 = _static_4664579600

            # <a ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<a class="link-plain" href="https://docs.plone.org" target="_blank">documentation</a>.</li>\n    ')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4664581008
            __attrs_4664581008 = _static_4601924944

            # <li ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<li>Follow a ')

            # <Static value=<_ast.Dict object at 0x112f8e7d0> name=None at 112f8eb10> -> __attrs_4664536976
            __attrs_4664536976 = _static_4613269456

            # <a ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<a class="link-plain" href="https://training.plone.org" target="_blank">training</a>.</li>\n    ')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4664537040
            __attrs_4664537040 = _static_4601924944

            # <li ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<li>Explore the ')

            # <Static value=<_ast.Dict object at 0x116072310> name=None at 116072090> -> __attrs_4613656784
            __attrs_4613656784 = _static_4664533776

            # <a ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<a class="link-plain" href="https://plone.org/download/add-ons" target="_blank">available add-ons</a> for Plone.</li>\n    ')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4613656720
            __attrs_4613656720 = _static_4601924944

            # <li ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<li>Read and/or subscribe to the ')

            # <Static value=<_ast.Dict object at 0x112fed150> name=None at 112fedf90> -> __attrs_4664573456
            __attrs_4664573456 = _static_4613656912

            # <a ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<a class="link-plain" href="https://plone.org/support" target="_blank">support channels</a>.</li>\n    ')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4613772368
            __attrs_4613772368 = _static_4601924944

            # <li ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<li>Find out ')

            # <Static value=<_ast.Dict object at 0x113009790> name=None at 113009410> -> __attrs_4664541776
            __attrs_4664541776 = _static_4613773200

            # <a ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<a class="link-plain" href="https://plone.com/success-stories/" target="_blank">how others are using Plone</a>.</li>\n</ul>\n\n')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4664542544
            __attrs_4664542544 = _static_4601924944

            # <h2 ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<h2>Make it your own</h2>\n\n')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4664542736
            __attrs_4664542736 = _static_4601924944

            # <p ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<p>Plone has a lot of different settings that can be used to make it do what you want it to. Some examples:</p>\n\n')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4664541392
            __attrs_4664541392 = _static_4601924944

            # <ul ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<ul>\n    ')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4596337360
            __attrs_4596337360 = _static_4601924944

            # <li ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<li>\n    Try out a different theme, either pick from\n    ')

            # <Static value=<_ast.Dict object at 0x111f68110> name=None at 111f68410> -> __attrs_4596337616
            __attrs_4596337616 = _static_4596334864

            # <a ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<a href="@@theming-controlpanel" target="_blank">the included ones</a>, or one of the\n    ')

            # <Static value=<_ast.Dict object at 0x115692d90> name=None at 115692dd0> -> __attrs_4610484176
            __attrs_4610484176 = _static_4654181776

            # <a ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<a class="link-plain" href="https://plone.org/download/add-ons" target="_blank">available themes\n       from plone.org</a>. ')

            # <Static value=<_ast.Dict object at 0x112ce65d0> name=None at 112ce6690> -> __attrs_4610482512
            __attrs_4610482512 = _static_4610483664

            # <span ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<span class="discreet">(Make sure the theme is\n       compatible with the version of Plone you are currently using)</span>\n    </li>\n\n    ')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4662246928
            __attrs_4662246928 = _static_4601924944

            # <li ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<li>\n    ')

            # <Static value=<_ast.Dict object at 0x115e43910> name=None at 115e43a10> -> __attrs_4662243664
            __attrs_4662243664 = _static_4662245648

            # <a ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<a href="@@content-controlpanel" target="_blank">\n    Decide what kind of workflow you want in your site.</a>\n    ')

            # <Static value=<_ast.Dict object at 0x115e38c10> name=None at 115e38d10> -> __attrs_4662200784
            __attrs_4662200784 = _static_4662201360

            # <span ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<span class="discreet">(The default is typical for a\n    public web site; if you want to use Plone as a closed intranet or extranet,\n    you can choose a different workflow.)</span>\n    </li>\n\n    ')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4662199312
            __attrs_4662199312 = _static_4601924944

            # <li ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<li>\n    By default, Plone uses a visual editor for content.\n    ')

            # <Static value=<_ast.Dict object at 0x115e38110> name=None at 115e38190> -> __attrs_4662041424
            __attrs_4662041424 = _static_4662198544

            # <span ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<span class="discreet">(If you prefer text-based syntax and/or wiki\n        syntax, you can change this in the\n    ')

            # <Static value=<_ast.Dict object at 0x115e115d0> name=None at 115e116d0> -> __attrs_4616868752
            __attrs_4616868752 = _static_4662040016

            # <a ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<a href="@@markup-controlpanel" target="_blank">markup control panel</a>)</span>\n    </li>\n\n    ')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4616869456
            __attrs_4616869456 = _static_4601924944

            # <li ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<li>…and many more settings are available in the\n        ')

            # <Static value=<_ast.Dict object at 0x1132fda90> name=None at 1132fdc50> -> __attrs_4616778000
            __attrs_4616778000 = _static_4616870544

            # <a ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<a href="@@overview-controlpanel" target="_blank">Site Setup</a>.\n    </li>\n\n</ul>\n\n')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4616778064
            __attrs_4616778064 = _static_4601924944

            # <h2 ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<h2>Tell us how you use it</h2>\n\n')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4615214032
            __attrs_4615214032 = _static_4601924944

            # <p ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<p>\nAre you doing something interesting with Plone? Big site deployments,\ninteresting use cases? Do you have a company that delivers Plone-based\nsolutions?\n</p>\n\n')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4653072208
            __attrs_4653072208 = _static_4601924944

            # <ul ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<ul>\n    ')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4643788880
            __attrs_4643788880 = _static_4601924944

            # <li ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<li>Add your company as a ')

            # <Static value=<_ast.Dict object at 0x115597d50> name=None at 115597d10> -> __attrs_4591939408
            __attrs_4591939408 = _static_4653153616

            # <a ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<a class="link-plain" href="https://plone.com/providers/" target="_blank">Plone provider</a>.</li>\n    ')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4591939536
            __attrs_4591939536 = _static_4601924944

            # <li ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<li>Add a ')

            # <Static value=<_ast.Dict object at 0x111b36190> name=None at 111b36310> -> __attrs_4599243280
            __attrs_4599243280 = _static_4591935888

            # <a ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<a class="link-plain" href="https://plone.com/success-stories/" target="_blank">success story</a> describing your\n        deployed project and customer.</li>\n</ul>\n\n')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4599242832
            __attrs_4599242832 = _static_4601924944

            # <h2 ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<h2>Find out more about Plone</h2>\n\n')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4661845264
            __attrs_4661845264 = _static_4601924944

            # <p ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<p>\nPlone is a powerful content management system built on a rock-solid application stack written using the Python programming\nlanguage. More about these technologies:\n</p>\n\n')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4661844240
            __attrs_4661844240 = _static_4601924944

            # <ul ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<ul>\n')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4661842832
            __attrs_4661842832 = _static_4601924944

            # <li ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<li>The ')

            # <Static value=<_ast.Dict object at 0x1120f7110> name=None at 115de1110> -> __attrs_4597972496
            __attrs_4597972496 = _static_4597969168

            # <a ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<a class="link-plain" href="https://plone.com" target="_blank">Plone open source\n    Content Management System</a> web site for evaluators and decision makers.</li>\n')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4597972304
            __attrs_4597972304 = _static_4601924944

            # <li ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<li>The ')

            # <Static value=<_ast.Dict object at 0x114c86ed0> name=None at 114c86810> -> __attrs_4657975696
            __attrs_4657975696 = _static_4643647184

            # <a ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<a class="link-plain" href="https://plone.org" target="_blank">Plone community\n    </a> web site for developers.</li>\n')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4654698384
            __attrs_4654698384 = _static_4601924944

            # <li ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<li>The ')

            # <Static value=<_ast.Dict object at 0x115710750> name=None at 1157108d0> -> __attrs_4667671888
            __attrs_4667671888 = _static_4654696272

            # <a ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<a class="link-plain" href="https://www.python.org" target="_blank">Python\n    programming language</a> web site.</li>\n</ul>\n\n')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4667672272
            __attrs_4667672272 = _static_4601924944

            # <h2 ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<h2>Support the Plone Foundation</h2>\n\n')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4667673104
            __attrs_4667673104 = _static_4601924944

            # <p ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<p>\nPlone is made possible only through the efforts of thousands of dedicated\nindividuals and hundreds of companies. The Plone Foundation:\n</p>\n')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4667673936
            __attrs_4667673936 = _static_4601924944

            # <ul ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<ul>\n    ')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4667699664
            __attrs_4667699664 = _static_4601924944

            # <li ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<li>…protects and promotes Plone.</li>\n    ')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4667700560
            __attrs_4667700560 = _static_4601924944

            # <li ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<li>…is a registered 501(c)(3) charitable organization.</li>\n    ')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4667701456
            __attrs_4667701456 = _static_4601924944

            # <li ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<li>…donations are tax-deductible.</li>\n    ')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4667702352
            __attrs_4667702352 = _static_4601924944

            # <li ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<li>')

            # <Static value=<_ast.Dict object at 0x116377f50> name=None at 116377e90> -> __attrs_4667692240
            __attrs_4667692240 = _static_4667703120

            # <a ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<a href="https://plone.org/sponsors/be-a-hero" target="_blank">Support the Foundation and help make Plone better!</a></li>\n</ul>\n\n')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4667692304
            __attrs_4667692304 = _static_4601924944

            # <p ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<p>Thanks for using our product; we hope you like it!</p>\n\n')

            # <Static value=<_ast.Dict object at 0x1124bcd50> name=None at 1124bcbd0> -> __attrs_4667693392
            __attrs_4667693392 = _static_4601924944

            # <p ... (0:0)
            # --------------------------------------------------------
            __append_4666404112('<p>—The Plone Team</p>\n')
            __msgid_4666404112 = __re_whitespace(''.join(__stream_4666404112)).strip()
            if 'front-text':
                __append(translate('front-text', mapping=None, default=__msgid_4666404112, domain=__i18n_domain, context=__i18n_context, target_language=getitem('target_language')))
            __append('</body>\n</html>')
            __i18n_domain = __previous_i18n_domain_4666426960
            __append('\n')
        except:
            if (__token is not None):
                rcontext.setdefault('__error__', []).append((__tokens[__token] + (__filename, _exc_info()[1], )))
            raise

    return {'render': render, }