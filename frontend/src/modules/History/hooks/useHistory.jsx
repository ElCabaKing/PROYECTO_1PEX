import { useState } from "react";
import { appGetHistoryList } from "../services/history.api.js";
import { indexList } from "../../../utils/utilFunc";

export default function useHistory() {
    const [historyList, setHistoryList] = useState([])
    const [maxIndex, setMaxIndex] = useState([]);
    const [currentIndex, setCurrentIndex] = useState("1");

    async function getHistoryList() {
        const resHistoryList = await appGetHistoryList({index_num: currentIndex});
        setHistoryList(resHistoryList[0]);
        setMaxIndex(indexList(resHistoryList[1]));
        return;
    }


    return {
        historyList,
        maxIndex,
        currentIndex,
        setCurrentIndex,
        getHistoryList,

    }
}