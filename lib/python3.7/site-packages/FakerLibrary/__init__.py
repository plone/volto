from __future__ import absolute_import

import pkg_resources
from .keywords import FakerKeywords


__version__ = pkg_resources.get_distribution("robotframework-faker").version


class FakerLibrary(FakerKeywords):
    """

    """
    ROBOT_LIBRARY_SCOPE = 'GLOBAL'
