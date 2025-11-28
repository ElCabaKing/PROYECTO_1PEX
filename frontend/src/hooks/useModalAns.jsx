import { useState } from "react";
import { appSaveAns } from "../api/user.api";
import { useNavigate } from "react-router-dom";
export default function useModalAns() {
    const navigate = useNavigate();
    const [userAnsWord, setUserAnsWord] = useState("");
    const [userFirstPass, setUserFirstPass] = useState("");
    const [userSecondPass, setUserSecondPass] = useState("");
    const [passError, setPassError] = useState(false)
    const [hkmodalShow, setHkmodalShow] = useState(false)
    function generateAns() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < 5; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        setUserAnsWord(result)
    }
    async function saveAll(params) {
        if(userFirstPass === userSecondPass){
        await appSaveAns(params);
        setHkmodalShow(false)
        navigate('/main');
        }
        else{
            setPassError(true);
        }
    }

    return {
        userAnsWord,
        userFirstPass,
        userSecondPass,
        setHkmodalShow,
        setUserAnsWord,
        setUserFirstPass,
        setUserSecondPass,
        generateAns,
        saveAll,
        passError
    }
}