import axios from "axios";
import { API_URL } from "../../utils/url.js";
import { cookieGenerator } from "../../utils/cookieGenerator.js";

async function logIn(req, res) {
    const isLoged = await axios.post(`${API_URL}/login`, req.body);
     await cookieGenerator(res,"accessToken",isLoged.data.accessToken);
     await cookieGenerator(res,"refreshToken",isLoged.data.refreshToken);
    return res.json(isLoged.data);
}



export default { logIn };