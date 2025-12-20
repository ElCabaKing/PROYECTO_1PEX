import axios from "axios";
import { API_URL } from "../../../utils/api";

export async function appSaveRepairDetail(repair_id,detalle,valor) {
    await axios.post(`${API_URL}/repair/saveRepairDetail`,
        {
            repair_id,
            detalle,
            valor
        },
        {withCredentials: true}
    );
    return;
}