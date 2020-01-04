#!/bin/sh

set -x

git fetch --all
git pull
git merge origin/export_components
git merge origin/wysiwyg_desc_styling
git merge origin/disable_submit
git merge tiberiuichim/sync_update
git merge origin/fix_querystring_ssr_edit
git merge origin/fix_querystring_missing_value
git merge origin/fix_querystring_child_warning
git merge origin/missing_key_in_addlinkform
git merge origin/master
