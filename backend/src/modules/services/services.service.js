import { AppError } from '../../utils/AppError.js';
import servicesModel from './services.model.js'

export const servicesService = {
    async getServicesList() {
        const servicesList = await servicesModel.getServicesList();
        return { servicesList };
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