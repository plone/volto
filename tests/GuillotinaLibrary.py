import os
import logging
from time import sleep
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
        for i in range(10):
            resp = s.get(base_url)
            if resp.status_code != 200:
                sleep(2)
            else:
                break

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

        resp = s.post(
            os.path.join(base_url, 'container/@addons'),
            json={
                "id": "dbusers"
            })
        if resp.status_code not in (200, 201):
            raise Exception('Warning, could not install dbusers {}: {}'.format(
                resp.status_code,
                resp.content))

        resp = s.post(
            os.path.join(base_url, 'container/users'),
            json={
                "@type": "User",
                "username": "admin",
                "email": "foo@bar.com",
                "password": "secret"
            })
        if resp.status_code not in (200, 201):
            raise Exception('Warning, could not create admin user {}: {}'.format(
                resp.status_code,
                resp.content))

        resp = s.post(
            os.path.join(base_url, 'container/@sharing'),
            json={
            "roleperm":
            [
                {
                    "setting": "AllowSingle",
                    "role": "guillotina.Anonymous",
                    "permission": "guillotina.ViewContent"
                },
                {
                    "setting": "AllowSingle",
                    "role": "guillotina.Anonymous",
                    "permission": "guillotina.AccessContent"
                }
            ],
            "prinrole":
            [
                {
                    "setting": "Allow",
                    "role": "guillotina.Manager",
                    "principal": "admin"
                },
                {
                    "setting": "Allow",
                    "role": "guillotina.Owner",
                    "principal": "admin"
                }

            ]
        })
        if resp.status_code not in (200, 201):
            raise Exception('Warning, could not publish site {}: {}'.format(
                resp.status_code,
                resp.content))

