--* these lines of code were run in command line/ beekeeper
--* might be good to have a file to know your schemas

CREATE DATABASE perntodo;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);