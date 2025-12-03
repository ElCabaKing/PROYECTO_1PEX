import { pool } from "../config/db.js";
export const mdSaveReapir = async (cedula_cliente, modelo, repair_problem) => {
    await pool.query(
        `INSERT INTO repair_header
            (cedula_cliente, modelo, repair_problem)
            VALUES(?, ?, ?);`,
        [cedula_cliente, modelo, repair_problem]);
    return;
};

export const mdGetRepairF = async () => {
    const [rows] = await pool.query(
        `SELECT rh.id, rh.modelo, ts.status_label, rh.repair_status , rh.fecha_inicio, rh.repair_problem
        FROM repair_header as rh 
        INNER JOIN tb_status ts ON ts.status_id = rh.repair_status 
        WHERE rh.id_reparador IS NULL;`);
    return rows;
};

export const mdUpdateHeader = async (user_id, new_status, repair_id) => {
    await pool.query(
        `UPDATE repair_header
        SET repair_status= ?, id_reparador= ?
        WHERE id=?; `,
        [new_status, user_id, repair_id]);
    return;
};

export const mdGetUsersRepair = async (user_id) => {
    const [repair_list] = await pool.query(
        `SELECT rh.id, rh.modelo, ts.status_label, rh.fecha_inicio, rh.repair_problem
        FROM repair_header as rh 
        INNER JOIN tb_status ts ON ts.status_id = rh.repair_status 
        WHERE rh.id_reparador = ?;`,
        [user_id]);
    return repair_list;
};

export const mdGetRepairCountById = async (user_id) => {
    const [reapir_count] = await pool.query(
        `SELECT count(*) as total FROM repair_header rh 
        WHERE rh.id_reparador = ?
        AND rh.repair_status =2`,
        [user_id]);
    return reapir_count;
};

export const mdGetRepairDetailsById = async (repair_id) => {
    const [repair_data] = await pool.query(
        `SELECT * FROM repair_details rd 
        WHERE rd.repair_headerId  = ?`,
        [repair_id]);
    const [repair_header] = await pool.query(
        `SELECT ts.status_label ,rh.repair_problem , rh.modelo, rh.id , SUM(rd.valor) as total  FROM repair_header rh
        INNER JOIN repair_details rd ON rd.repair_headerId =rh.id 
        INNER JOIN tb_status ts ON ts.status_id = rh.repair_status 
        WHERE rh.id =?`,
        [repair_id]
    )
    return [repair_data,repair_header];
};

export const mdGetRepairById = async (repair_id) => {
    const [repair_data] = await pool.query(
        `SELECT ts.status_label ,rh.repair_problem , rh.modelo, rh.id , SUM(rd.valor) as total  FROM repair_header rh
        INNER JOIN repair_details rd ON rd.repair_headerId =rh.id 
        INNER JOIN tb_status ts ON ts.status_id = rh.repair_status 
        WHERE rh.id =?`,
        [repair_id]
    )
    return [repair_data];
};


export default {
    mdSaveReapir,
    mdGetRepairF,
    mdUpdateHeader,
    mdGetUsersRepair,
    mdGetRepairCountById,
    mdGetRepairDetailsById,
    mdGetRepairById
}