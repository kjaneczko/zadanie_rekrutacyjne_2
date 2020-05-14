# zadanie_rekrutacyjne_2
 
**Treść zadania:**

Zadanie ma na celu implementację aplikacji do zarządzania kontami użytkownikami.
1. Użytkownik posiada:
    * [X] imię 
    * [X] nazwisko, 
    * [X] login (adres email), 
    * [X] hasło (8 znaków - małe duże litery, cyfry, znaki specjalne) 
    * [X] typ.
2. Typy użytkownika:
    * [X] wykładowca,
    * [X] pracownik administracyjny.
3. Wykładowca posiada dodatkowe pola takie jak:
    * [X] telefon 
    * [X] wykształcenie.
4. Pracownik administracyjny zawiera:
    * [X] adres korespondencyjny  
    * [X] adres zamieszkania (województwo, miasto, kod, ulica, numer).
5. Użytkownik może być:
    * [X] jednocześnie wykładowcą i pracownikiem administracyjnym.
6. Aplikacja powinna realizować funkcje:
    * [ ] CRUD na kontach użytkownika.
7. Interface:
    * [X] powinien być przygotowany jako SPA. 
8. Dodawanie konta użytkownika:
    * [X] ma odbywać się w dwóch krokach. 
        * [X] W pierwszym kroku wprowadzenie danych podstawowych, 
        * [X] w drugim danych konkretnego typu.
10. Lista kont użytkowników:
    * [ ] powinna być sortowana 
    * [ ] umożliwiać wyszukiwanie użytkowników.
11. Wszystkie akcje zmieniające dane w bazie powinny być
    * [ ] logowane. 
    * [ ] Log powinien zawierać historię zmian.
12. Wymagania:
    * [ ] testy jednostkowe,
    * [ ] dokumentacja techniczna API (swagger)
    * [ ] instrukcja instalacji, uruchomienia testów
    * [X] kod źródłowy powinien być dostarczony jako repozytorium git, albo plik zip
13. Do implementacji usługi proszę wykorzystać:
    * [X] framework Laravel.
14. Aplikacja powinna umożliwić 
    * [X] wygenerowanie przykładowych danych (100 tysięcy rekordów).

**Czas realizacji 7 dni.**

----------------------------------
#### Instalacja
1. Tworzymy bazę danych w MySQL.
2. Aktualizujemy plik .env zmieniając poniższe wartości:
>DB_DATABASE=database\
>DB_USERNAME=user\
>DB_PASSWORD=password

```text
$ php artisan migrate
$ php artisan db:seed
$ php artisan passport:client --personal
$ php artisan serve
```

Wyszukujemy w bazie danych w tabeli users użytkownika o ID = 1 i na jego email się logujemy. Standardowe hasło to 'password';
 
## UWAGI
Checkboxy przy kolejnych punktach na powyższej liście informują o wykonanych punktach zadania.

 
Wykonano logowanie po Api i generowanie przykładowych danych. 
Domyślnie tworzy się 50 kont, ale można to zmienić edytując plik 
_/database/seeds/UserSeeder.php_ i zmieniają wartość z 50 na dowolną:
```text
factory(App\User::class, 50)->create()->each(function ($user) { 
```

Po zalogowaniu mamy możliwość wyświetlenia formularza dodawania nowego pracownika. Uwzględnia podstawową walidację. Uniemożliwia 
przejście do kolejnych kroków bez uzupełnienia wszystkich wymaganych pól. Formularz i kolejne kroki renderują się w zależności od wybranych
stanowisk. Wysyłanie formularza działa, ale nie ma jeszcze oprogramowanej logiki CRUD na tych tabelach.

Kolejnym krokiem będzie oprogramowanie logiki i wykoranie widoków dla szczegółów, edycji i usunięcia wpisów.

Dalej trzeba dodać paginację, sortowanie i wyszukiwanie na liście pracowników.

Ostatnią rzeczą do wykonania są testy, dokumentacja i instrukcja. 

Ponadto warto się zastanowić na robicie części kodu na poszczególne komponenty - formularz dodawania pracownika oraz dodać prosty system uprawnień.
