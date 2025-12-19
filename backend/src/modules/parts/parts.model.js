import { pool } from "../../config/db.js";
import { AppError } from "../../utils/AppError.js";

export const createNewPart = async ({ partName, baseStock, pve }) => {
    await pool.query(`
    INSERT INTO table_part
(part_name, stock, part_value)
VALUES(?, ?, ?);`,
        [partName, baseStock, pve]);
    return;
}

export const updatePartStock = async ({ newStock, partId, type }) => {
    switch (type) {
        case "+":
            await pool.query(
                "UPDATE table_part SET stock = stock + ? WHERE id = ?",
                [newStock, partId]
            );
            break;
        case "-":
            await pool.query(
                "UPDATE table_part SET stock = stock - ? WHERE id = ?",
                [newStock, partId]
            );
    }
    return;
};

export default {
    createNewPart,
    updatePartStock
}