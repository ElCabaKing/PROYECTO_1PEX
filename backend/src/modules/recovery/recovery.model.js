import { pool } from "../../config/db.js";

export const getSecurityCode = async (userName) => {
    const [security_code] = await pool.query(`
    SELECT u.security_code FROM users u  
    WHERE u.user_nombre = ?;`,
        [userName]);
    return security_code[0];
}

export const updateUserPassword = async (userName, newPasswordHash) => {
    await pool.query(
        "UPDATE users SET user_password = ? WHERE user_nombre = ?",
        [newPasswordHash, userName]
    );
};

export default {
    getSecurityCode,
    updateUserPassword
}