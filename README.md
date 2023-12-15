
# JavaScript: API oraz FETCH

## Wprowadzenie

Aplikacja jest podzielona na dwie części. 

### Client

To część związana z tym, co może zrobić użytkownik:
* wybrać wycieczkę przez wprowadzenie ilości zamawianych biletów w odpowiednie pola formularza i kliknięcie `dodaj do zamówienia`. Wiąże się to z:
    * walidacją danych
    * dodawaniem zamówienia do panelu z prawej strony, tj. do koszyka
    * aktualizowaniem ceny za całość
* potwierdzić zamówienie poprzez wprowadzenie imienia, nazwiska oraz adresu email do pola zamówienia i kliknięcie `zamawiam`. Wiąże się to z:
    * walidacją danych
    * wysłaniem zamówienia do bazy danych (API uruchomione dzięki JSON Server)
    * wyczyszczeniem koszyka.

Pliki powiązane:
* `./src/index.html`
* `./src/js/client.js`
* `./src/css/client.css`

### Admin    
Panel zarządzania wycieczkami zapisanymi w bazie danych. Jego funkcjonalności to: 
* dodawanie wycieczek
* usuwanie wycieczek
* modyfikowanie wycieczek.

Pliki powiązane:
* `./src/admin.html`
* `./src/js/admin.js`
* `./src/css/admin.css`

## Implementacja

### Webpack

W tym zadaniu wykorzystałem webpacka. 

Zauważ, że posiada on dodatkową konfigurację, która obsługuje podział aplikacji na dwie części. Zwróć szczególną uwagę na tzw. [chunki](https://webpack.js.org/glossary/#c).

Webpack zajmuje się również wczytaniem plików CSS (zobacz importy w `client.js` oraz `admin.js`) – dzieje się to dzięki odpowiednim loaderom dla plików o rozszerzeniu `.css` w `webpack.config.js`. Style są wczytywane do `<head>`.

Przed uruchomieniem webpacka należy zainstalować wszystkie zależności komendą
```
npm install
```
Potem dopiero możesz go uruchomić poprzez `npm start`.

Jeśli chcesz odpalić wersję `client`, to wystarczy wpisać w przeglądarkę `http://localhost:8080/index.html`. Natomiast `admin` jest dostępny pod adresem: `http://localhost:8080/admin.html`.

> **Uwaga!** Jeśli nie widzisz poprawnych numerów linii kodu dla błędów w konsoli, to prawdopodobnie nie masz włączonej obsługi source maps dla plików JavaScript. Możesz to zmienić w [ustawieniach przeglądarki Chrome](https://developers.google.com/web/tools/chrome-devtools/javascript/source-maps).

### JSON Server

Odpalamy kolejny terminal (webpack już jest uruchomiony w jednym) i przechodzimy do katalogu głównego z zadaniem. Następnie wpisujemy do terminala:
```
json-server --watch ./data/excursions.json
```

Od teraz API będzie dostępne pod adresem: http://localhost:3000. Zauważ jednak, że w pliku mamy dwa różne zasoby, czyli:
* excursions
* orders.

W zależności od tego, na jakich danych będziesz chciał pracować, do `fetch()` przekażesz inny URL, tj.:
* http://localhost:3000/excursions – zarządzanie wycieczkami
* http://localhost:3000/orders – zarządzanie zamówieniami.

### ExcursionsAPI

W katalogu `./src/js` znajdziesz plik `ExcursionsAPI.js`, który zawiera klasę o tej samej nazwie.

Został on stworzony, aby przechowywać w jednym miejscu całą komunikację z API.

To tutaj są zdefiniowane metody, które odpytują API, np. pozwalają pobrać wycieczki z bazy lub je do niej dodać.

Ta klasa będzie używana zarówno po stronie `client`, jak i `admin`, dlatego też została już zaimportowana do obu plików JS odpowiedzialnych za każdą z części.

### Prototypy

Zauważ, że w kodzie występują prototypy (`.*--prototype`). Są one używane tylko po to, aby ułatwić prezentację danych.
