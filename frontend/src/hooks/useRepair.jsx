import { appGetRapairList, appGetUserRepairList, appSaveRepair, appUpdateHead } from "../api/repair.api";
import { useState } from "react";
export default function useRepair() {
    const [repairList, setRepairList] = useState([]);
    const [showModalRepair, setShowModalRepair] = useState(false);
    const [cedula_cliente, setCedula_cliente] = useState("");
    const [modelo, setModelo] = useState("");
    const [repair_problem, setRepair_problem] = useState("");
    const [userRepairList, setUserRepairList] = useState([])

    async function hkGetList() {
        const list = await appGetRapairList();
        console.log(list)
        setRepairList(list);
    }

    async function hkUpdateHead(id, new_status) {
        await appUpdateHead(id, new_status);
        hkGetList();
    }

    async function hkSaveRepair() {
        await appSaveRepair(cedula_cliente, modelo, repair_problem);
        setShowModalRepair(false)

    }

    async function hkGetUserRepairList() {
        const list = await appGetUserRepairList();
        setUserRepairList(list); 
    }


    return {
        repairList,
        hkGetList,
        hkUpdateHead,
        showModalRepair,
        setShowModalRepair,
        hkSaveRepair,
        setCedula_cliente,
        setModelo,
        setRepair_problem,
        cedula_cliente,
        modelo,
        repair_problem,
        hkGetUserRepairList,
        userRepairList
    }
}