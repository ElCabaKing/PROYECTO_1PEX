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
export const getParts = async ({ listIndex }) => {
    const [partList] = await pool.query(`
        SELECT id, part_name, stock, part_value
FROM table_part
ORDER BY id DESC
LIMIT ?, 10;
        `, [listIndex]);
    const [partNum] = await pool.query(`
        SELECT count(*) as total FROM table_part;
        `);

    const maxIndex = Math.ceil(partNum[0].total / 10);
    const data = { partList, maxIndex }
    return data;
};

export const getPartbyName = async ({ listIndex, partName }) => {
    
    const [partList] = await pool.query(`
        SELECT id, part_name, stock, part_value
FROM table_part
WHERE part_name LIKE CONCAT(?, '%')
ORDER BY id DESC
LIMIT ?, 10;;
        `, [partName, listIndex]);
    const [partNum] = await pool.query(`
        SELECT count(*) as total FROM table_part
        WHERE part_name LIKE CONCAT(?, '%');
        `,[partName]);

    const maxIndex = Math.ceil(partNum[0].total / 10);
    const data = { partList, maxIndex }
    return data;
};
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
    getPartbyName,

    updatePartStock,
}