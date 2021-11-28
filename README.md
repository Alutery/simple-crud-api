# Simple CRUD API

RS School Node.js Course

## How to install

To install this application you must follow the following steps:

1. Download it from this repository;
2. Run the command line and go to the application folder;
3. Enter the command `npm install` or `npm i` and wait for the dependency installation process to complete;
4. Enter the command `npm run start:dev` or `npm run start:prod`;
5. The server is ready to go (value of port on which application is running is stored in `.env` file).

There are 2 modes of running application: **development** and **production**

---

## API description

API path `/person`:
_ **GET** `/person` or `/person/${personId}` should return all persons or person with corresponding `personId`
_ **POST** `/person` is used to create record about new person and store it in database
_ **PUT** `/person/${personId}` is used to update record about existing person
_ **DELETE** `/person/${personId}` is used to delete record about existing person from database

Persons are stored as `objects` that have following properties:
_ `id` — unique identifier (`string`, `uuid`) generated on server side
_ `name` — person's name (`string`, **required**)
_ `age` — person's age (`number`, **required**)
_ `hobbies` — person's hobbies (`array` of `strings` or empty `array`, **required**)
