#!/bin/bash

tempdir=$(mktemp -d)
#trap "rm -rf $tempdir" EXIT

pkgdir="$tempdir"



function makedeb() {
    pkgdir=$1

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
Maintainer: noone <example@example.com>
Depends: docker, docker-compose
Description: $pkgdesc
EOF

    install -Dm755 docker-compose.yml "$pkgdir/usr/$(pkgname)"

}


fakeroot bash -c "
$(LC_ALL=C type makedeb | tail -n +2)
makedeb '$pkgdir'
"

tree $tempdir
