CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rol_nombre VARCHAR(255) NOT NULL
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_nombre VARCHAR(255) NOT NULL UNIQUE,
    apellido VARCHAR(255) NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    rol_id INT,
    security_code VARCHAR(255),
    user_password VARCHAR(255),
    estado BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (rol_id) REFERENCES roles(id)
);

CREATE TABLE menu_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    menu_label VARCHAR(255) NOT NULL,
    menu_path VARCHAR(255)
);

CREATE TABLE menu_items (
    rol_id INT,
    details_id INT,
    FOREIGN KEY (rol_id) REFERENCES roles(id),
    FOREIGN KEY (details_id) REFERENCES menu_details(id)
);

CREATE TABLE tb_status (
    status_id INT AUTO_INCREMENT PRIMARY KEY,
    status_label VARCHAR(50) NOT NULL
);

INSERT INTO tb_status(status_label) VALUES
("DISPONIBLE"),("EN REPARACION"),("REPARADO");

CREATE TABLE repair_header (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cedula_cliente VARCHAR(10) NOT NULL,
    modelo VARCHAR(255) NOT NULL,
    repair_status INT DEFAULT 1,
    FOREIGN KEY (repair_status) REFERENCES tb_status(status_id),
    fecha_inicio DATE DEFAULT (CURRENT_DATE),
    repair_problem VARCHAR(255) NOT NULL,
    id_reparador INT,
    FOREIGN KEY (id_reparador) REFERENCES users(id)
);

CREATE TABLE repair_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    detalle VARCHAR(255) NOT NULL,
    valor INT DEFAULT 0,
    fecha_ingreso DATETIME DEFAULT CURRENT_TIMESTAMP,
    repair_headerId INT,
    FOREIGN KEY (repair_headerId) REFERENCES repair_header(id)
);
