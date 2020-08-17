-- Home table
INSERT INTO homes (address)
VALUES ('123 Test One Lane');

INSERT INTO homes (address)
values ('456 Test Two Lane');

-- Users table

INSERT INTO users (first_name, last_name, email, home_id)
VALUES ('Steve', 'Rogers', 'steverogers@example.com', 1);

INSERT INTO users (first_name, last_name, email, home_id)
VALUES ('Black', 'Widow', 'blackwidow@example.com', 1);

INSERT INTO users (first_name, last_name, email, home_id)
VALUES ('Macbook', 'Pro', 'macbookpro@example.com', 2);

INSERT INTO users (first_name, last_name, email, home_id)
VALUES ('Surface', 'Book', 'surfacebook@example.com', 2);

-- Entries table
INSERT INTO entries (name, category, price, home_id)
VALUES ('Coke', 'groceries', 1, 1);

INSERT INTO entries (name, category, price, home_id)
VALUES ('Eggs', 'groceries', 6, 2);

INSERT INTO entries (name, category, price, home_id)
VALUES ('Sponges', 'household', 2, 2);

INSERT INTO entries (name, category, price, home_id)
VALUES ('Internet', 'bills', 50, 2);

-- User Entries table
INSERT INTO users_entries (user_id, entry_id, home_id)
VALUES (1, 1, 1);

INSERT INTO users_entries (user_id, entry_id, home_id)
VALUES (2, 2, 1);

INSERT INTO users_entries (user_id, entry_id, home_id)
VALUES (3, 3, 2);

INSERT INTO users_entries (user_id, entry_id, home_id)
VALUES (4, 4, 2);
