import axios from "axios";
import { API_URL } from "../../../utils/api.js";
export async function Login({ user_nombre, user_password }) {
    console.log(API_URL,"login");
    const res = await axios.post(`${API_URL}/api/log/login`,
        {
            user_nombre,
            user_password
        },
        {
            withCredentials: true
        }
    );
    console.log(res.data);
    return res.data;
}

export async function LogOut() {
    const res = await axios.get(`${API_URL}/logout`,
        {
            withCredentials: true
        }
    );
    return res.data;
}


