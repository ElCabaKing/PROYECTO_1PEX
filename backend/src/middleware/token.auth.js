import jwt from "jsonwebtoken";

export const tokenAuth = (req,res,next) => {
    const token = req.cookies.auth_token;
    console.log(token)
    if(!token){
        return res.status(401).json({token:false});
    }
    try{
        jwt.verify(token,process.env.JWT_SECRET);
        return res.json({token: true})
    }
    catch(error){
        return res.status(402).json({token: false})
    }
}

export const tokenAuthNx = (req,res,next) => {
    const token = req.cookies.auth_token;
    console.log(token)
    if(!token){
        return res.status(401).json({message:"No hay o no se envio token"});
    }
    try{
        jwt.verify(token,process.env.JWT_SECRET);
        next();
    }
    catch(error){
        return res.status(402).json({message: "El token no es valido"})
    }
}



export default {
    tokenAuth,
    tokenAuthNx
}