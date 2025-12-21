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
    ('Historial', '/historial'),
    ('Servicios', '/servicios'),
    ('Repuestos', '/repuestos');

    


INSERT INTO
    menu_items (rol_id, details_id)
    VALUES (1, 1),
    (1, 2),
    (1, 3),
    (1, 4),
    (1, 5),
    (2, 1),
    (2, 3);


INSERT INTO
    table_service (service_nombre, service_value)
    VALUES ("COMIENZO DE REPARACION", 0),
    ("CONCLUSION DE REPARACION", 0),
    ("DISPOSITIVO ENTREGADO", 0),
    ("LIMPIEZA", 15),
    ("FORMATEO", 10),
    ("CAMBIO DE PANTALLA", 20),
    ("REINSTALACION DE SISTEMA", 15),
    ("DESBLOQUEO DE CUENTA", 10),
    ("REPARACION DE BOTON POWER", 7),
    ("REPARACION DE BOTONES VOLUMEN", 7),
    ("CAMBIO DE CAMARA", 10),
    ("CAMBIO DE MICROFONO", 6),
    ("CAMBIO DE PIN", 10);


INSERT INTO table_part (part_name, stock, part_value)
VALUES
("BATERIA GENERICA", 25, 8),
("BATERIA ORIGINAL", 15, 12),
("CAMARA TRASERA", 20, 9),
("CAMARA FRONTAL", 20, 7),
("ALTAVOZ", 30, 4),
("MICROFONO", 30, 3),
("BOTON POWER", 50, 2),
("BOTONES DE VOLUMEN", 50, 2),
("DISPLAY 6 PULGADAS", 8, 15),
("CONECTOR JACK 3.5MM", 20, 3);