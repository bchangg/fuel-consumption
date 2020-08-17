# Spot Me Back

This is a full stack application that allows people who live together to track their expenses in an attempt to make everything more fair

## Dependencies

### Server (Node Express App, `localhost:5000`)
1. bcrypt
2. body-parser
3. cookie-session
4. cors
5. dotenv
6. express
7. helmet
8. pg

There is `knex` in the root package.json, this can be reoved as I did not actually use it.

### Client (React App, `localhost:3000`)
1. material-ui/core
2. material-ui/icons
3. @testing-library/jest-dom
4. @material-ui/core
5. @material-ui/icons
6. @testing-library/jest-dom
7. @testing-library/react
8. @testing-library/user-event
9. axios
9. react
10. react-dom
11. react-responsive
11. react-scripts


## Database Setup

1. Ensure you have `PostgreSQL` installed on your local machine. (Mac: `brew install postgres` to install with `homebrew`)
2. Enter `psql postgres` into your command line
3. Enter `CREATE ROLE spot_me_back WITH LOGIN PASSWORD 'development'` to create a new role in PSQL
4. Enter `ALTER ROLE spot_me_back CREATEDB` to grant `CREATEDB` permissions on `spot_me_back` role
5. Exit PSQL with `\q`
6. Enter `psql -d postgres -U spot_me_back` to connect to PSQL with `spot_me_back` role
7. Enter `CREATE DATABASE spot_me_back_api` to create database

## Start Application

1. Complete the database setup instructions above
2. Execute `npm start` in the root directory of the app
3. Visit `localhost:3000` to view the application
4. Visit `localhost:5000` to make calls to the api server

## Known Issues
This project is incomplete due to the timeframe given. Here are some known issues:
1. Unable to display "Summary" section as intended. It is supposed to look something like `PERSON NAME contributed: AMOUNT for MONTH`
2. Unable to write query to parse Edit History section. The idea was to use the `created_at` column in the `users_entries` to display a chronological order of who edited what last. There may be more flushing out needed for the precise logic.
3. The design could be better implemented
4. Project does not use TypeScript due to time constraint. I am unfamiliar with Typescript so I didn't go down that rabbit hole
5. Project has yet to be deployed to Netlify due to time constraint.
6. Project does not utilize AWS. I am unfamiliar with the details of AWS so I didn't go down that rabbit hole.
