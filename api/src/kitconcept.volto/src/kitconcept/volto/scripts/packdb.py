"""
bin/instance -O Plone run scripts/packdb.py
"""

import time


db = app._p_jar.db()  # noqa
t = time.time()
db.pack(t)
