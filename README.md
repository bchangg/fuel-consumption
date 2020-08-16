# Spot Me Back

This is a full stack application that allows people who live together to track their expenses in an attempt to make everything more fair

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
2. Execute `npm run start` in the root directory of the app
