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
## Jak uruchomić

### Inicjowanie bazy danych

### Wypełnienie przykłądowymi danymi

## Serwer backendowy

## Interfejs graficzny strony

## Baza danych

## Opis plików/katalogów

 - `database`
   - `generator`
   - `example_data.sql`
   - `model.dbm` - model bazy danych w programie [pgModeler](https://pgmodeler.io/)
   - `regen.sh` - skrypt do tworzenie dwóch następnych plików w `model.dbm`
   - `model.png` - model w postaci graficznej
   - `schema.sql` - model w postaci ddl
 - `src` - kod źródłowy
   - 

## Autorzy

 - Adam Jędrzejowski <a.jedrzejowski@gmail.com>
 - Ewelina Drelich <???>
