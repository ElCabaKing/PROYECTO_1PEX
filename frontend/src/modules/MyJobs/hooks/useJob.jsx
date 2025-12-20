import { appGetRepairHead_Details, appUpdateHead } from "../../RepairJob/services/repair.api";
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


    async function getJob(repair_id) {
        setNoData(false);
        setisUser(false);
        setJobBody([]);
        const data_job = await appGetRepairHead_Details(repair_id);
        console.log(("data", data_job))
        if (data_job.Nonexistent) { navigate("/empty"); return }
        setHeader(data_job.repair_data[0]);
        if (data_job.repair_data[1].length !== 0) {
            setJobBody(data_job.repair_data[1]);
            setisUser(data_job.isUser);
        }
        else {
            setNoData(true)
        }

    }
    async function finishRepair(repair_id) {
        await appUpdateHead(repair_id, 3);
        return;
    }

    return {
        getJob,
        header,
        jobBody,
        noData,
        navigate,
        isUser,
        refetch,
        setRefetch,
        showModalDetail,
        setShowModalDetail,
        finishRepair
    }

}