import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { appGetRepairClient } from "../api/home.api"
export default function useHome(){
    const navigate = useNavigate()
    const [codeNumber, setCodeNumber] = useState("");
    const [repairModalData, setRepairModalData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showError, setShowError] = useState(false);
    const [message, setMessage] = useState("")
    async function searchCode(repair_id) {
        const repairData = await appGetRepairClient(repair_id);
        console.log(repairData)
        if(repairData.nonExistense){
            setShowError(true);
            setMessage(repairData.error);
            return;
        }
        setRepairModalData(repairData);
        setShowModal(true)

    }
    return {
        setCodeNumber,
        searchCode,
        codeNumber,
        repairModalData,
        showModal,
        setShowModal,
        message,
        showError
    }
}

