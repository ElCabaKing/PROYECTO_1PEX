import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode"
export const tokenRoleAuthNx = (roles = []) => {
    return (req, res, next) => {
        const token = req.cookies.auth_token;
        if (!token) {
            return res.status(401).json({ message: "No hay o no se envió token" });
        }
        try {
            jwt.verify(token, process.env.JWT_SECRET);
            const decodedToken = jwtDecode(token);
            const tieneRol = roles.some(role => decodedToken.roles.includes(role));
            if (!tieneRol) {
                return res.status(403).json({ message: "No tienes permiso para acceder" });
            }
            next();
        }
        catch (error) {
            return res.status(402).json({ message: "Token no válido" });
        }
    };
};

export const tokenRoleAuth = (roles = []) => {
    return (req, res, next) => {
        const token = req.cookies.auth_token;
        if (!token) {
            return res.status(401).json({ message: "No hay o no se envió token" });
        }
        try {
            jwt.verify(token, process.env.JWT_SECRET);
            const decodedToken = jwtDecode(token);
            const userRoles = (decodedToken.roles).map(r => r.rol_nombre);
            const tieneRol = roles.some(role => decodedToken.roles.includes(role));
            console.log("tiene", tieneRol)
            if (!tieneRol) {
                return res.status(403).json({ message: "No tienes permiso para acceder" });
            }
            return res.json({ validation: true });
        }
        catch (error) {
            return res.status(402).json({ message: "Token no válido" });
        }
    };
};


export default {
    tokenRoleAuth,
}