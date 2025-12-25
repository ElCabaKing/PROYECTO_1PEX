import { useState } from "react";
import { getValidateWord, updateUserPassword } from "../../services/recovery";

export default function useRecovery(){
    const [isCorrect, setIsCorrect] = useState(false);
    const [user_password, setUser_password] = useState("");
    const [user_name, setUser_name] = useState("");
    const [userFirstPass, setUserFirstPass] = useState("");
    const [userSecondPass, setUserSecondPass] = useState("");
    const [securityCode, setSecurityCode] = useState("")
    const [showError, setShowError] = useState(false)
    const [changeModal, setChangeModal] = useState(false)
    const [message, setMessage] = useState("");
    const [beggin, setBeggin] = useState(true);

    async function saveAll(cancel) {
        setShowError(false);
        setMessage("");
        if (userFirstPass !== userSecondPass) {
            setMessage("Las contrasenas deben coincidir");
            setShowError(true);
            return;
        }
        const res = await updateUserPassword(user_name,userSecondPass);
        setMessage(res.response);
        setShowError(true);
        setTimeout(() => {
            cancel()
        }, 2 * 1000);
        return;
    }

    async function validateWord() {
        try{
            const validate = await getValidateWord(user_name,securityCode);
            if(validate.isCorrect){setBeggin(false);setIsCorrect(true)}
            return;
        }
        catch(error){
            return (setMessage(error),setShowError(true));
        }
    }


    return {
        user_name,
        setUser_name,
        user_password,
        setUser_password,
        isCorrect,
        setUserFirstPass,
        userFirstPass,
        userSecondPass,
        setUserSecondPass,
        validateWord,
        securityCode,
        setSecurityCode,
        message,
        showError, 
        setShowError,
        beggin,
        saveAll
    }
}