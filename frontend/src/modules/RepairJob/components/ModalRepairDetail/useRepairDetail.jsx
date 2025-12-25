import { useState } from "react";
import { saveServiceDetail, savePartDetail } from "../../services/repairDetails.api.js";


export default function useRepairDetail() {
    

    async function savePartDetailfunc({repair_id, Sv_RpId, units}) {
        await savePartDetail({repair_id, Sv_RpId, units});
        return;
    }

    async function saveServiceDetailfunc({repair_id,Sv_RpId}) {
        await saveServiceDetail({repair_id,Sv_RpId});
        return;
    }


    return {
        savePartDetailfunc,
        saveServiceDetailfunc,
    }


}