import { pool } from "../../config/db.js";
import { AppError } from "../../utils/AppError.js";

//Create
export const createNewPart = async ({ partName, baseStock, pve }) => {
    await pool.query(`
    INSERT INTO table_part
(part_name, stock, part_value)
VALUES(?, ?, ?);`,
        [partName, baseStock, pve]);
    return;
}
//Get
export const getParts = async () => {
    const [partList] = await pool.query(`
        SELECT id, part_name, stock, part_value
FROM table_part;
        `);

    return partList;
}
//Update
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

    getParts,

    updatePartStock,
}