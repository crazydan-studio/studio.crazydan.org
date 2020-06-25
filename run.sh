#!/bin/bash

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)"
. "${DIR}/config.sh"


if container_exist ${DCR_NAME}; then
    echo "Remove the existing docker container - ${DCR_NAME} ..."
    try docker rm -f ${DCR_NAME}
fi


echo "Create a new docker container - ${DCR_NAME} ..."
mkdir -p ${DCR_VOLUME} ${DCR_VOLUME}/www
rsync -auAXsv \
      --progress \
    "${DIR}"/source/dist/ ${DCR_VOLUME}/www

# https://hub.docker.com/_/nginx
# https://github.com/nginxinc/docker-nginx/blob/master/stable/alpine/Dockerfile
echo "Change ownership of ${DCR_VOLUME} ..."
try docker run --rm \
            --user root \
            -v ${DCR_VOLUME}:/mnt \
            --entrypoint /bin/chown \
            ${DCR_IMAGE} \
            -R nginx:nginx /mnt
chmod go-rwx -R ${DCR_VOLUME}

echo "Create container - ${DCR_NAME} ..."
try docker run -d \
            --restart always \
            --name ${DCR_NAME} \
            --network=${NGINX_GATEWAY_NETNAME} \
            --hostname=${SITE_MAIN_HOSTNAME} \
            --label dps.network=${NGINX_GATEWAY_NETNAME} \
            -e TZ=${TZ} \
            -v /etc/localtime:/etc/localtime:ro \
            -v /usr/share/zoneinfo:/usr/share/zoneinfo:ro \
            -v "${DCR_VOLUME}/www":/usr/share/nginx/html:ro \
            ${DCR_IMAGE}


echo "Show docker container log ..."
sleep 5s && docker logs --tail 100 ${DCR_NAME}
