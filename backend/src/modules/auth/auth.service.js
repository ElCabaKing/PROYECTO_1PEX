import jwt from 'jsonwebtoken'
import {AppError} from '../../utils/AppError.js'
import JwtGenerator from '../../utils/JwtGenerator.js';
export const authService = {

    validateAccessToken({accessToken}){
        try{
            return jwt.verify(accessToken,process.env.JWT_SECRET);
        }
        catch(error){
            return null;
        }
    },

    validateRefreshToken({refreshToken}){
        try{
            return jwt.verify(refreshToken,process.env.JWT_SECRET_REFRESH);
        }
        catch(error){
            return null;
        }
    },

    async refreshToken({accessToken,refreshToken}){
        const accessData = this.validateAccessToken({accessToken});

        const refreshData = this.validateRefreshToken({refreshToken});

        if(!refreshData){
            throw new AppError("Refresh Token invalido",401);
        }
    
        const payload = {
            id: refreshData.id,
            user_nombre: refreshData.user_nombre,
            rol: refreshData.rol
        };

        const newAccessToken = JwtGenerator(payload,"15m","access");
        const newRefreshToken = JwtGenerator(payload,"4h","refresh");

        return{
           newAccessToken: newAccessToken,
           newRefreshToken: newRefreshToken
        }
    }
}