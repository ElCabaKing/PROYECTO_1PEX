import { pool } from "../config/db.js";

export const mdSaveSkAns = async (user_name,user_sk_ans,user_password) => {
    await pool.query( 
        `UPDATE users
        SET security_code = ?,user_password = ?
        WHERE user_nombre = ?`,
    [user_sk_ans,user_password,user_name]) 
        
}

export const mdGetAns = async (user_name) => {
    const [rows] = await pool.query( 
        `SELECT security_code FROM users
        WHERE user_nombre = ?`,
    [user_name]) 
    return rows[0];
}

export default{
    mdSaveSkAns,
    mdGetAns
}