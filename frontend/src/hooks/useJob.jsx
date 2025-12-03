import { appGetRepairHead_Details } from "../api/repair.api";
import { useState } from "react";
export default function useJob(){
    const [header, setHeader] = useState([]);
    const [jobBody, setJobBody] = useState([]);
    async function hkgetJob(repair_id){
        const data_job = await appGetRepairHead_Details(repair_id);
        console.log(data_job);
    }

    return {
        hkgetJob
    }

}