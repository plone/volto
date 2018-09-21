from .RequestsKeywords import RequestsKeywords
from .version import VERSION

_version_ = VERSION


class RequestsLibrary(RequestsKeywords):
    """ RequestsLibrary is a HTTP client keyword library that uses
    the requests module from Kenneth Reitz
    https://github.com/kennethreitz/requests


        Examples:
        | Create Session | google | http://www.google.com |
        | Create Session | github  | http://github.com/api/v2/json |
        | ${resp} | Get  google  |  / |
        | Should Be Equal As Strings |  ${resp.status_code} | 200 |
        | ${resp} | Get  github  | /user/search/bulkan |
        | Should Be Equal As Strings  |  ${resp.status_code} | 200 |
        | ${jsondata}  | To Json |  ${resp.content} |
        | Dictionary Should Contain Value | ${jsondata['users'][0]} | Bulkan Savun Evcimen |

    """
    ROBOT_LIBRARY_SCOPE = 'GLOBAL'
