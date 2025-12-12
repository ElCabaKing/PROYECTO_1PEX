import bcrypt from 'bcrypt';
import modelUser from "../model/user.model.js"
const saltRounds = 10;
export const createSecurityCode = async (req, res) => {
    try {
        const { ans, user_password, user_name } = req.body;
        const Sk_ans = await bcrypt.hash(ans, saltRounds);
        const user_passwordhs = await bcrypt.hash(user_password, saltRounds);
        await modelUser.updateSecurityCode({ user_name, Sk_ans, user_passwordhs });
        return res.status(200).json({ updated: true });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const validateSecurityCode = async (req, res) => {
    try {
        const { user_name, user_ans } = req.body;
        if (!user_name || !user_ans) { return res.status(400).json({ validate: false, message: "No hay credenciales" }) };
        const ans = await modelUser.getSecurityCode({ user_name });
        const validated = await bcrypt.compare(user_ans, ans.security_code);
        if (!validated) { return res.json({ validate: false, message: "Datos erroneos" }); };

        return res.json({ validate: true, message: "Validacion completada correctamente" });
    }
    catch (error) {
        return res.status(500).json({ validate: false, error: error.message });
    };
};

export const createUser = async (req, res) => {
    try {
        const { user_name, user_role, apellido, nombre } = req.body;
        if (!user_name || !user_role || !apellido || !nombre) { return res.status(400).json({ created: false, message: "Favor proporcionar todos los datos" }) };
        const firstPass = await bcrypt.hash(user_name, saltRounds);
        await modelUser.createNewUser({ user_name, apellido, nombre, user_role, firstPass });
        return res.status(201).json({ response: "Usuario guardado correctamente" });
    }
    catch (error) {
        return res.status(500).json({ error: error.message, response: "Algo salio mal, revisar los datos" });
    };
};

export const getUserList = async (req, res) => {
    try {
        const { user_name, index_number } = req.query;
        if (!user_name || !index_number) { return res.status(400).json({ ok: false, message: "No se proporciono los datos requeridos" }) };
        const maxIndex = await modelUser.getUserIndex();
        const index_int = Number(index_number);
        const user_list = await modelUser.getUserList({ user_name, index_int });
        return res.status(200).json({ listData: user_list, maxIndex: maxIndex });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    };
};

export const updateUserRol = async (req, res) => {
    try {
        const { ID, rol_id } = req.body;
        if (!ID || !rol_id) { return res.status(400).json({ message: "No se proporciono los datos necesarios" }) };
        await modelUser.updateUserRol({ ID, rol_id });
        return res.json({ message: "Rol cambiado exitosamente" });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    };
};

export const updateUserStatus = async (req, res) => {
    try {
        const { ID, estado } = req.body;
        if (!ID || !estado) { return res.status(400).json({ message: "No se proporciono los datos necesarios" }) };
        await modelUser.mdChangeStatus({ ID, estado });
        return res.json({ message: "Estado actualizado" });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export default {
    createSecurityCode,
    validateSecurityCode,
    createUser,
    getUserList,
    updateUserRol,
    updateUserStatus
}