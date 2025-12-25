import jwt from 'jsonwebtoken'
import { AppError } from './AppError.js';
export default function JwtGenerator(payload, time, type) {
    if(!payload || !type){throw new AppError("No se proporciono datos para JWT",500)}
    let secret;
    switch (type) {
        case "access":
            secret = process.env.JWT_SECRET;
            break;
        case "refresh":
            secret = process.env.JWT_SECRET_REFRESH;
    }

    return jwt.sign(payload, secret, { expiresIn: time });
}