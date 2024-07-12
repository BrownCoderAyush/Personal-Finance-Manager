<!-- Validation checks are done by sequelize and validatoin error is getting managed by error handler -->
# Documentation of personalFinanceManager API

### Database - 
`PostgreSQL`
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
    "password": <YOUR_DB_LOGIN_PASS>,
    "database": "personalfinancemanager",
    "host": "localhost",
    "dialect": "postgres"
  }
}
```

- For GUI interface PgAdmin v4 or v8 can be used.
- Once you've added your db config as listed above, go to the src folder from your terminal and execute `npx sequelize db:create` and then execute `npm start`


