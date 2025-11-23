import { pool } from "../config/db.js";

export const mdAuth = async (path) => {
    const [rows] = await pool.query(
        `SELECT  rl.rol_nombre from roles as rl
		INNER JOIN menu_items mi ON mi.rol_id  = rl.id 
		INNER JOIN menu_details md  ON md.id  = mi.details_id 
		WHERE md.menu_label  = ?`,
        [path]
    );
    return rows[0];
};


export default {
    mdAuth,

}