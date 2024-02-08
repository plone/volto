from plone import api

import json
import os


__location__ = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))


def _users_info() -> dict:
    """Return users info."""
    with open(os.path.join(__location__, "users.json"), "r") as f_in:
        users = json.load(f_in)
    return users


def create_default_user():
    """Create a default user to organize content."""
    all_users = _users_info()
    user_info = all_users["portal"][0]
    groups = user_info.pop("groups")
    user = api.user.create(**user_info)
    for group_name in groups:
        api.group.add_user(groupname=group_name, user=user)
    return user


def create_accounts(accounts: list) -> list:
    """Create user accounts."""
    new_users = []
    for user_info in accounts:
        username = user_info.get("username", "")
        if api.user.get(username=username):
            # User already exists, skip it
            continue
        groups = user_info.pop("groups")
        user = api.user.create(**user_info)
        for group_name in groups:
            api.group.add_user(groupname=group_name, user=user)
        new_users.append(user)
    return new_users


def create_team_accounts():
    """Create team accounts."""
    all_users = _users_info()
    return create_accounts(all_users["team"])
