
# Documentation of personalFinanceManager API

### Assumptions -
- Due to time constraints (college examination) I have exported the postman API collection, it can be further imported and here examiner can interact with the APIs there .
- All the request body and response are handled in json.
- Documentation for the API can be found here https://documenter.getpostman.com/view/16295396/2sA3e5d7np .
- Import the json file Personal finance management.postman_collection.json present in root directory to Postman.

### Database - 
`PostgreSQL` (It is mandatory to install this on the local system. )
### ORM -
`SEQUELIZE`

## Setup The Project

- Clone the repository on your local
- Execute `npm install` on the same path as root directory of your project
- Create a `.env` file in the root directory of your project and add the following environment variables
  - `PORT=3001`
  - `DATABASE_NAME=personalfinancemanager`
  -  `DATABASE_USERNAME=<USERNAME>`
  - `DATABASE_PASSWORD=<PASSWORD>`
  - `JWT_KEY=<DUMMYKEY>`

- Inside the `src/config` folder create a new file `config.json` and then add the following piece of json

```
{
  "development": {
    "username": <YOUR_DB_LOGIN_NAME>,
    "password": <YOUR_DB_LOGIN_PASSWORD>,
    "database": "personalfinancemanager",
    "host": "localhost",
    "dialect": "postgres"
  },
  "test": {
    "username": <YOUR_TEST_DB_LOGIN_NAME>,
    "password": <YOUR_TEST_DB_LOGIN_PASSWORD>,
    "database": "test_personalfinancemanager",
    "host": "localhost",
    "dialect": "postgres"
  }
  
}
```

- For GUI interface PgAdmin v4 or v8 can be used.
- Once you've added your db config as listed above, go to the src folder from your terminal and execute `npx sequelize db:create` and then execute `npm start`
- Validation checks are done by sequelize and validatoin error is getting managed by error handler.


## Testing

- I have created tests for some functions of user.service.js, report.service.js, category.service.js.
- You can run the tests from the root directory by running `npm test` command.

