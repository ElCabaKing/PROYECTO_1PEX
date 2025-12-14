import axios from "axios";
import { API_URL } from "../utils/api";

export async function appGetRepairClient(repair_id) {
    try{
        const repairData = await axios.get(`${API_URL}/repair/getHeaderClient`,
        {
            params: {
                repair_id
            }
        }
    );
    console.log(repairData)
    return repairData.data;
    }
    catch(error){
        console.log(error)
        if(error.response.status === 404){
            return {nonExistense: true,error: error.response.data.message};
        }
        return alert(error.response.data.response);
    }
}
