import axios from "axios";
import { API_URL } from "../utils/api";
export async function appstLogin({ user_nombre, user_password }) {
    const res = await axios.post(`${API_URL}/login`,
        {
            user_nombre,
            user_password
        },
        {
            withCredentials: true
        }
    )
    return res.data;
}

export async function appstLogOut() {
    const res = await axios.get(`${API_URL}/logout`,
        {
            withCredentials: true
        }
    );
    return res.data;
}


