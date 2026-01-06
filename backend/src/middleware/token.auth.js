import jwt from "jsonwebtoken";

const createToken = (payload, expiresIn) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });


export const tokenAuthNx = (req, res, next) => {
    console.log("middle",req.body)
   const {auth_token,refresh_token} = req.body;

    if (!auth_token && !refresh_token) {
        return res.status(401).json({ validation: false,message: "No autenticado" });
    }

    if (!auth_token && refresh_token) {
        try {
            const decode = jwt.verify(refresh_token, process.env.JWT_SECRET_REFRESH);
            const payload = { id: decode.id, user_nombre: decode.user_nombre, rol: decode.rol }
            const newToken = createToken(payload,"15m")
            const newRefreshToken = createToken(payload,"4h");
            return next();
        }
        catch (error) {
            return res.status(401).json({ validation: false, message: "Token no valido"})
        }
    }
    try {
        const decode = jwt.verify(auth_token, process.env.JWT_SECRET);
        console.log("sale next")
        return next();
    }
    catch (error) {
        return res.status(401).json({ validation: false, message: "Token expirado o invalido"})
    }
}



export default {
    tokenAuthNx
}