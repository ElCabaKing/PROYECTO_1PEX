CREATE TABLE test (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255)
);

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    rol_nombre VARCHAR(255) NOT NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    user_nombre VARCHAR(255) NOT NULL,
    rol_id INTEGER REFERENCES roles (id),
    security_code VARCHAR(255),
    user_password VARCHAR(255)
);
CREATE TABLE menu_details (
    id SERIAL PRIMARY KEY,
    menu_label VARCHAR(255) NOT NULL,
    menu_path VARCHAR(255)
);
CREATE TABLE menu_items (
    rol_id INTEGER REFERENCES roles (id),
    details_id INTEGER REFERENCES menu_details (id)
);

