import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { appGetRepairClient } from "../api/home.api"
export default function useHome(){
    const navigate = useNavigate()
    const [codeNumber, setCodeNumber] = useState("");
    const [repairModalData, setRepairModalData] = useState([]);
    const [showModal, setShowModal] = useState(false)
    async function hkSearchCode(repair_id) {
        const repairData = await appGetRepairClient(repair_id);
        setRepairModalData(repairData);
        setShowModal(true)
    }
    return {
        setCodeNumber,
        hkSearchCode,
        codeNumber,
        repairModalData,
        showModal,
        setShowModal
    }
}

