-- Datos de ejemplo para la base

INSERT INTO test (nombre) VALUES ('testo'), ('testo 2');

-- Roles
INSERT INTO roles (rol_nombre) VALUES ('admin'), ('user');

-- Users (asumiendo que roles.id comienzan en 1)
INSERT INTO
    users (
        user_nombre,
        rol_id,
        user_password
    )
VALUES ('Alice', 1, 'contra1'),
    ('Bob', 2, 'contra2');

-- Menu details

INSERT INTO
    menu_details (menu_label, menu_path)
VALUES ('Dashboard', '/dashboard'),
    ('Users', '/users'),
    ('Profile', '/profile');

-- Menu items vinculados a roles
INSERT INTO
    menu_items (rol_id, details_id)
VALUES (1, 1),
    (1, 2),
    (1, 3),
    (2, 1),
    (2, 3);