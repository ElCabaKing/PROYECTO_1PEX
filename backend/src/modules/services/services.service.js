import { AppError } from '../../utils/AppError.js';
import servicesModel from './services.model.js'

export const servicesService = {
    async getServicesList({ numIndex }) {
        const intIndex = (Number(numIndex) * 10) - 10;
        const servicesList = await servicesModel.getServicesList({ numIndex: intIndex });
        return { servicesList };
    },

    async getServiceListbyName({ numIndex, servName }) {
        if (!numIndex || !servName) { throw new AppError("No se proporciono los datos necesarios", 400) }
        const IntIndex = (Number(numIndex) * 10) - 10;
        const data = await servicesModel.getServiceByName({ listIndex: IntIndex, serviceName: servName });
        return { servicesList: data.servicesList, maxIndex: data.maxIndex };
    },

    async createNewService({ service, vpe }) {
        if (!service || !vpe) { throw new AppError("No se proporciono los datos necesarios", 400) }

        try {
            await servicesModel.createNewService({ service, vpe });
            return { message: "Guardado" };
        }

        catch (error) {
            throw new AppError("Error en createNewService", 500, "CREATE");
        }


    }
}