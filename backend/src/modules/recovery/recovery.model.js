import { pool } from "../../config/db.js";
import { AppError } from "../../utils/AppError.js";

export const getSecurityCode = async ({ userName }) => {
    const [securityRow] = await pool.query(`
    SELECT u.security_code FROM users u  
    WHERE u.user_nombre = ?;`,
        [userName]);
    console.log(securityRow.length)
    if (securityRow.length === 0) { throw new AppError("No se encontro el usuario", 404) }
    return securityRow[0].security_code;
}

export const updateUserPassword = async ({ userName, newPasswordHash }) => {
    await pool.query(
        "UPDATE users SET user_password = ? WHERE user_nombre = ?",
        [newPasswordHash, userName]
    );
};

export default {
    getSecurityCode,
    updateUserPassword
}