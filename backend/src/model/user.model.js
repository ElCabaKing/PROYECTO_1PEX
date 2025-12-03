import { pool } from "../config/db.js";

export const mdSaveSkAns = async (user_name, user_sk_ans, user_password) => {
    await pool.query(
        `UPDATE users
        SET security_code = ?,user_password = ?
        WHERE user_nombre = ?`,
        [user_sk_ans, user_password, user_name])
    return;
}

export const mdGetAns = async (user_name) => {
    const [rows] = await pool.query(
        `SELECT security_code FROM users
        WHERE user_nombre = ?`,
        [user_name])
    return rows[0];
}

export const mdSaveUser = async (user_name, apellido, nombre, user_rol, firstPass) => {
    await pool.query(
        `INSERT INTO users
        (user_nombre,apellido,nombre, rol_id, user_password)
        VALUES(?, ?, ?, ?, ?);`,
        [user_name, apellido, nombre, user_rol, firstPass]
    );
    return;
}

export const mdGetIndex = async () => {
    const [number_user] = await pool.query(
        `SELECT COUNT(*) AS total FROM users;`
    )
    const number_pages = Math.ceil(number_user[0].total/10);
    return number_pages;
}

export const mdGetList = async (user_name,number_index) => {
    const [lista_user] = await pool.query(
        `SELECT u.ID,u.user_nombre,u.apellido,u.nombre,rl.rol_nombre,u.estado,u.rol_id
        FROM users as u
        INNER JOIN roles AS rl ON u.rol_id = rl.id
        WHERE u.user_nombre != ?
        ORDER BY u.ID
        LIMIT ?,10`,
        [user_name,number_index]);
    const [lista_roles] = await pool.query(
        `SELECT * FROM roles`
    )
    return [lista_user, lista_roles];
}

export const mdChangeRol = async (ID, rol_id) => {
    await pool.query(
        `UPDATE users
        SET  rol_id=?
        WHERE id=?;`,
        [rol_id, ID]
    );
    return;
}

export const mdChangeStatus = async (ID, estatus) => {
    await pool.query(
        `UPDATE users
        SET  estado=?
        WHERE id=?;`,
        [estatus, ID]
    );
}

export default {
    mdSaveSkAns,
    mdGetAns,
    mdSaveUser,
    mdGetList,
    mdChangeRol,
    mdChangeStatus,
    mdGetIndex
}