#!/bin/bash

#
# Modele bazy danych tworzymy w [pgModeler](https://pgmodeler.io/)
# Ten skrypt eksportuje pliki *.dbm do plików *.sql i tworzy obrazy *.png modeli
#

cd "$(dirname $BASH_SOURCE)"

pgmodeler-cli --input "model.dbm" --export-to-png --output "model.png"
    
pgmodeler-cli --input "model.dbm" --export-to-file --output "schema.sql"


