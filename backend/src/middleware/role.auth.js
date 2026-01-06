import jwt from "jsonwebtoken";
export const tokenRoleAuthNx = (roles = []) => {
    return (req, res, next) => {
        const {auth_token} = req.body;
        if (!auth_token) {
            return res.status(401).json({ message: "No hay o no se envió token, Recarga la pagina" });
        }
        try {
            const decodedToken = jwt.verify(auth_token, process.env.JWT_SECRET);
            const tieneRol = roles.includes(decodedToken.rol)
            if (!tieneRol) {
                return res.status(403).json({ message: "No tienes permiso para hacer eso" });
            }
            next();
        }
        catch (error) {
            return res.status(402).json({ message: "Token no válido" });
        }
    };
};

export const tokenRoleAuth = (roles = []) => {
    return (req, res) => {
        console("esta 2")
        const {auth_token,refresh_token} = req.body;
        if (!auth_token && !refresh_token) {
            return res.status(401).json({ validation: false });
        }
        if (!auth_token && refresh_token) {
            try {
                const decode = jwt.verify(refresh_token, process.env.JWT_SECRET_REFRESH);
                const tieneRol = roles.includes(decode.rol);
                if (!tieneRol) {
                    return res.status(401).json({ validation: false, message: "No tienes permisos" });
                }
                return res.status(200).json({ validation: true, message: "Verificacion Exitosa" });
            }
            catch (error) {
                return res.status(401).json({ validation: false, message: "Token invalido" });
            }
        }
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            const tieneRol = roles.includes(decode.rol);
            if (!tieneRol) {
                return res.status(401).json({ validation: false, message: "No tienes permisos" });
            }
            return res.status(200).json({ validation: true, message: "Verificacion Exitosa" });
        }
        catch (error) {
            return res.status(401).json({ validation: false, message: "Token invalido" });
        }
    };
};


export default {
    tokenRoleAuth,
}