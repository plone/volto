import os

import requests

HEADERS = {
    'Authorization': 'Basic cm9vdDpyb290',
    'Content-Type': 'application/json'
}


class GuillotinaLibrary(object):
    ROBOT_LIBRARY_SCOPE = 'Global'

    def setup_guillotina(self, base_url):
        # delete existing container if there is one
        s = requests.Session()
        s.headers.update(HEADERS)
        s.delete(
            os.path.join(base_url, 'container'))
        resp = s.post(base_url, json={
            "@type": "Container",
            "id": "container"
        })
        if resp.status_code != 200:
            raise Exception(
                'Warning, could not create container {}: {}'.format(
                    resp.status_code,
                    resp.content))
        resp = s.post(
            os.path.join(base_url, 'container/@addons'),
            json={
                "id": "cms"
            })
        if resp.status_code not in (200, 201):
            raise Exception('Warning, could not install cms {}: {}'.format(
                resp.status_code,
                resp.content))
