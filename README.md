# telm-project

```shell script
APP_VOLUME=/var/lib/$pkgname \\
docker-compose \
    --project-name telm_project \
    --env-file ".prod.env" \
    --file "docker-compose.prod.yml" \
    --file "docker-compose.build.yml" \
    up
```