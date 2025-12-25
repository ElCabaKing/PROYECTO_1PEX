import { pool } from "../../config/db.js";

export const updateSecurityCode = async ({ user_name, SecurityCode, user_passwordhs }) => {
    try {
        await pool.query(
            `UPDATE users
        SET security_code = ?,user_password = ?
        WHERE user_nombre = ?`,
            [SecurityCode, user_passwordhs, user_name]);
        return {created: true};
    }
    catch (error) {
        throw new Error("DATABASE_ERROR");
    }
}

export const getSecurityCode = async ({ user_name }) => {
    try {
        const [rows] = await pool.query(
            `SELECT security_code FROM users
        WHERE user_nombre = ?`,
            [user_name]);
        return rows[0];
    }
    catch (error) {
        throw new Error("DATABASE_ERROR");
    }
}

export const createNewUser = async ({ user_name, apellido, nombre, user_role, firstPass }) => {
    try {
        await pool.query(
            `INSERT INTO users
        (user_nombre,apellido,nombre, rol_id, user_password)
        VALUES(?, ?, ?, ?, ?);`,
            [user_name, apellido, nombre, user_role, firstPass]
        );
        return {succes: true};
    }
    catch (error) {
        throw new Error("DATABASE_ERROR");
    }
}

export const getUserIndex = async () => {
    try {
        const [number_user] = await pool.query(
            `SELECT COUNT(*) AS total FROM users;`
        );
        const number_pages = Math.ceil(number_user[0].total / 10);
        return number_pages;
    }
    catch (error) {
        throw new Error("DATABASE_ERROR");
    }
}

export const getUserList = async ({ user_name, number_index }) => {
    try {
        const [lista_user] = await pool.query(
            `SELECT u.ID,u.user_nombre,u.apellido,u.nombre,rl.rol_nombre,u.estado,u.rol_id
        FROM users as u
        INNER JOIN roles AS rl ON u.rol_id = rl.id
        WHERE u.user_nombre != ?
        ORDER BY u.ID
        LIMIT ?,10`,
            [user_name, number_index]);
        const [lista_roles] = await pool.query(
            `SELECT * FROM roles`
        )
        return [lista_user, lista_roles];
    }
    catch (error) {
        throw new Error("DATABASE_ERROR");
    }
}

export const updateUserRol = async ({ID, rol_id}) => {
    try {
        await pool.query(
            `UPDATE users
        SET  rol_id=?
        WHERE id=?;`,
            [rol_id, ID]
        );
        return {updated: true};
    }
    catch (error) {
        throw new Error("DATABASE_ERROR");
    }
}

export const updateUserStatus = async ({ID, estado}) => {
    try {
        await pool.query(
            `UPDATE users
        SET  estado=?
        WHERE id=?;`,
            [estado, ID]
        );
        return {updated: true}
    }
    catch (error) {
        throw new Error("DATABASE_ERROR");
    }
}

export default {
    updateSecurityCode,
    getSecurityCode,
    createNewUser,
    getUserList,
    updateUserRol,
    updateUserStatus,
    getUserIndex
}