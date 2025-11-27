import jwt from 'jsonwebtoken';
import modelLogin from "../model/login.model.js";
import bcrypt from 'bcrypt';
import { emitLoginToAdmins } from "../socket.js";
export const ctLogin = async (req, res) => {
    const saltRounds = 10;
    try {
        const user_id_password = await modelLogin.mdLogin(req.body.user_nombre);
        console.log(user_id_password);
        console.log("security_code:", user_id_password.security_code);
        if (!user_id_password) { return res.json({ login: false }) }
        const valid = await bcrypt.compare(req.body.user_password, user_id_password.user_password);
        if (valid) {
            const roles = await modelLogin.mdUserRolesData(user_id_password.id)
            const userRoles = roles.map(r => r.rol_nombre);
            const payload = { id: user_id_password.id, user_nombre: req.body.user_nombre, roles: userRoles }
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "15m" });
            const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "4h" });
            res.cookie("auth_token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                path: "/",
                maxAge: 15 * 60 * 1000
            });
            res.cookie("refresh_token", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                path: "/",
                maxAge: 4 * 60 * 60 * 1000
            })
            const permisos = await modelLogin.mdUserDateLog(user_id_password.id);
            emitLoginToAdmins(req.body.user_nombre)
            return res.json({ login: true, permisos: permisos,firs_time: user_id_password.security_code ? false : true });

        }
        else {
            return res.json({ login: false })
        }
    }
    catch (error) {
        res.status(505).json({ message: "Error al obtener los datos", error: error.message });
    }
}
export const ctLogOut = async (req, res) => {
    res.clearCookie("auth_token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
    })
    res.clearCookie("refresh_token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
    })
    res.json({logout: true})
}
export default {
    ctLogin,
    ctLogOut
}