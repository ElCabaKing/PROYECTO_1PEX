import { AppError } from "../../utils/AppError.js";
import partsModel from "./parts.model.js";


export const partService = {
    async createNewPart({ partName, baseStock, pve }) {
        console.log("llega")
        if (!partName || !baseStock || !pve) { throw new AppError("No se proporciono los datos necesarios", 400, "CREATE") }
        await partsModel.createNewPart({ partName, baseStock, pve });

        return {
            isSaved: true
        }
    },

    async updateStock({newStock, partId, type}){
        if(!newStock || !partId){throw new AppError("No se proporciono los datos necesarios",400)};
        await partsModel.updatePartStock({newStock,partId, type});

        return{
            isSaved: true
        }
    }

}