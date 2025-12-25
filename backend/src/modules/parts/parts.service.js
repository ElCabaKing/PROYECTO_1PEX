import { AppError } from "../../utils/AppError.js";
import partsModel from "./parts.model.js";


export const partService = {
    //Create
    async createNewPart({ partName, baseStock, pve }) {
        if (!partName || !baseStock || !pve) { throw new AppError("No se proporciono los datos necesarios", 400, "CREATE") }
        await partsModel.createNewPart({ partName, baseStock, pve });

        return {
            isSaved: true
        }
    },

    //Get
    async getPartList({ numIndex }) {
        if (!numIndex) { throw new AppError("No se proporciono los datos necesarios", 400) }
        const IntIndex = (Number(numIndex) * 10) - 10;
        const data = await partsModel.getParts({ listIndex: IntIndex });
        return { partlist: data.partList, maxIndex: data.maxIndex };
    },

    async getPartListbyName({ numIndex,partName }) {
        if (!numIndex || !partName) { throw new AppError("No se proporciono los datos necesarios", 400) }
        const IntIndex = (Number(numIndex) * 10) - 10;
        const data = await partsModel.getPartbyName({ listIndex: IntIndex,partName: partName});
        return { partlist: data.partList, maxIndex: data.maxIndex };
    },


    //Update
    async updateStock({ newStock, partId, type }) {
        if (!newStock || !partId) { throw new AppError("No se proporciono los datos necesarios", 400) };
        await partsModel.updatePartStock({ newStock, partId, type });

        return {
            isSaved: true
        }
    },

}