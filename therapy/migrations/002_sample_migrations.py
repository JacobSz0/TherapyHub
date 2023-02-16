steps = [
    [
        """
        CREATE TABLE client (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(100) NOT NULL,
            city VARCHAR(100) NOT NULL,
            state VARCHAR(100) NOT NULL,
            zipcode INTEGER NOT NULL,
            additional_notes TEXT NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE client;
        """,
    ]
]