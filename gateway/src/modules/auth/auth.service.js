import axios from "axios";
import { API_URL } from "../../utils/url.js";

async function authUser(req, res) {
    console.log("authUser");
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;
    console.log("cooki",req.cookies);
    console.log(refreshToken);
    const isValid = await axios.post(`${API_URL}/authUserV`, {
        accessToken,
        refreshToken
    },
        {
            withCredentials: true
        });
    console.log(isValid.data);
    return res.json(isValid.data);

}



export default { authUser };