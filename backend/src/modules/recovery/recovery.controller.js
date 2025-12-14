import { recoveryService } from "./recovery.service.js";

const saltRounds = 10;
export const getSecurityCode = async (req, res, next) => {
    try {
        const { userName, securityCode } = req.body;
        
        const {isCorrect} = await recoveryService.getSecurityCode({userName, securityCode});

        return res.status(200).json({isCorrect: isCorrect});
    }
    catch (error) {
        next(error);
    }
}

export const updateUserPassword = async (req, res, next) => {
    try {
        const { userName, newPassword } = req.body;
        const {response} = await recoveryService.updateUserPassword({userName, newPassword});

        return res.status(200).json({response: response});
    }
    catch (error) {
        next(error)
    }
}

export default {
    getSecurityCode,
    updateUserPassword
}