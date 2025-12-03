import modelRepair from "../model/rapair.model.js";
import jwt from 'jsonwebtoken'
import { emitNewRepair, emitAlertRepair } from "../socket.js";
export const ctSaveRepair = async (req, res) => {
    try {
        const { cedula_cliente, modelo, repair_problem } = req.body;
        await modelRepair.mdSaveReapir(cedula_cliente, modelo, repair_problem);
        emitNewRepair();
        return res.json({ message: "Guardado" })
    }
    catch (error) {
        return res.status(500).json({ error: error.message })
    }
};

export const ctGetRepairsF = async (req, res) => {
    try {
        const Torepair_list = await modelRepair.mdGetRepairF();
        return res.json(Torepair_list)
    }
    catch (error) {
        return res.status(500).json({ error: error.message })
    }
};

export const ctUpdateHead = async (req, res) => {
    try {
        const token = req.cookies.auth_token;
        const decodedToken = jwt.decode(token);

        const { new_status, repair_id } = req.body;

        const reg = await modelRepair.mdGetRepairCountById(decodedToken.id);

        if (reg[0].total >= 5) {
            return res.status(403).json({
                response: "Hijo de la semilla, acaba un trabajo primero"
            });
        }

        await modelRepair.mdUpdateHeader(
            decodedToken.id,
            new_status,
            repair_id
        );

        emitAlertRepair(repair_id, decodedToken.user_nombre);


        return res.status(200).json({
            response: "Reparación aceptada correctamente"
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const ctGetUsersRepair = async (req, res) => {
    try {
        const token = req.cookies.auth_token;
        const decodenToken = jwt.decode(token);
        const repair_list = await modelRepair.mdGetUsersRepair(decodenToken.id);
        return res.json(repair_list);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    };
};

export const ctGetRepairData= async (req,res) => {
    try{
        const {repair_id} = req.query;
        if(!repair_id){return res.status(405).json({response: "No se envio el id"})}
        const repair_data = await modelRepair.mdGetRepairDetailsById(repair_id);
        return res.json(repair_data);
    }
    catch(error){
        return res.status(500).json({error: error.message});
        };
};

export const ctGetRepairDataClient= async (req,res) => {
    try{
        const {repair_id} = req.query;
        if(!repair_id){return res.status(405).json({response: "No se envio el id"})}
        const repair_data = await modelRepair.mdGetRepairById(repair_id);
        return res.json(repair_data);
    }
    catch(error){
        return res.status(500).json({error: error.message});
        };
};

export default {
    ctSaveRepair,
    ctGetRepairsF,
    ctUpdateHead,
    ctGetUsersRepair,
    ctGetRepairData,
    ctGetRepairDataClient
}