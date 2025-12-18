import { appGetRapairList, appGetUserRepairList, appSaveRepair, appUpdateHead } from "../api/repair.api";
import { useState } from "react";
export default function useRepair() {
    const [repairList, setRepairList] = useState([]);
    const [showModalRepair, setShowModalRepair] = useState(false);
    const [cedula_cliente, setCedula_cliente] = useState("");
    const [modelo, setModelo] = useState("");
    const [repair_problem, setRepair_problem] = useState("");
    const [userRepairList, setUserRepairList] = useState([]);


    async function getList() {
        const list = await appGetRapairList();
        setRepairList(list);
    }

    async function updateHead(id, new_status) {
        await appUpdateHead(id, new_status);
        getList();
    }

    async function saveRepair() {
        await appSaveRepair(cedula_cliente, modelo, repair_problem);
        setShowModalRepair(false)

    }

    async function getUserRepairList() {
        const list = await appGetUserRepairList();
        setUserRepairList(list);
    }


    return {
        repairList,
        getList,
        updateHead,
        showModalRepair,
        setShowModalRepair,
        saveRepair,
        setCedula_cliente,
        setModelo,
        setRepair_problem,
        cedula_cliente,
        modelo,
        repair_problem,
        getUserRepairList,
        userRepairList
    }
}