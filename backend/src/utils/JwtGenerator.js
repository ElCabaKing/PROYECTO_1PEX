import jwt from 'jsonwebtoken'
export default function JwtGenerator(payload,time){
    const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn: time});
    return token;
}