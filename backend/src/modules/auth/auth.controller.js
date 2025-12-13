import { authService } from "./auth.service.js";
import CookieGenerator from "../../utils/CookieGenerator.js";

export const authToken = async (req,res,next) => {
    try{
    const accessToken = req.cookies.auth_token;
    const refreshToken = req.cookies.refresh_token;
    const {newAccesToken , newRefreshToken} = await authService.refreshToken({accessToken,refreshToken})
    CookieGenerator(res,"auth_token",newAccesToken,15 * 60 * 1000);
    CookieGenerator(res,"refresh_token",newRefreshToken,4 * 60 * 60 * 1000);
    return res.status(200).json({validate: true})
    }
    catch(error){
        next(error);
    }
} ;

export default {
    authToken,
}