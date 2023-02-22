#!/bin/bash
_DIR_="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)"
set -e

NODE_MODULES_PATH="${_DIR_}/.."

cp -f "${_DIR_}/hackjs/docusaurusContext.js" \
    "${NODE_MODULES_PATH}/node_modules/@docusaurus/core/lib/client/docusaurusContext.js"
cp -f "${_DIR_}/hackjs/LocaleDropdownNavbarItem.js" \
    "${NODE_MODULES_PATH}/node_modules/@docusaurus/theme-classic/lib/theme/NavbarItem/LocaleDropdownNavbarItem/index.js"
