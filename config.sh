#!/bin/bash

. "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)/../config.sh"


# https://hub.docker.com/_/nginx
DCR_NAME=site-crazydan-org
DCR_IMAGE_VERSION=1.17.7-alpine
DCR_IMAGE_NAME="nginx"

DCR_IMAGE="${DCR_IMAGE_NAME}:${DCR_IMAGE_VERSION}"

DCR_VOLUME="${SITE_MAIN_VOLUME}"
