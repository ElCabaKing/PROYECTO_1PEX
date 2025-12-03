import axios from "axios";
import { API_URL } from "../utils/api";
export async function appGetRapairList() {
    const res = await axios.get(`${API_URL}/repair/getRepairList`);
    return res.data;
}

export async function appUpdateHead(repair_id,new_status) {
    try{await axios.patch(`${API_URL}/repair/updateHead`,
        {
            new_status,
            repair_id
        },
        {
            withCredentials: true
        }
    )
    return;}
    catch(error){
        return alert(error.response.data.response)
    }
};

export async function appSaveRepair(cedula_cliente,modelo,repair_problem) {
   try{ await axios.post(`${API_URL}/repair/saveRepair`,
        {
            cedula_cliente,
            modelo,
            repair_problem
        },
        {
            withCredentials: true
        }
    )
    return;}
    catch(error){
        return alert(error.response.data.message)
    }
};


export async function appGetUserRepairList() {
    try{
        const list = await axios.get(`${API_URL}/repair/getUsersRepair`,
            {
                withCredentials: true
            }
        );
        return list.data;
    }
    catch(error){
        return alert(error.response.data.message)
    }
    
}