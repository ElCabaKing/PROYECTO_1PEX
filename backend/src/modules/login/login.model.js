import { pool } from "../../config/db.js";

export const getUserByUsername = async ({username}) => {
  try {
    const [rows] = await pool.query(
      `SELECT user_password, id, security_code, estado
       FROM users 
       WHERE user_nombre = ? 
       LIMIT 1`,
      [username]
    );

    return rows[0] || null;
  } catch (error) {
    console.error("DB Error: findUserByUsername:", error);
    throw new Error("DATABASE_ERROR");
  }
};


export const getUserPermissions = async ({user_id}) => {
  try {
    const [rows] = await pool.query(
      `SELECT md.menu_label, md.menu_path
       FROM menu_details md
       INNER JOIN menu_items mt ON mt.details_id = md.id
       INNER JOIN users ur ON ur.rol_id = mt.rol_id
       WHERE ur.id = ?`,
      [user_id]
    );

    return rows;
  } catch (error) {
    console.error("DB Error: getUserPermissions:", error);
    throw new Error("DATABASE_ERROR");
  }
};

export const getUserRoles = async ({user_id}) => {
  try {
    const [rows] = await pool.query(
      `SELECT rl.rol_nombre
       FROM roles rl
       INNER JOIN users u ON u.rol_id = rl.id
       WHERE u.id = ?`,
      [user_id]
    );

    return rows[0];
  } catch (error) {
    console.error("DB Error: getUserRoles:", error);
    throw new Error("DATABASE_ERROR");
  }
};

export default {
  getUserByUsername,
  getUserPermissions,
  getUserRoles,
};
