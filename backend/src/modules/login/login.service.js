import { AppError } from "../../utils/AppError.js";
import JwtGenerator from "../../utils/JwtGenerator.js";
import loginModel from "./login.model.js";
import bcrypt from 'bcrypt';

export const loginService = {

    validateData({ user_nombre, user_password }) {
        if (!user_nombre && !user_password) {
            throw new AppError("No se proporciono los datos necesatios", 400, "LOGIN");
        }
        return;
    },

    async login({ user_nombre, user_password }) {
        this.validateData({ user_nombre, user_password });
        const user = await loginModel.getUserByUsername({ username: user_nombre });
        if (!user || user.estado !== 1) { throw new AppError("Credenciales invalidas", 401, "LOGIN") };

        const validPassword = await bcrypt.compare(user_password, user.user_password);
        if (!validPassword) {
            throw new AppError("Credenciales erroneas", 401, "LOGIN");
        };

        const userPermissions = await loginModel.getUserPermissions({ user_id: user.id });

        const rol = await loginModel.getUserRoles({ user_id: user.id });

        const payload = {
            id: user.id,
            user_nombre,
            rol: rol.rol_nombre,
        };


        const accessToken = JwtGenerator(payload, "15m");
        const refreshToken = JwtGenerator(payload, "4h");

        return {
            accessToken: accessToken,
            refreshToken: refreshToken,
            userPermissions: userPermissions,
            rol: rol,
            user: user,
        }
    }

}
