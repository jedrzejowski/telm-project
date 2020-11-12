# telm-project

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

## Jak uruchomić aplikację

Aplikacja jest pisana z myślą o uruchomianiu w środowisku skonteneryzowanym.

Do budowania aplikacji jest potrzebe:

| Oprogramowane | Wymagane |
| --- | --- |
| nodejs | tak | 
| npm | tak |
| [Docker](https://docs.docker.com/get-docker/) | nie, ale warto |

W celu działania aplikacji należy posiadać zainicjowaną bazę danych, należy to zrobić tylko raz.
Baza będzie dostępna w katalogu `volume`.
Jak zainicjować bazę jest opisane w sekcjach poniżej.

### Uruchomianie w formie pokazowej

```shell script
docker-compose up
```
Powyższy skrypt się sam nie zakończy.
Aby go zakończyć, wciśnij `Ctrl+C`, co zakończy działanie aplikacji. 

Zainicjuj bazy danych:
```shell script
docker-compose exec postgresql psql telm telm < database/schema.sql
docker-compose exec postgresql psql telm telm < database/example_data.sql
```

Wejdź na stronę [localhost:8080](http://localhost:8080/).

Zaloguj się jako `xxx` z hasłem `xxx`;

### Uruchomianie testowych baz danych

Uruchom bazy danych PostgreSQL i Redis:

```shell script
docker-compose --env-file ".dev.env" --file "docker-compose.dev.yml" up
```

Uwaga: baza danych jest inicjowana z użytkownikiem `telm` i hasłem `SuperTajneHaslo`.

Aby połączyć się z bazą danych, proszę wpisać:
```shell script
psql --host=localhost --port=5001 --dbname=telm --username=telm
Password for user telm: SuperTajneHaslo
```

### Uruchamianie aplikacji w formie developerskiej

Zainstaluj zależności:
```shell script
npm install
```

W dwóch osobnych terminalach uruchom polecenia:
```shell script
npm run dev-build
npm run dev-serve
``` 

Wejdź na stronę [localhost:8080](http://localhost:8080/).

Uwaga: aby podłączyć inną bazę danych, niż ta domyśla, należy zmienieć parametry w pliku `.env`.

### Jak działa budowanie

Uruchamiając `npm run build`, uruchamia `webpack`'a, który pakuje cały projekt w kilka skompresowanych plików do katalogu `dist`, o następującej strukturze: 
```
├── dist
│   ├── private
│   │   └── main.js
│   └── public
│       ├── index.html
│       ├── main.js
│       ├── material-ui.js
│       ├── material-ui.js.LICENSE.txt
│       ├── react-admin.js
│       ├── react.js
│       ├── react.js.LICENSE.txt
│       ├── rechart.js
│       ├── vendor.js
│       └── vendor.js.LICENSE.txt
├── node_modules
└── package.json
```


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

Sumaryczna użyta ilość bibliotek to: ( ͡° ͜ʖ ͡° )つ──☆*:・ﾟ **1229**.
Liczbę można uzyskać uruchamiając `npm audit`.

![node_modules](https://img.devrant.com/devrant/rant/r_1030841_w7Mq9.jpg)

A na poważnie: użyliśmy narzędzia `npm` do zorwiązywania zależności.
Sprawia to, że podczas instalowania bibliotek w katalogu `node_modules` są instalowane zależności do tych bibliotek i tak w kółko.
Pełny wykaz bibliotek znajduje się w pliku `dependencies.txt`, a biblioteki faktynie żyte przez nas są w pliku `package.json` w sekcjach dependencies i `devDependencies`.

Najważniejsze biblitoki:

 - `react` - główna biblioteka graficzna
 - `react-admin` - biblioteka do tworzenia stron typu dashboard z danymi 
 - `@material-ui/core` - biblioteka graficzna w stylu Material 
 - `@date-io/dayjs` - biblioteka do obsługi czasu
 - `yup` - biblioteka do walidacji danych 
 - `recharts` - biblioteka do rysowania grafów
 - `typescript` - język javascript z typowaniem
 - `webpack` - narzędzie do pakowania plików
 - `express` - biblioteka do tworzenia serwera HTTP
 - `pg` - biblioteki do obsługi bazy PostgreSQL
 - `knex` - biblioteki generowania dynamicznych zapytań SQL
 

## Autorzy

 - Adam Jędrzejowski <a.jedrzejowski@gmail.com>
 - Ewelina Drelich <???>
