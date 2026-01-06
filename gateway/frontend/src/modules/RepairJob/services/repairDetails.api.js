import axios from "axios";
import { API_URL } from "../../../utils/api";

export async function saveServiceDetail({repair_id,Sv_RpId}) {
    await axios.post(`${API_URL}/repair/saveRepairDetail`,
        {
            repair_id,
            type: "SERVICIO",
            Sv_RpId
        },
        {withCredentials: true}
    );
    return;
}

export async function savePartDetail({repair_id,Sv_RpId,units}) {
        await axios.post(`${API_URL}/repair/saveRepairDetail`,
        {
            repair_id,
            type: "PARTE",
            Sv_RpId,
            units
        },
        {withCredentials: true}
    );
    return;
}