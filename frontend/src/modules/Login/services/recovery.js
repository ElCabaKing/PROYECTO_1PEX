import axios from "axios";
import { API_URL } from "../../../utils/api";


export async function getValidateWord(userName,securityCode) {
    console.log(userName,securityCode)
    try{
        const validate = await axios.post(`${API_URL}/recovery/SecurityCode`,
            {
                userName,
                securityCode
            }
        );
        return validate.data;
    }
    catch(error){
        if(error.status === 404 || error.status === 403){
            throw error.response.data.error;
        }

        throw error.response.data.error;
        
    }
} 

export async function updateUserPassword(userName, newPassword) {
    try{
        const res = await axios.patch(`${API_URL}/recovery/ChangePassword`,
            {
                userName,
                newPassword
            }
        );
        return res.data;
    }
    catch(error){
        alert(error.response.data.response);
        return
    }
}