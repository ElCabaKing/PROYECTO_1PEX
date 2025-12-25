import { servicesService } from "./services.service.js"


export const getServicesList = async (req, res, next) => {
    try {
        const {numIndex} = req.query;
        const { servicesList } = await servicesService.getServicesList({numIndex});

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
};

export const getServiceListbyName = async (req, res, next) => {
    try{
        const {numIndex,serviceName} = req.query;

        const {servicesList,maxIndex} = await servicesService.getServiceListbyName({numIndex: numIndex,servName: serviceName});
        return res.status(200).json({servicesList,maxIndex})
    }
    catch(error){
        next(error)
    }
}

export default {
    createNewService,
    
    getServicesList,
    getServiceListbyName,
}