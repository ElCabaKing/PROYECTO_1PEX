import axios from "axios";
import { API_URL } from "../../../utils/api";

export async function getPartsList({ numIndex }) {
    try {
        const partList = await axios.get(`${API_URL}/parts/getPart`,
            {
                params: {
                    numIndex
                }
            }
        );

        return partList.data;
    }
    catch (error) {
        return alert(error);
    };
}

export async function createNewPart({ partName, baseStock, pve }) {
    try {
        await axios.post(`${API_URL}/parts/saveNewPart`,
            {
                partName,
                baseStock,
                pve
            }
        )
        return;
    }
    catch (error) {
        return alert(error);
    }
}

export async function getPartbyName({numIndex,partName}) {
    try{
        const partList = await axios.get(`${API_URL}/parts/getPartbyName`,
            {
                params: {
                    numIndex,
                    partName
                }
            }
        )

        return partList.data;
    }
    catch(error){
        return alert(error);
    }
    
}