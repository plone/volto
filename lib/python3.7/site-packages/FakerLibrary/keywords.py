"""

This is a very thin wrapper for faker. You can access all of faker's usual
methods via FakerLibrary calls in Robot Framework.

"""
# pylint: disable=E1120,W0613
import ast

import faker
import faker.generator
import wrapt


def _str_to_data(string):
    try:
        return ast.literal_eval(str(string).strip())
    except Exception:
        return string


@wrapt.decorator
def _str_vars_to_data(f, instance, args, kwargs):
    args = [_str_to_data(arg) for arg in args]
    kwargs = dict(
        (arg_name, _str_to_data(arg)) for arg_name, arg in kwargs.items())
    result = f(*args, **kwargs)
    return result


class FakerKeywords(object):
    """
    This looks tricky but it's just the Robot Framework Hybrid Library API.
    http://robotframework.googlecode.com/hg/doc/userguide/RobotFrameworkUserGuide.html#hybrid-library-api
    """

    ROBOT_LIBRARY_SCOPE = 'Global'
    _fake = faker.Faker()

    def __init__(self, locale=None, providers=None, seed=None):
        self._fake = faker.Faker(locale, providers)
        if seed:
            self._fake.seed(seed)

    def get_keyword_names(self):
        keywords = [name for name, function in self._fake.__dict__.items() if
                    hasattr(function, '__call__')]

        keywords.extend([name for name, function in
                         faker.generator.Generator.__dict__.items() if
                         hasattr(function, '__call__')])
        return keywords

    @_str_vars_to_data
    def seed(self, seed=None):
        self._fake.seed(seed)

    def __getattr__(self, name):
        func = None
        if name.strip().lower() == 'seed':
            return self.seed
        if name in self._fake.__dict__.keys():
            func = getattr(self._fake, name)
        elif name in faker.generator.Generator.__dict__.keys():
            func = faker.generator.Generator.__dict__[name]
        if func:
            return _str_vars_to_data(func)
        raise AttributeError('Non-existing keyword "{0}"'.format(name))
