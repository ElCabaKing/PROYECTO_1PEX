import { AppError } from "../../utils/AppError.js";
import recoveryModel from "./recovery.model.js";
import bcrypt from 'bcrypt';

const saltRounds = 10
export const recoveryService = {
    async getSecurityCode({ userName, securityCode }) {
        if (!userName || !securityCode) { throw new AppError("No se proporciono los datos necesarios", 400) }
        const userSecurityCoded = await recoveryModel.getSecurityCode({userName});
        if (!userSecurityCoded) { throw new AppError("No se encontro el usuaio o nunca a iniciado sesion", 404) }
        if (!(await bcrypt.compare(securityCode, userSecurityCoded))) { throw new AppError("Usuario o Codigo no validos", 403) };

        return {
            isCorrect: true
        }
    },

    async updateUserPassword({userName, newPassword }) {
        if(!userName, !newPassword){throw new AppError("No se proporciono los datos necesarios",400)}
        const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);
        await recoveryModel.updateUserPassword({userName, newPasswordHash});
        return {
            response: "Cambio existoso"
        }
    }
}