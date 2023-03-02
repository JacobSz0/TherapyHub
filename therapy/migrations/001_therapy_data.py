steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE roles (
            id SERIAL NOT NULL PRIMARY KEY,
            role VARCHAR(255) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE roles;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE accounts (
            id SERIAL NOT NULL PRIMARY KEY,
            username VARCHAR(50) NOT NULL UNIQUE,
            email VARCHAR(200) NOT NULL UNIQUE,
            hashed_password VARCHAR(500) NOT NULL,
            role_id INTEGER NOT NULL REFERENCES roles(id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE accounts;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE therapy (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(100) NOT NULL,
            license_information VARCHAR(100) NOT NULL,
            city VARCHAR(100) NOT NULL,
            state VARCHAR(100) NOT NULL,
            zipcode INTEGER NOT NULL,
            picture TEXT NOT NULL,
            specialties TEXT [],
            About_me TEXT NOT NULL,
            payment TEXT [],
            languages TEXT NOT NULL,
            email VARCHAR(100) NOT NULL,
            phone VARCHAR(100) NOT NULL,
            account_id INTEGER NOT NULL REFERENCES accounts(id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE therapy;
        """,
    ],
    [
        """
        CREATE TABLE client (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(100) NOT NULL,
            city VARCHAR(100) NOT NULL,
            state VARCHAR(100) NOT NULL,
            zipcode INTEGER NOT NULL,
            additional_notes TEXT NOT NULL,
            account_id INTEGER NOT NULL REFERENCES accounts(id),
            wish_list TEXT ARRAY
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE client;
        """,
    ],
]
