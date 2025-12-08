import { appGetRepairHead_Details, appUpdateHead } from "../api/repair.api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function useJob() {
    const [header, setHeader] = useState([]);
    const [jobBody, setJobBody] = useState([]);
    const [noData, setNoData] = useState(false);
    const [isUser, setisUser] = useState(false);
    const [refetch, setRefetch] = useState(0);
    const [showModalDetail, setShowModalDetail] = useState(false);
    const navigate = useNavigate();


    async function hkgetJob(repair_id) {
        setNoData(false);
        setisUser(false);
        setJobBody([]);
        const data_job = await appGetRepairHead_Details(repair_id);
        console.log(("data", data_job))
        if (data_job.Nonexistent) { navigate("/empty"); return }
        setHeader(data_job[0][0]);
        console.log(data_job[0][1].length)
        console.log(data_job[0][1].length == 0);
        if (data_job[0][1].length != 0) {
            setJobBody(data_job[0][1]);
            setisUser(data_job[1].isUser);
        }
        else {
            setNoData(true)
        }

    }
    async function hkFinishRepair(repair_id) {
        await appUpdateHead(repair_id, 3);
        return;
    }

    return {
        hkgetJob,
        header,
        jobBody,
        noData,
        navigate,
        isUser,
        refetch,
        setRefetch,
        showModalDetail,
        setShowModalDetail,
        hkFinishRepair
    }

}