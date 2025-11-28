import { API_URL } from "../utils/api";
import axios from 'axios'
export async function appSaveAns({ans,user_password, user_name}) {
    const res = await axios.patch(`${API_URL}/saveSkAns`,{
        ans,
        user_password,
        user_name
    });
    return res.data;
}

export async function appValidateAns({user_name,user_ans}) {
    const res = await axios.get(`${API_URL}/validateAns`,{
        params:{
            user_name,
            user_ans
        }
    })
    return res.data;
}