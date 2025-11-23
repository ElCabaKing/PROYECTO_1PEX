import { pool } from "../config/db.js";

export const mdLogin = async (user_nombre) => {
    const [rows] = await pool.query(
        `SELECT user_password,id FROM users WHERE user_nombre = ? LIMIT 1`,
        [user_nombre]
    );
    return rows[0];
};

export const mdUserDateLog = async (user_id) => {
    const [rows ] = await pool.query(
        `SELECT md.menu_label,md.menu_path FROM menu_details as md
        INNER JOIN menu_items as mt ON mt.details_id = md.id
        INNER JOIN users as ur ON ur.rol_id = mt.rol_id
        WHERE ur.id = ?`,
        [user_id]
    );
    return rows;
}

export const mdUserRolesData = async(user_id) => {
    const [rows] = await pool.query(
        `SELECT rl.rol_nombre FROM roles as rl 
		INNER JOIN users u ON u.rol_id  = rl.id 
		WHERE  u.id  = ?`,
        [user_id]
    );
    return rows;
}

export default {
    mdLogin,
    mdUserDateLog,
    mdUserRolesData
}