import { useState } from "react";
import { appSaveAns } from "../../../User/services/user.api";
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
    async function saveAll({ ans, user_password, user_name }) {
        if (userFirstPass !== userSecondPass) {
            setPassError(true);
            return;
        }
        try {
            await appSaveAns({ ans, user_password, user_name });
            setHkmodalShow(false)
            navigate('/main');
        }
        catch (error) {
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