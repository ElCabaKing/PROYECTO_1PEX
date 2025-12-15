-- Roles
INSERT INTO roles (rol_nombre) VALUES ('admin'), ('user');

-- Users (asumiendo que roles.id comienzan en 1)

INSERT INTO
    users (
        user_nombre,
        apellido,
        nombre,
        rol_id,
        user_password,
        security_code
    )
VALUES (
        'aliceP',
        'Padilla',
        'Alice',
        1,
        '$2a$10$rEyOrH.yPYsxsfl/tUfAIev1cp0b3a5CbdlEOPEfB2bG8JuWCpTb6',
        '$2a$10$um/dgbMx2COr/EDWO0uAy.v4CjD/WgCppKwV1mFKmPMapG2x9kyW6'
    );

INSERT INTO
    users (
        user_nombre,
        apellido,
        nombre,
        rol_id,
        user_password
    )
VALUES (
        'bobN',
        'Naranjo',
        'Bob',
        2,
        '$2a$10$Teh0X8jg1IObwISgTN8m6OKJS8VIQOppIP.nJAaHPqS6HILXEcZra'
    );

-- Menu details

INSERT INTO
    menu_details (menu_label, menu_path)
VALUES ('Mis Tareas', '/jobs'),
    ('Users', '/users'),
    ('Historial', '/historial');
    


INSERT INTO
    menu_items (rol_id, details_id)
    VALUES (1, 1),
    (1, 2),
    (1, 3),
    (2, 1),
    (2, 3);


