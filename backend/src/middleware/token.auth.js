import jwt from "jsonwebtoken";


export const tokenAuthNx = (req, res, next) => {
    const token = req.cookies.auth_token;
    const refresh_token = req.cookies.refresh_token;
    console.log("token",token)
    if (!token && !refresh_token) {
        return res.json({ validation: false });
    }
    if (!token && refresh_token) {
        try {
            const epico = jwt.verify(refresh_token, process.env.JWT_SECRET);
            const payload = { id: epico.id, user_nombre: epico.user_nombre, roles: epico.roles }
            const newToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "15m" });
            const newRefreshToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "4h" });
            res.cookie("auth_token", newToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                path: "/",
                maxAge: 15 * 60 * 1000

            });
            res.cookie("refresh_token", newRefreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                path: "/",
                maxAge: 4 * 60 * 60 * 1000
            })
            return next();
        }
        catch (error) {
            return res.json({ validation: false })
        }
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        return next();
    }
    catch (error) {
        return res.json({ validation: false})
    }
}



export default {
    tokenAuthNx
}