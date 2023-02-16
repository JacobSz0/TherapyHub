steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE therapy (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(100) NOT NULL,
            license_information VARCHAR(100) NOT NULL,
            state VARCHAR(100) NOT NULL,
            zipcode INTEGER NOT NULL,
            picture TEXT NOT NULL,
            specialties TEXT NOT NULL,
            About_me TEXT NOT NULL,
            payment TEXT NOT NULL,
            languages TEXT NOT NULL

        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE dummy;
        """,
    ],
]
