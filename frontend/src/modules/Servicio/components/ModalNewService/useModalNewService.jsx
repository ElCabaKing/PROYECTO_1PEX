import { useState } from "react";
import { createNewService } from "../../services/services.api";
export default function useModalNewService() {
    const [serviceName, setServiceName] = useState("");
    const [vpe, setVpe] = useState(0);

    async function sendNewService() {
        await createNewService({serviceName, vpe});
        return;
    }

    return {
        serviceName,
        setServiceName,
        vpe,
        setVpe,
        sendNewService
    }
}