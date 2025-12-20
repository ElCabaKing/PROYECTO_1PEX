import { pool } from "../../config/db.js";


//Create
export async function createNewService({ service, vpe }) {
    await pool.query(`
        INSERT INTO table_service (service_nombre, service_value)
        VALUES (? , ?);
        `, [service, vpe]);
    return;
}

//Get
export async function getServicesList() {
    const [servicesList] = await pool.query(`
        SELECT service_nombre, service_value
        FROM table_service
        WHERE id!=1 AND id!=2 AND id!=3;
        `);
    return servicesList;
};


export default {
    createNewService,

    getServicesList,
}