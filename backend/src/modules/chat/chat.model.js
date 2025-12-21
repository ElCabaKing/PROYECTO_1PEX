import { pool } from "../../config/db.js";
import { AppError } from "../../utils/AppError.js";

export const createNewMessage = async ({ message, repairId, isTeam }) => {
    await pool.query(`
    INSERT INTO table_repair_chat
    (isTeam, repair_header_id, mensaje)
    VALUES(?, ?, ?);
    `, [isTeam, repairId, message]);
    return;
};

export const getChatbyId = async ({ repairId }) => {
    const [chat] = await pool.query(`
             SELECT
  trc.mensaje,
  tp.part_name,
  tp.part_value ,
  trc.isTeam,
  dp.accepted,
  dp.id as detail_id,
  tps.status_label,
  dp.units ,
  tp.id as part_id
FROM table_repair_chat trc
LEFT JOIN detail_part dp 
  ON dp.id = trc.partId
LEFT JOIN repair_details rd 
  ON rd.id = dp.repair_details_id
LEFT JOIN table_part tp 
  ON tp.id = rd.part_id
LEFT JOIN table_part_status tps 
ON tps.id = dp.accepted 
WHERE trc.repair_header_id = ?;
        `, [repairId]);

    return chat;
};

export const getHeadChatActive = async({userId}) => {
  const [list] = await pool.query(`
SELECT u.id as userid, rh.id ,rh.cedula_cliente  FROM repair_header rh 
INNER JOIN users u ON u.id = rh.id_reparador 
WHERE u.id = ? AND  (rh.repair_status = 2 OR rh.repair_status = 3 )
ORDER BY rh.id DESC
    `,[userId]);

    return list;
};

export const updateDetailPartStatus = async ({ detailPart, newStatus }) => {
    await pool.query(`
        UPDATE detail_part
SET  accepted=?
WHERE id=?;
        `, [newStatus,detailPart])
};
export default {
    createNewMessage,

    getChatbyId,
    getHeadChatActive,

    updateDetailPartStatus

};