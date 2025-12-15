import jwt from "jsonwebtoken";

const createToken = (payload, expiresIn) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });

const setCookie = (res, name, value, maxAge) => {
  res.cookie(name, value, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge,
  });
};

export const tokenAuthNx = (req, res, next) => {
    const token = req.cookies.auth_token;
    const refresh_token = req.cookies.refresh_token;

    if (!token && !refresh_token) {
        return res.status(401).json({ validation: false,message: "No autenticado" });
    }

    if (!token && refresh_token) {
        try {
            const decode = jwt.verify(refresh_token, process.env.JWT_SECRET);
            const payload = { id: decode.id, user_nombre: decode.user_nombre, rol: decode.rol }
            const newToken = createToken(payload,"15m")
            const newRefreshToken = createToken(payload,"4h");
            setCookie(res,"auth_token",newToken,15 * 60 * 1000)
            setCookie(res,"refresh_token",newRefreshToken, 4 * 60 * 60 * 1000);
            return next();
        }
        catch (error) {
            return res.status(401).json({ validation: false, message: "Token no valido"})
        }
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        return next();
    }
    catch (error) {
        return res.status(401).json({ validation: false, message: "Token expirado o invalido"})
    }
}



export default {
    tokenAuthNx
}