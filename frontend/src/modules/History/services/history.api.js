import axios from "axios";
import { API_URL } from "../../../utils/api";
export async function appGetHistoryList({index_num}) {
    try {
        const historyList = await axios.get(`${API_URL}/repair/getHistoryList`,
            {
                params: {
                    index_num
                }
            }
        )
        return historyList.data
    }
    catch (error) {

        if (error.response.status === 404) { return error.response.data }
        return alert(error.response.data.response)
    }

} 