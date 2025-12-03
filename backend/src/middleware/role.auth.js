import jwt from "jsonwebtoken";
export const tokenRoleAuthNx = (roles = []) => {
    return (req, res, next) => {
        const token = req.cookies.auth_token;
        if (!token) {
            return res.status(401).json({ message: "No hay o no se envió token" });
        }
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            const tieneRol = roles.some(role => decodedToken.roles.includes(role));
            if (!tieneRol) {
                return res.status(403).json({ message: "No tienes permiso hacer eso" });
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
        console.log(req.cookies)
        const token = req.cookies.auth_token;
        const refresh_token = req.cookies.refresh_token;
        if (!token && !refresh_token) {
            return res.json({ validation: false });
        }
        if (!token && refresh_token) {
            try {
                const decode = jwt.verify(refresh_token, process.env.JWT_SECRET);
                const tieneRol = roles.some(role => decode.roles.includes(role));
                console.log("tiene", tieneRol)
                if (!tieneRol) {
                    return res.json({ validation: false });
                }
                return res.json({ validation: true });
            }
            catch (error) {
                return res.json({ validation: false });
            }
        }
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            const tieneRol = roles.some(role => decode.roles.includes(role));
            console.log("tiene", tieneRol)
            if (!tieneRol) {
                return res.json({ validation: false });
            }
            return res.json({ validation: true });
        }
        catch (error) {
            return res.json({ validation: false });
        }
    };
};


export default {
    tokenRoleAuth,
}