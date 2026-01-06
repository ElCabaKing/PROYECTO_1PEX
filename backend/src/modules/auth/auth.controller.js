import { authService } from "./auth.service.js";

export const authToken = async (req,res,next) => {
    try{
    const {accessToken, refreshToken} = req.body;
    const {newAccessToken , newRefreshToken} = await authService.refreshToken({accessToken,refreshToken});

    return res.status(200).json({accessToken: newAccessToken,refreshToken: newRefreshToken, validation: true})
    }
    catch(error){
        next(error);
    }
} ;

export default {
    authToken,
}