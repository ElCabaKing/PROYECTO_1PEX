import { userService } from "./user.service.js";

//Create
export const createSecurityCode = async (req, res, next) => {
    try {
        const { ans, user_password, user_name } = req.body;

        const { update } = await userService.createSecurityCode({ ans, user_password, user_name });

        return res.status(200).json(update)
    }
    catch (error) {
        next(error)
    }
};

export const createUser = async (req, res, next) => {
    try {
        const { user_name, user_role, apellido, nombre } = req.body;

        const { response } = await userService.createUser({ user_name, user_role, apellido, nombre });

        return res.status(201).json(response);
    }
    catch (error) {
        next(error)
    };
};
//Get
export const getUserList = async (req, res, next) => {
    try {
        const { user_name, index_number } = req.query;

        const { listData, maxIndex } = await userService.getUserList({ user_name, index_number });

        return res.status(200).json({ listData: listData, maxIndex: maxIndex });
    }
    catch (error) {
        next(error);
    };
};
//Update
export const updateUserRol = async (req, res, next) => {
    try {
        const { ID, rol_id } = req.body;

        const { response } = await userService.updateUserRol({ ID, rol_id })

        return res.json({ message: response });
    }
    catch (error) {
        next(error)
    };
};

export const updateUserStatus = async (req, res, next) => {
    try {
        const { ID, estado } = req.body;
        
        const {response} = await userService.updateUserStatus({ID, estado});

        return res.status(200).json({message: response});
    }
    catch (error) {
        next(error);
    }
};



export default {
    createSecurityCode,
    createUser,
    getUserList,
    updateUserRol,
    updateUserStatus
};