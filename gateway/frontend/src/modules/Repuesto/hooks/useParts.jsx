import { useState } from "react";
import { getPartsList, getPartbyName, updateStockCall } from "../services/parts.api";
import { indexList } from "../../../utils/utilFunc";

export default function useParts() {
    const [partList, setPartList] = useState([]);
    const [numIndex, setNumIndex] = useState(1);
    const [maxIndex, setMaxIndex] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [partName, setPartName] = useState("");
    const [numStock, setNumStock] = useState(0)
    async function getPartList() {
        const partData = await getPartsList({ numIndex });
        setPartList(partData.partlist);
        setMaxIndex(indexList(partData.maxIndex).filter(n => n !== 0));
        return;
    }

    async function getPartListByName() {
        const partData = await getPartbyName({ numIndex, partName });
        setPartList(partData.partlist);
        setMaxIndex(indexList(partData.maxIndex).filter(n => n !== 0));
        return;
    }

    async function updateStock({ partId, newStock}) {
        await updateStockCall({ partId, newStock});
        getPartList();
        return
    }


    return {
        getPartList,
        partList,
        numIndex,
        maxIndex,
        setNumIndex,
        showModal,
        setShowModal,
        getPartListByName,
        partName,
        setPartName,
        updateStock,
        numStock, 
        setNumStock
    }
}