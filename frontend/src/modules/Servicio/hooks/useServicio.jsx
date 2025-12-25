import { useState, useEffect } from "react";
import { getServiceList,getServiceybyName } from "../services/services.api";
import { indexList } from "../../../utils/utilFunc";

export default function useServicio() {
    const [serviceList, setServiceList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [index, setIndex] = useState(1);
    const [maxIndex, setMaxIndex] = useState([]);
    const [serviceName, setServiceName] = useState("")

    async function getServiceListFunc() {
        const data = await getServiceList({ numIndex: index });

        setServiceList(data.servicesList);
        setMaxIndex(indexList(data.maxIndex).filter(n => n !== 0));

        return;
    }

    async function getServiceListbyNameFunc() {
        const data = await getServiceybyName({ numIndex: index,serviceName: serviceName });
        setServiceList(data.servicesList);
        setMaxIndex(indexList(data.maxIndex).filter(n => n !== 0));

        return;
    }

    return {
        getServiceListFunc,
        serviceList,
        showModal,
        setShowModal,
        index,
        setIndex,
        maxIndex,
        serviceName,
        setServiceName,
        getServiceListbyNameFunc
    }
}