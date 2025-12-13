import modelRepair from "./repair.model.js";
import jwt from 'jsonwebtoken'
import { emitNewRepair, emitAlertRepair } from "../../socket.js";
import { repairService } from "./repair.service.js";
export const createNewRepair = async (req, res, next) => {
    try {
        const { cedula_cliente, modelo, repair_problem } = req.body;
        const {message} = await repairService.createNewRepair({cedula_cliente, modelo, repair_problem})
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

        const {alert,response} = await repairService.updateHead({token,new_status,repair_id});

       emitAlertRepair(alert);

       return res.status(201).json({response: response})

    } catch (error) {
        next(error)
    }
};

export const getUsersRepair = async (req, res, next) => {
    try {
        const {refresh_token,auth_token} = req.cookies;
        const {repair_list} = await repairService.getUsersRepair({refresh_token,auth_token});

        return res.status(200).json(repair_list);
    }
    catch (error) {
        next(error)
    };
};

export const getRepairData = async (req, res, next) => {
    try {
        const {refresh_token,auth_token} = req.cookies;
        const { repair_id } = req.query;

        const {repair_data, isUser }= await repairService.getRepairData({refresh_token,auth_token,repair_id});
        
        return res.status(200).json({repair_data,isUser})
    }
    catch (error) {
        next(error);
    };
};

export const ctGetRepairDataUser = async (req, res) => {
    try {
        const { repair_id } = req.query;
        if (!repair_id) { return res.status(405).json({ response: "No se envio el id" }) }
        const repair_data = await modelRepair.getRepairById(repair_id);
        return res.json(repair_data);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    };
};


export const ctSaveRepairDetail = async (req,res) => {
    try{
        const {repair_id,detalle,valor} = req.body;
        console.log(repair_id,detalle,valor)
        await modelRepair.createNewRepairDetail(repair_id,detalle,valor);
        return res.sendStatus(201)
    }
    catch(error){
        return res.status(500).json({error: error.message})
    }
}

export const ctGetRepairDataClient = async (req,res) => {
    try{const {repair_id} = req.query;
    console.log(repair_id);
    const repair_data = await modelRepair.getRepairHeader(repair_id);
    console.log(repair_data)
    if(!repair_data.id){return res.status(404).json({response: "Pedido no encontrado"})}
    else{
        return res.status(200).json({repair_data});
    }}
    catch(error){
        return res.status(500).json({error: error.message});
    }

}

export const ctGetHistoryList = async (req,res) => {
    try{
        const {index_num} = req.query;
        const search_number = (index_num-1)*10
        const historyList = await modelRepair.getHistoryList(search_number);
        if(!historyList){return res.status(404).json({response: "No hay registros"})};
        return res.status(200).json(historyList);
    }
    catch(error){
        return res.status(500).json({error: error.message})
    }
}

export default {
    createNewRepair,
    getToWorkList,
    updateHead,
    getUsersRepair,
    getRepairData,
    ctGetRepairDataUser,
    ctSaveRepairDetail,
    ctGetRepairDataClient,
    ctGetHistoryList
}