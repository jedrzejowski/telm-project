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

## Zmienne środowiskowe

Całą aplikacją można sterować za pomocą zmiennych środowiskowych.

| Nazwa | Wartość | Opis |
| --- | --- | --- |
| APP_SECRET | string | używany do podpisywania pliku cookie z identyfikatorem sesji |
| APP_PORT | number | port na którym zostanie uruchomiona aplikacja |
| APP_REDISURL | string | uri serwera Redis |
| APP_PGHOST | string | adres serwera PostgreSQL |
| APP_PGPORT | number | port serwera PostgreSQL |
| APP_PGDATABASE | string | nazwa bazy danych |
| APP_PGUSER | string | użytkownik do serwera PostgreSQL |
| APP_PGPASSWD | string | hasło do serwera PostgreSQL |

## Jak uruchomić? 

Aplikacja jest pisana z myślą o uruchomianiu w środowisku skonteneryzowanym.
Do budowania aplikacji nie potrzeba [Docker'a](https://docs.docker.com/get-docker/), ale warto go mieć.

### Uruchomianie w formie pokazowej

### Uruchomianie w formie do rozwijania

### Uruchamianie bez `Docker`'a i `docker-compose`

### Inicjowanie bazy danych


### Wypełnienie przykładowymi danymi

## Serwer backendowy

## Interfejs graficzny strony

## Baza danych

![model.png](database/model.png)

Baza danych została zaprojektowana za pomocą programu [pgModeler](https://pgmodeler.io/).
Jest to otwarto-źródłowy program, opublikowany na licencji GNU General Public License.

Baza danych składa się z 6 tabel:
 - `patients` - dane pacjentów
 - `hospitalizantions` - dane pobytów pacjentów, hostpitalizacje
 - `examinations` - badania wykonywane pacjentom
 - `personel` - personel medyczny
 - `basic_auth` - dane logowania
 - `logs` - logi dostępu do api

## Opis plików/katalogów

 - `database`
   - `generator`
   - `example_data.sql`
   - `model.dbm` - model bazy danych w programie [pgModeler](https://pgmodeler.io/)
   - `regen.sh` - skrypt do tworzenie dwóch następnych plików w `model.dbm`
   - `model.png` - model w postaci graficznej
   - `schema.sql` - model w postaci ddl
 - `src` - kod źródłowy
   - `backend` - część serwerowa
   - `frontend` - część przeglądarkowa
   - `data` - część danych, ich definicje i walidatory
 - `docker-compose.*.yml` - pliki orkiestratora
   
## Użyte biblioteki

Sumaryczna użyta ilość bibliotek to: ( ͡° ͜ʖ ͡° )つ──☆*:・ﾟ **1233**.
Można ją uzyskać uruchamiając `npm audit`.

![node_modules](https://img.devrant.com/devrant/rant/r_1030841_w7Mq9.jpg)

A na poważnie: użyliśmy narzędzia `npm` do zorwiązywania zależności.
Sprawia to, że podczas instalowania bibliotek w katalogu `node_modules` są instalowane zależności do tych bibliotek i tak w kółko.
Pełny wykaz bibliotek znajduje się w pliku `dependencies.txt`, a biblioteki faktynie żyte przez nas są w pliku `package.json` w sekcjach dependencies i `devDependencies`.

Najważniejsze biblitoki:

 - `react`
 - `react-admin`

## Autorzy

 - Adam Jędrzejowski <a.jedrzejowski@gmail.com>
 - Ewelina Drelich <???>
