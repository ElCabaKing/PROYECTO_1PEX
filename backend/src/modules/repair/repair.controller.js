import modelRepair from "./repair.model.js";
import jwt from 'jsonwebtoken'
import { emitNewRepair, emitAlertRepair } from "../../socket.js";
import { repairService } from "./repair.service.js";
export const createNewRepair = async (req, res, next) => {
    try {
        const { cedula_cliente, modelo, repair_problem } = req.body;
        const { message } = await repairService.createNewRepair({ cedula_cliente, modelo, repair_problem })
        emitNewRepair();
        return res.status(201).json(message)
    }
    catch (error) {
        next(error);
    }
};

export const getToWorkList = async (req, res) => {
    try {
        const toWorkList = await repairService.getToWorkList();
        return res.json(toWorkList)
    }
    catch (error) {
        return res.status(500).json({ error: error.message })
    }
};

export const updateHead = async (req, res, next) => {
    try {
        const token = req.cookies.auth_token;

        const { new_status, repair_id } = req.body;

        const { alert, response } = await repairService.updateHead({ token, new_status, repair_id });

        emitAlertRepair(alert);

        return res.status(201).json({ response: response })

    } catch (error) {
        next(error)
    }
};

export const getUsersRepair = async (req, res, next) => {
    try {
        const { refresh_token, auth_token } = req.cookies;
        const { repair_list } = await repairService.getUsersRepair({ refresh_token, auth_token });

        return res.status(200).json(repair_list);
    }
    catch (error) {
        next(error)
    };
};

export const getRepairData = async (req, res, next) => {
    try {
        const { refresh_token, auth_token } = req.cookies;
        const { repair_id } = req.query;

        const { repair_data, isUser } = await repairService.getRepairData({ refresh_token, auth_token, repair_id });

        return res.status(200).json({ repair_data, isUser })
    }
    catch (error) {
        next(error);
    };
};


export const createNewRepairDetail = async (req, res, next) => {
    try {
        const { repair_id, detalle, valor } = req.body;
        const { message } = await repairService.createNewRepairDetail({ repair_id, detalle, valor })

        return res.status(200).json(message);
    }
    catch (error) {
        next(error)
    }
}

export const getRepairDataClient = async (req, res, next) => {
    try {
        const { repair_id } = req.query;
        const {repair_data} = await repairService.getRepairDataClient({repair_id});

        return res.status(200).json(repair_data);
    }
    catch (error) {
        next(error);
    }

}

export const getHistoryList = async (req, res, next) => {
    try {
        const { index_num } = req.query;
        
        const {historyList} = await repairService.getHistoryList({index_num});

        return res.status(200).json(historyList);
    }
    catch (error) {
        next(error)
    }
}

export default {
    createNewRepair,
    getToWorkList,
    updateHead,
    getUsersRepair,
    getRepairData,
    createNewRepairDetail,
    getRepairDataClient,
    getHistoryList
}