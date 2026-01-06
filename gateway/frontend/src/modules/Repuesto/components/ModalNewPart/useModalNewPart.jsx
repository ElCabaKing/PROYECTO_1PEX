import { useState } from "react";
import { createNewPart } from "../../services/parts.api";
export default function useModalNewPart() {
    const [partName, setPartName] = useState("");
    const [baseStock, setBaseStock] = useState(0);
    const [pve, setPve] = useState(0);

    async function sendNewPart() {
        await createNewPart({partName,baseStock,pve});
        return;
    }

    return {
        partName,
        setPartName,
        baseStock,
        setBaseStock,
        pve,
        setPve,
        sendNewPart
    }
}