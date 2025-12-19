import { partService } from "./parts.service.js";

export const createNewPart = async (req, res, next) => {
    try {
        const { partName, baseStock, pve } = req.body;

        const isSaved = await partService.createNewPart({ partName, baseStock, pve });

        return res.status(200).json(isSaved);
    }
    catch (error) {
        next(error);
    }
};

export const getPartList = async (req, res, next) => {
    try{
        const partList = await partService.getPartList();

        return res.status(200).json(partList)
    }
    catch(error){
        next(error)
    }
}

export const updatePartStock = async (req, res, next) => {
    try{
        const {newStock, partId, type} = req.body;

        const isSaved = await partService.updateStock({newStock, partId, type});

        return res.status(200).json(isSaved);
    }
    catch(error){
        next(error);
    }
}


export default {
    createNewPart,

    getPartList,

    updatePartStock
    
}