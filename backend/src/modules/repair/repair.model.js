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

export const createNewRepairDetailService = async ({ repair_id, service_id }) => {
    await pool.query(
        `INSERT INTO repair_details
(repair_header_id, service_id)
VALUES(?, ?);`,
        [repair_id, service_id]);
    return;
}

export const createNewRepairDetailPart = async ({ repair_id, part_id, units }) => {
    const [detailId] = await pool.query(
        `INSERT INTO repair_details
(repair_header_id, part_id)
VALUES(?, ?);`,
        [repair_id, part_id]);



    const [detailPart] = await pool.query(`INSERT INTO detail_part
(repair_details_id, units)
VALUES(?, ?);`,
        [detailId.insertId, units]);


    await pool.query(`
        INSERT INTO table_repair_chat
(isTeam, repair_header_id, mensaje, partId)
VALUES(1, ?, 'SE SOLICITA SU AUTORIZACION CON UNA PIEZA', ?);
        `, [repair_id, detailPart.insertId]);
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
  rh.repair_problem ,
  SUM(
    CASE
      WHEN rd.part_id IS NOT NULL AND dp.accepted = 3 THEN 0
      WHEN rd.part_id IS NOT NULL AND dp.accepted = 1 THEN 0
      WHEN rd.part_id IS NOT NULL THEN dp.units * tp.part_value
      WHEN rd.service_id IS NOT NULL THEN ts.service_value
      ELSE 0
    END
  ) AS total,
  rh.cedula_cliente,
  rh.fecha_inicio,
  rh.id_reparador,
  rh.modelo,
  ts2.status_label
FROM repair_details rd
LEFT JOIN detail_part dp ON dp.repair_details_id = rd.id
LEFT JOIN repair_header rh ON rh.id = rd.repair_header_id
LEFT JOIN table_part tp ON tp.id = rd.part_id
LEFT JOIN table_service ts ON ts.id = rd.service_id
INNER JOIN tb_status ts2 ON ts2.status_id = rh.repair_status
WHERE rd.repair_header_id = ?;
    `, [repair_id]);
    const [body] = await pool.query(
        `SELECT rd.id,dp.accepted ,
COALESCE(dp.units * tp.part_value, ts.service_value)
 AS total, COALESCE(ts.service_nombre , tp.part_name) AS detalle,
 rd.fecha  FROM repair_details rd 
LEFT JOIN detail_part dp ON dp.repair_details_id = rd.id 
LEFT JOIN table_part tp ON tp.id = rd.part_id  
LEFT JOIN table_service ts ON ts.id  = rd.service_id 
WHERE rd.repair_header_id = ?`,
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
  SUM(
    CASE
      WHEN rd.part_id IS NOT NULL AND dp.accepted = 3 THEN 0
      WHEN rd.part_id IS NOT NULL AND dp.accepted = 1 THEN 0
      WHEN rd.part_id IS NOT NULL THEN dp.units * tp.part_value
      WHEN rd.service_id IS NOT NULL THEN ts.service_value
      ELSE 0
    END
  ) AS Total,
  rh.cedula_cliente,
  rh.fecha_inicio,
  rh.id_reparador,
  rh.modelo,
  ts2.status_label
FROM repair_details rd
LEFT JOIN detail_part dp ON dp.repair_details_id = rd.id
LEFT JOIN repair_header rh ON rh.id = rd.repair_header_id
LEFT JOIN table_part tp ON tp.id = rd.part_id
LEFT JOIN table_service ts ON ts.id = rd.service_id
INNER JOIN tb_status ts2 ON ts2.status_id = rh.repair_status
WHERE rd.repair_header_id = ?;
    `, [repair_id]);
    return [header[0]];
};

export const getRepairUserId = async ({ repair_id }) => {
    const [repair_user] = await pool.query(
        `SELECT rh.id_reparador  FROM repair_header rh 
        WHERE rh.id = ?`, [repair_id]
    );
    if (repair_user.length === 0) {
        throw new AppError("No se encontro el registro", 404, "REGISTRO")
    }
    return repair_user[0].id_reparador;
};

export const getRepairHeader = async ({ repair_id }) => {
    const [repair_header] = await pool.query(
        `
    SELECT 
  rh.id,
  SUM(
    CASE
       WHEN rd.part_id IS NOT NULL AND dp.accepted = 3 THEN 0
      WHEN rd.part_id IS NOT NULL AND dp.accepted = 1 THEN 0
      WHEN rd.part_id IS NOT NULL THEN dp.units * tp.part_value
      WHEN rd.service_id IS NOT NULL THEN ts.service_value
      ELSE 0
    END
  ) AS Total,
  rh.cedula_cliente,
  rh.fecha_inicio,
  rh.id_reparador,
  rh.modelo,
  ts2.status_label
FROM repair_details rd
LEFT JOIN detail_part dp ON dp.repair_details_id = rd.id
LEFT JOIN repair_header rh ON rh.id = rd.repair_header_id
LEFT JOIN table_part tp ON tp.id = rd.part_id
LEFT JOIN table_service ts ON ts.id = rd.service_id
INNER JOIN tb_status ts2 ON ts2.status_id = rh.repair_status
WHERE rd.repair_header_id = ?;
`,
        [repair_id]
    );
    return repair_header[0];
};

export const getHistoryList = async ({ search_number }) => {
    const [historyList] = await pool.query(
        `SELECT rh.id ,rh.cedula_cliente ,rh.fecha_inicio , ts.status_label, u.user_nombre  FROM repair_header rh 
INNER JOIN tb_status ts ON ts.status_id  = rh.repair_status 
LEFT JOIN users u ON u.id  = rh.id_reparador  
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

export const updateRepairHeader = async ({ user_id, new_status, repair_id, service_id }) => {
    await pool.query(
        `UPDATE repair_header
        SET repair_status= ?, id_reparador= ?
        WHERE id=?; `,
        [new_status, user_id, repair_id]);
    await pool.query(
        `INSERT INTO repair_details
    (repair_header_id, service_id)
    VALUES(?, ?);`,
        [repair_id, service_id]
    )
    return;
};

export default {
    createNewRepair,
    createNewRepairDetailService,
    createNewRepairDetailPart,

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