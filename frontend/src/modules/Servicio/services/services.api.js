

import axios from "axios";
import { API_URL } from "../../../utils/api";

export async function getServiceList({ numIndex }) {
    try {
        const serviceList = await axios.get(`${API_URL}/services/getServicesList`,
            {
                params: {
                    numIndex
                }
            }
        );
        return serviceList.data;
    }
    catch (error) {
        return alert(error);
    };
}

export async function createNewService({ serviceName, vpe }) {
    try {
        await axios.post(`${API_URL}/services/createNewService`,
            {
                service: serviceName,
                vpe
            }
        )
        return;
    }
    catch (error) {
        return alert(error);
    }
};
export async function getServiceybyName({ numIndex, serviceName }) {
    try {
        const partList = await axios.get(`${API_URL}/services/getServicesListbyName`,
            {
                params: {
                    numIndex,
                    serviceName
                }
            }
        )

        return partList.data;
    }
    catch (error) {
        return alert(error);
    }
}