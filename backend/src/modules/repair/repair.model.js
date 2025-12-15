import { pool } from "../../config/db.js";
import { AppError } from "../../utils/AppError.js";


//CREATE
export const createNewRepair = async ({ cedula_cliente, modelo, repair_problem }) => {
    await pool.query(
        `INSERT INTO repair_header
            (cedula_cliente, modelo, repair_problem)
            VALUES(?, ?, ?);`,
        [cedula_cliente, modelo, repair_problem]);
    return;
};

export const createNewRepairDetail = async ({ repair_id, detalle, valor }) => {
    await pool.query(
        `INSERT INTO repair_details
    (detalle, valor, repair_headerId)
    VALUES(?, ?, ?);`,
        [detalle, valor, repair_id]);
    return;
}

//GET
export const getRepairOnWork = async () => {
    const [rows] = await pool.query(
        `SELECT rh.id, rh.modelo, ts.status_label, rh.repair_status , rh.fecha_inicio, rh.repair_problem
        FROM repair_header as rh 
        INNER JOIN tb_status ts ON ts.status_id = rh.repair_status 
        WHERE rh.id_reparador IS NULL;`);
    return rows;
};

export const getUsersRepair = async ({ user_id }) => {
    const [repair_list] = await pool.query(
        `SELECT rh.id, rh.modelo, ts.status_label, rh.fecha_inicio, rh.repair_problem
        FROM repair_header as rh 
        INNER JOIN tb_status ts ON ts.status_id = rh.repair_status 
        WHERE rh.id_reparador = ? AND rh.repair_status = 2;`,
        [user_id]);
    return repair_list;
};


export const getRepairCountById = async ({ user_id }) => {
    const [repair_count] = await pool.query(
        `SELECT count(*) as total FROM repair_header rh 
        WHERE rh.id_reparador = ?
        AND rh.repair_status =2`,
        [user_id]);
    return repair_count;
};

export const getRepairDetailsById = async ({ repair_id }) => {
    const [exist] = await pool.query(
        "SELECT id FROM repair_header WHERE id = ?",
        [repair_id]
    );

    if (exist.length === 0) {
        throw new AppError("Registro no encontrado", 404, "REGISTRO");
    }

    const [header] = await pool.query(`
        SELECT 
            rh.id,
            rh.modelo,
            rh.repair_problem,
            ts.status_label,
            SUM(rd.valor) AS total
        FROM repair_header rh
        LEFT JOIN repair_details rd ON rd.repair_headerId = rh.id
        INNER JOIN tb_status ts ON ts.status_id = rh.repair_status
        WHERE rh.id = ?
    `, [repair_id]);
    const [body] = await pool.query(
        `SELECT rd.id, rd.detalle, rd.fecha_ingreso, rd.valor  FROM repair_details rd 
        WHERE rd.repair_headerId = ?`,
        [repair_id]);
    return [header[0], body];
};

export const getRepairClient = async ({ repair_id }) => {
    const [exist] = await pool.query(
        "SELECT id FROM repair_header WHERE id = ?",
        [repair_id]
    );

    if (exist.length === 0) {
        throw new AppError("Registro no encontrado", 404, "REGISTRO");
    }

    const [header] = await pool.query(`
        SELECT 
            rh.id,
            rh.modelo,
            rh.repair_problem,
            ts.status_label,
            SUM(rd.valor) AS total
        FROM repair_header rh
        LEFT JOIN repair_details rd ON rd.repair_headerId = rh.id
        INNER JOIN tb_status ts ON ts.status_id = rh.repair_status
        WHERE rh.id = ?
    `, [repair_id]);
    return [header[0]];
};

export const getRepairUserId = async ({ repair_id }) => {
    const [repair_user] = await pool.query(
        `SELECT rh.id_reparador  FROM repair_header rh 
        WHERE rh.id = ?`, [repair_id]
    );
    if (repair_user.length === 0) {
        console.log("error")
        throw new AppError("No se encontro el registro", 404, "REGISTRO")
    }
    return repair_user[0].id_reparador;
};

export const getRepairHeader = async ({ repair_id }) => {
    const [repair_header] = await pool.query(
        `SELECT rh.id, rh.cedula_cliente , rh.fecha_inicio, rh.modelo, ts.status_label, rh.repair_problem, sum(rd.valor ) as Total FROM repair_header rh 
        INNER JOIN tb_status ts ON ts.status_id = rh.repair_status 
        LEFT JOIN repair_details rd ON rd.repair_headerId = rh.id 
        WHERE rh.id = ?`,
        [repair_id]
    );
    return repair_header[0];
};

export const getHistoryList = async ({ search_number }) => {
    const [historyList] = await pool.query(
        `SELECT rh.id , rh.cedula_cliente, rh.fecha_inicio , ts.status_label , u.user_nombre, sum(rd.valor ) as Total  FROM repair_header rh 
INNER JOIN tb_status ts ON ts.status_id = rh.repair_status 
LEFT JOIN users u ON u.id = rh.id_reparador 
LEFT JOIN repair_details rd ON rd.repair_headerId = rh.id 
GROUP BY rh.id
	ORDER BY rh.id DESC
	LIMIT ?,10`,
        [search_number]
    );
    const [number] = await pool.query(
        `SELECT count(*) as Total FROM repair_header rh `
    );
    const number_pages = Math.ceil(number[0].Total / 10);
    return [historyList, number_pages]

};

//UPDATE

export const updateRepairHeader = async ({ user_id, new_status, repair_id, message }) => {
    await pool.query(
        `UPDATE repair_header
        SET repair_status= ?, id_reparador= ?
        WHERE id=?; `,
        [new_status, user_id, repair_id]);
    await pool.query(
        `INSERT INTO repair_details
    (detalle, valor, repair_headerId)
    VALUES(?, 0, ?);`,
        [message, repair_id]
    )
    return;
};

export default {
    createNewRepair,
    createNewRepairDetail,

    getRepairOnWork,
    getUsersRepair,
    getRepairCountById,
    getRepairDetailsById,
    getRepairClient,
    getRepairUserId,
    getRepairHeader,
    getHistoryList,

    updateRepairHeader
};