import { AppError } from "../../utils/AppError.js";
import { partService } from "../parts/parts.service.js";
import repairModel from "./repair.model.js";
import jwt from 'jsonwebtoken';

export const repairService = {

    decodeToken(token) {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        return decodedToken;
    },

    async createNewRepair({ cedula_cliente, modelo, repair_problem }) {

        if (!cedula_cliente || !modelo || !repair_problem) {
            throw new AppError("No se proporciono los datos necesarios", 400)
        };
        await repairModel.createNewRepair({
            cedula_cliente, modelo, repair_problem
        });
        return { message: "Guardado" }
    },

    async getToWorkList() {
        try {
            const toWorkList = await repairModel.getRepairOnWork();
            return toWorkList;
        }
        catch (error) {
            throw new AppError("Error en getToWorkList");
        }
    },

    async updateHead({ token, new_status, repair_id }) {
        if(!token || !new_status || !repair_id){throw new AppError("No se proporciono los datos necesariosd",400)}
        const decodedToken = this.decodeToken(token);

        switch (new_status) {
            case 2:
                const reg = await repairModel.getRepairCountById({ user_id: decodedToken.id });
                console.log(reg)
                if (reg[0].total >= 5) {
                    throw new AppError("Hijo de la semilla completa un trabajo", 400)
                }

                await repairModel.updateRepairHeader(
                    {
                        user_id: decodedToken.id,
                        new_status: new_status,
                        repair_id: repair_id,
                        service_id: 1
                    }
                );

                return {
                    response: "Reparación aceptada correctamente",
                    alert: `El usuario ${decodedToken.user_nombre} ha aceptado el pedido ${repair_id}`,
                };
                break;
            case 3:
                await repairModel.updateRepairHeader(
                    {
                        user_id: decodedToken.id,
                        new_status: new_status,
                        repair_id: repair_id,
                        service_id: 2
                    }
                );

                return {
                    response: "Repracion concluida",
                    alert: `El usuario ${decodedToken.user_nombre} ha terminado el pedido ${repair_id}`
                };
                break;
            case 4:
                await repairModel.updateRepairHeader(
                    {
                        user_id: decodedToken.id,
                        new_status: new_status,
                        repair_id: repair_id,
                        service_id: 3
                    }
                );

                return {
                    response: "El dispositivo fue entregado",
                    alert: `Se ha entregado el pedido ${repair_id}`
                };
                break;

        }

    },

    async getUsersRepair({ refresh_token, auth_token }) {
        if (!refresh_token && !auth_token) { throw new AppError("No se proporciono los datos necesarios", 400) }
        const token = auth_token || refresh_token;
        const decodenToken = this.decodeToken(token);
        const repair_list = await repairModel.getUsersRepair({ user_id: decodenToken.id });
        return { repair_list: repair_list };
    },

    async getRepairData({ refresh_token, auth_token, repair_id }) {
        if (!refresh_token || !auth_token || !repair_id) {
            throw new AppError("No se proporciono los datos necesarios", 400);
        };
        let token = auth_token || refresh_token;
        const decodedToken = this.decodeToken(token);
        const repair_user_id = await repairModel.getRepairUserId({ repair_id });
        const repair_data = await repairModel.getRepairDetailsById({ repair_id });

        return {
            repair_data: repair_data,
            isUser: repair_user_id === decodedToken.id,
        }

    },

    async createNewRepairDetail({ repair_id, type, Sv_RpId, units }) {
        if (!repair_id || !type || !Sv_RpId) {
            throw new AppError("No se proporciono los datos necesarios", 400)
        };
        switch (type) {
            case "SERVICIO":
                console.log(type)
                await repairModel.createNewRepairDetailService({ repair_id: repair_id, service_id: Sv_RpId });
                break;
            case "PARTE":
                if (!Sv_RpId || !units) { throw new AppError("No se envio datos", 400) }
                await repairModel.createNewRepairDetailPart({ repair_id: repair_id, part_id: Sv_RpId, units: units });
                await partService.updateStock({ newStock: units, type: "-", partId: Sv_RpId })
                break;
        }

        return { message: "Detalle creado correctamente" };
    },

    async getRepairDataClient({ repair_id }) {
        if (!repair_id) { throw new AppError("No se proporciono los datos necesarios", 400) }
        const repair_data = await repairModel.getRepairHeader({ repair_id });
        if (!repair_data.id) { throw new AppError("Registro no encontrado", 404, "REGISTRO") }
        return { repair_data: repair_data }
    },

    async getHistoryList({ index_num }) {
        if (!index_num) { throw new AppError("No se proporciono un index", 400) }
        const search_number = (index_num - 1) * 10
        const historyList = await repairModel.getHistoryList({ search_number });
        if (!historyList) { throw new AppError("No se encontro registro", 404, "REGISTRO") };
        return { historyList: historyList };
    }
} 