import modelRepair from "../model/repair.model.js";
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

        if(new_status===2){const reg = await modelRepair.mdGetRepairCountById(decodedToken.id);

        if (reg[0].total >= 5) {
            return res.status(403).json({
                response: "Hijo de la semilla, acaba un trabajo primero"
            });
        }

        await modelRepair.mdUpdateHeader(
            decodedToken.id,
            new_status,
            repair_id,
            "SE COMENZO LA REPARACION"
        );

        emitAlertRepair(`El usuario ${decodedToken.user_nombre} ha aceptado el pedido ${repair_id}`);


        return res.status(200).json({
            response: "Reparación aceptada correctamente"
        });}
        else{
            await modelRepair.mdUpdateHeader(
                decodedToken.id,
                new_status,
                repair_id,
                "LA REPARACION CONCLUYO"
            );
            emitAlertRepair(`El usuario ${decodedToken.user_nombre} ha terminado el pedido ${repair_id}`);
            res.status(200).json({response: "Repracion concluida"})
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
};

export const ctGetUsersRepair = async (req, res) => {
    try {
        let token = req.cookies.auth_token;
        if (!token) { token = req.cookies.refresh_token }
        const decodenToken = jwt.verify(token, process.env.JWT_SECRET);
        const repair_list = await modelRepair.mdGetUsersRepair(decodenToken.id);
        return res.json(repair_list);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    };
};

export const ctGetRepairData = async (req, res) => {
    try {
        let token = req.cookies.auth_token;
        if (!token) { token = req.cookies.refresh_token }
        const decodedToken= jwt.verify(token, process.env.JWT_SECRET);
        const { repair_id } = req.query;
        if (!repair_id) { return res.status(405).json({ response: "ctGetRepairData No se envio el id" }) }
        const repair_user_id = await modelRepair.mdGetRepairUserId(repair_id);
        const repair_data = await modelRepair.mdGetRepairDetailsById(repair_id);
        return res.json([repair_data,{isUser: repair_user_id.id_reparador === decodedToken.id}]);
    }
    catch (error) {
        return res.status(404).json({ error: error.message });
    };
};

export const ctGetRepairDataUser = async (req, res) => {
    try {
        const { repair_id } = req.query;
        if (!repair_id) { return res.status(405).json({ response: "No se envio el id" }) }
        const repair_data = await modelRepair.mdGetRepairById(repair_id);
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
        await modelRepair.mdSaveRepairDetail(repair_id,detalle,valor);
        return res.sendStatus(201)
    }
    catch(error){
        return res.status(500).json({error: error.message})
    }
}

export const ctGetRepairDataClient = async (req,res) => {
    try{const {repair_id} = req.query;
    console.log(repair_id);
    const repair_data = await modelRepair.mdGetRepairHeader(repair_id);
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
        const historyList = await modelRepair.mdGetHistoryList(search_number);
        if(!historyList){return res.status(404).json({response: "No hay registros"})};
        return res.status(200).json(historyList);
    }
    catch(error){
        return res.status(500).json({error: error.message})
    }
}

export default {
    ctSaveRepair,
    ctGetRepairsF,
    ctUpdateHead,
    ctGetUsersRepair,
    ctGetRepairData,
    ctGetRepairDataUser,
    ctSaveRepairDetail,
    ctGetRepairDataClient,
    ctGetHistoryList
}