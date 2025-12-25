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
export async function getServicesList({ numIndex }) {
    const [servicesList] = await pool.query(`
        SELECT id, service_nombre, service_value
        FROM table_service
        WHERE id!=1 AND id!=2 AND id!=3
        ORDER BY id DESC
        LIMIT ?, 10;
        `, [numIndex]);

    const [servNum] = await pool.query(`
            SELECT count(*) as total FROM table_service
            WHERE id!=1 AND id!=2 AND id!=3;
            `);

    const maxIndex = Math.ceil(servNum[0].total / 10);
    const data = { servicesList, maxIndex }
    return data;
};

export async function getServiceByName({ listIndex, serviceName }) {
    const [servicesList] = await pool.query(`
        SELECT id, service_nombre, service_value
        FROM table_service
        WHERE service_nombre LIKE CONCAT(?, '%') AND id!=1 AND id!=2 AND id!=3
        ORDER BY id DESC
        LIMIT ?, 10;
        `, [serviceName, listIndex]);

    const [servNum] = await pool.query(`
            SELECT count(*) as total FROM table_service
            WHERE service_nombre LIKE CONCAT(?, '%') AND id!=1 AND id!=2 AND id!=3;
            `,[serviceName]);
    const maxIndex = Math.ceil(servNum[0].total / 10);
    const data = {servicesList,maxIndex}
    return data;
};




export default {
    createNewService,

    getServicesList,
    getServiceByName,
}