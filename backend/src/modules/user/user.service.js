import bcrypt from 'bcrypt'
import { AppError } from '../../utils/AppError.js';
import modelUser from './user.model.js'
const saltRounds = 10
export const userService = {

    async createSecurityCode({ ans, user_password, user_name }) {
        if (!ans || !user_password || !user_name) {
            throw new AppError("No se proporciono los datos necesarios", 400)
        };
        const SecurityCode = await bcrypt.hash(ans, saltRounds);
        const user_passwordhs = await bcrypt.hash(user_password, saltRounds);
        await modelUser.updateSecurityCode({
            user_name,
            SecurityCode,
            user_passwordhs
        });
        return { update: true }
    },

    async createUser({ user_name, user_role, apellido, nombre }) {
        if (!user_name || !user_role || !apellido || !nombre) {
            throw new AppError("No se proporciono los datos necesarios", 400);
        };
        const firstPass = await bcrypt.hash(user_name, saltRounds);
        console.log(firstPass);
        await modelUser.createNewUser({ user_name, apellido, nombre, user_role, firstPass });

        return { response: "Usuario guardado correctamente" }
    },

    async getUserList({ user_name, index_number }) {
        console.log(user_name, index_number)
        if (!user_name || !index_number) {
            throw new AppError("No se proporciono los datos necesarios", 400);
        };
        const maxIndex = await modelUser.getUserIndex();
        const index_int = ((Number(index_number) - 1) * 10);
        const user_list = await modelUser.getUserList({ user_name: user_name, number_index: index_int });

        return { listData: user_list, maxIndex: maxIndex }
    },

    async updateUserRol({ ID, rol_id }) {
        if (!ID || !rol_id) {
            throw new AppError("No se proporciono los datos necesarios", 400)
        };
        await modelUser.updateUserRol({ ID, rol_id });

        return { response: "Rol cambiado exitosamente" }
    },

    async updateUserStatus({ ID, estado }) {
        if (!ID || estado === undefined) { throw new AppError("No se proporciono los datos necesarios", 400); };
        await modelUser.updateUserStatus({ ID, estado });
        return { response: "Estado actualizado" };
    },
}