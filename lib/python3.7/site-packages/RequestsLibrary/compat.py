import sys

PY3 = sys.version_info > (3,)

if PY3:
    import http.client as httplib
    from urllib.parse import urlencode
else:
    import httplib
    from urllib import urlencode
