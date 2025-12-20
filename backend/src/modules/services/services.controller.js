import { servicesService } from "./services.service.js"


export const getServicesList = async (req, res, next) => {
    try {
        const { servicesList } = await servicesService.getServicesList();

        return res.status(200).json(servicesList);
    }
    catch (error) {
        next(error);
    };
}

export const createNewService = async (req, res, next) => {
    try {
        const { service, vpe } = req.body;
        const { message } = await servicesService.createNewService({ service, vpe });

        return res.status(200).json(message);
    }
    catch (error) {
        next(error);
    }
}

export default {
    createNewService,
    
    getServicesList,
}