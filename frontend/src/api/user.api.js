import { API_URL } from "../utils/api";
import axios from 'axios';


export async function appSaveAns({ ans, user_password, user_name }) {
    console.log("daittotz",ans, user_password, user_name)
    const res = await axios.patch(`${API_URL}/user/saveSkAns`, {
        ans,
        user_password,
        user_name
    });
    return res.data;
}

export async function appGetUsers({ user_name, index_number }) {
    const res = await axios.get(`${API_URL}/user/getList`,
        {
            params: {
                user_name,
                index_number
            }
        })
    return res.data;
}

export async function appChangeRole({ ID, rol_id }) {
    console.log(ID, rol_id)
    const res = await axios.patch(`${API_URL}/user/changeRol`,
        {
            ID,
            rol_id
        });
    return res.data;
}

export async function appAlterStatus({ ID, estado }) {
    console.log(ID, estado)
    const res = await axios.patch(`${API_URL}/user/changeEstado`,
        {
            ID,
            estado
        });
    console.log(res.data)
    return res.data.message;
}


export async function appSaveUser({ nombre, apellido, user_name, user_role }) {
    console.log(nombre, apellido, user_name, user_role)
    try {
        const res = await axios.post(`${API_URL}/user/saveUser`,
            {
                nombre,
                apellido,
                user_name,
                user_role

            });
        return res.data.response;
    }
    catch (err) {
        return err.response.data.response;
    }

}