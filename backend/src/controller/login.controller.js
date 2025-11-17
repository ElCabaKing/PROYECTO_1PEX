import jwt from 'jsonwebtoken'
import modelLogin from "../model/login.model.js";

export const ctLogin = async (req, res) => {
    try {
        const password = await modelLogin.mdLogin(req.body.user_nombre);
        console.log(req.body.user_password , password)
        if (req.body.user_password === password.user_password) {
            const permisos = await modelLogin.mdUserDateLog(password.id);
            res.json({login: true,permisos: permisos})
        }
        else {
            res.json({login: false})
        }
    }
    catch (error) {
        res.status(505).json({ message: "Error al obtener los datos", error: error.message });
    }
}

export default {
    ctLogin
}