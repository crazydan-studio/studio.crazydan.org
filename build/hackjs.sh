#!/bin/bash
_DIR_="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)"
set -xe

NODE_MODULES="${_DIR_}/../node_modules"

cp -f "${_DIR_}/hackjs/docusaurusContext.js" \
    "${NODE_MODULES}/@docusaurus/core/lib/client/docusaurusContext.js"

cp -f "${_DIR_}/hackjs/LocaleDropdownNavbarItem.js" \
    "${NODE_MODULES}/@docusaurus/theme-classic/lib/theme/NavbarItem/LocaleDropdownNavbarItem/index.js"

cp -f "${_DIR_}/hackjs/plugin-image-zoom.js" \
    "${NODE_MODULES}/plugin-image-zoom/src/zoom.js"

# 禁止按本地化生成多份页面
sed -i \
    -r '/^\s*context.siteConfig.i18n.locales = \[\];/d' \
    "${NODE_MODULES}/@docusaurus/core/lib/commands/build.js"
sed -i \
    -r '/^\s*const i18n =/i context.siteConfig.i18n.locales = [];' \
    "${NODE_MODULES}/@docusaurus/core/lib/commands/build.js"

# 升级 PlantUML 的版本
## https://github.com/vowstar/node-plantuml-back
## https://plantuml.com/download
## https://plantuml.com/vizjs
PLANTUML_JAR_URL='https://github.com/plantuml/plantuml/releases/download/v1.2023.13/plantuml-1.2023.13.jar'
VIZJS_JAR_URL='http://beta.plantuml.net/j2v8_linux_x86_64-3.1.6.jar'
PLANTUML_JAR="$(basename "${PLANTUML_JAR_URL}")"
VIZJS_JAR="$(basename "${VIZJS_JAR_URL}")"
mkdir -p "${NODE_MODULES}/node-plantuml/vendor"
pushd "${NODE_MODULES}/node-plantuml/vendor"
    rm -f plantuml.jar vizjs.jar

    if [ ! -f "${PLANTUML_JAR}" ]; then
        curl "${PLANTUML_JAR_URL}" -o "${PLANTUML_JAR}"
    fi
    if [ ! -f "${VIZJS_JAR}" ]; then
        curl "${VIZJS_JAR_URL}" -o "${VIZJS_JAR}"
    fi

    ln -sf "${PLANTUML_JAR}" plantuml.jar
    ln -sf "${VIZJS_JAR}" vizjs.jar
popd
