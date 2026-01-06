import axios from "axios";
import { API_URL } from "../../utils/url.js";

async function getRepairList(req, res) {
    const repair_list = await axios.get(`${API_URL}/repair/getRepairList`);
    console.log("reppara", repair_list.data);
    return res.json(repair_list.data);
}

async function appUpdateHead(req, res) {
    try {
        const token = req.cookies.auth_token;
        const refresh_token = req.cookies.refresh_token;
        const { repair_id, new_status } = req.body;
        const isOk = await axios.patch(`${API_URL}/repair/updateHead`,
            {
                new_status,
                repair_id,
                token,
                refresh_token
            }
        )
        return res.json(isOk.data);
    }
    catch (error) {
        return error.response.data.error
    }
};

export async function appSaveRepair(req,res) {
    try {
        const { cedula_cliente, modelo, repair_problem } = req.body;
        const refresh_token = req.cookies.refreshToken;
        const auth_token = req.cookies.accessToken;
        console.log("colo",req.cookies)
        await axios.post(`${API_URL}/repair/saveRepair`,
            {
                cedula_cliente,
                modelo,
                repair_problem,
                refresh_token,
                auth_token
            }
        )
        return;
    }
    catch (error) {
        console.log(error.response.data.message);
        return error.response.data.message;
    }
};

async function appGetUserRepairList(req, res) {
    try {
        const refresh_token = req.cookies.refresh_token;
        const auth_token = req.cookies.auth_token;
        const list = await axios.get(`${API_URL}/repair/getUsersRepair`,
            {
                auth_token,
                refresh_token
            }
        );
        return list.data;
    }
    catch (error) {
        return alert(error.response.data.message)
    }

}

export default {
    getRepairList,
    appUpdateHead,
    appGetUserRepairList,
    appSaveRepair

}