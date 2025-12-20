import { pool } from "../../config/db.js";
import { AppError } from "../../utils/AppError.js";

export const createNewMessage = async ({ message, repairId, isTeam }) => {
    await pool.query(`
    INSERT INTO table_repair_chat
    (isTeam, repair_header_id, mensaje, partId)
    VALUES(?, ?, ?);
    `, [isTeam, repairId, message]);
    return;
};

export const getChatbyId = async ({ repairId }) => {
    const [chat] = await pool.query(`
        SELECT
  trc.mensaje,
  tp.part_name,
  trc.isTeam,
  dp.accepted,
  tps.status_label,
  dp.units 
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
}

export const updateDetailPartStatus = async ({ detailPart, newStatus }) => {
    await pool.query(`
        UPDATE detail_part
SET  accepted=?
WHERE id=?;
        `, [detailPart, newStatus])
}
export default {
    createNewMessage,

    getChatbyId,

    updateDetailPartStatus

}