
import recoveryModel from "../model/recovery.model.js";
import bcrypt from "bcrypt"
const saltRounds = 10;
export const getSecurityCode = async (req, res) => {
    try {
        const { userName, securityCode } = req.body;
        const userSecurityCoded = await recoveryModel.getSecurityCode(userName);
        if (!userSecurityCoded) { return res.status(404).json({ response: "Usuario no encontrado o nunca a iniciado sesion" }) }
        if (!(await bcrypt.compare(securityCode, userSecurityCoded.security_code))) { return res.status(401).json({ response: "Codigo o Usario erroneo" }) };
        return res.status(200).json({ isCorrect: true });
    }
    catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

export const updateUserPassword = async (req, res) => {
    try {
        const { userName, newPassword } = req.body;
        const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);
        await recoveryModel.updateUserPassword(userName, newPasswordHash);
        return res.status(200).json({ response: "Cambio exitoso" });
    }
    catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

export default {
    getSecurityCode,
    updateUserPassword
}