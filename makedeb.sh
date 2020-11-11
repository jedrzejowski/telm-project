#!/bin/bash

set -e

tempdir=$(mktemp -d)
trap "rm -rf $tempdir" EXIT

function dockersave() {
    tag=$1

    if [[ "$(docker images -q $tag 2> /dev/null)" == "" ]]; then
        docker pull $tag
    fi

    docker save $tag | gzip > "$tempdir/$tag.tar.gz"
}

function makedocker() {
    mytag="telm-project-node:$(jq .version package.json -r)"
    #docker build --file node.dockerfile --tag $mytag .
    docker save --output "$tempdir/$mytag.tar" $mytag

    dockersave postgres:12-alpine
    dockersave nginx:1.18-alpine
    dockersave redis:6-alpine
}

function makedeb() {
    pkgdir=$1
    tempdir=$2
    pkgdir="$tempdir/pkg"

    pkgname=$(jq .name package.json -r)
    pkgver=$(jq .version package.json -r)
    pkgdesc=$(jq .description package.json -r)

    mkdir -p "$pkgdir/DEBIAN/"

    cat << EOF >> "$pkgdir/DEBIAN/control"
Package: $pkgname
Version: $pkgver
Section: custom
Priority: optional
Architecture: all
Maintainer: noone <noone@example.com>
Depends: docker, docker-compose
Description: $pkgdesc
EOF

    appdir="/lib/$pkgname"
    installdir="$pkgdir/$appdir"

    install -dm755 "$pkgdir/bin" "$pkgdir/var/lib/$pkgname"

    install -Dm644 docker-compose.prod.yml "$installdir/docker-compose.yml"
    install -Dm644 nginx.nginx "$installdir/nginx.nginx"
    install -Dm644 .prod.env "$pkgdir/etc/$pkgname.conf"

    cat << EOF >> "$pkgdir/bin/$pkgname"
#!/bin/bash

APP_VOLUME=/var/lib/$pkgname \\
docker-compose \\
    --project-name telm_project \\
    --env-file "$appdir/env" \\
    --env-file "/etc/$pkgname.conf" \\
    --file "$appdir/docker-compose.yml" \\
    "\$@"

EOF
    chmod 755 "$pkgdir/bin/$pkgname"

}

makedocker
fakeroot bash -c "
$(LC_ALL=C type makedeb | tail -n +2)
makedeb '$pkgdir' '$tempdir'
"

tree -a $tempdir
dpkg-deb --build "$tempdir/pkg" ./
