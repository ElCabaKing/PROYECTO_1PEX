import { useState } from "react";
import { appSaveRepairDetail } from "../../services/repairDetails.api.js";


export default function useRepairDetail() {
    const [valor, setValor] = useState(0);
    const [detalle, setDetalle] = useState("");
    

    async function hkSaveRepairDetail(repair_id) {
        console.log(valor,detalle,repair_id)
        await appSaveRepairDetail(repair_id,detalle,valor);
        return;
    }



    return {
        hkSaveRepairDetail,
        valor,
        setValor,
        detalle,
        setDetalle,
    }


}