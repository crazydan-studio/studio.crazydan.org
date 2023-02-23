#!/bin/bash
_DIR_="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)"
set -xe

NODE_MODULES="${_DIR_}/../node_modules"

cp -f "${_DIR_}/hackjs/docusaurusContext.js" \
    "${NODE_MODULES}/@docusaurus/core/lib/client/docusaurusContext.js"

cp -f "${_DIR_}/hackjs/LocaleDropdownNavbarItem.js" \
    "${NODE_MODULES}/@docusaurus/theme-classic/lib/theme/NavbarItem/LocaleDropdownNavbarItem/index.js"
