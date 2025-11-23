import React, { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { appstLogin } from "../api/login.api";
import {UserContext} from "../context/AppContext"
export default function useLogin() {
    const {aleerta,setUser} = useContext(UserContext);
    const navigate = useNavigate();
    const [hkmLogin, setHkmLogin] = useState('');
    const [hkbLogin, setHkbLogin] = useState(false);
    async function hkValidateLogin(params) {
        const res = await appstLogin(params);
        if (res.login) {
            localStorage.setItem(
                "menuList",
                btoa(JSON.stringify(res.permisos))
            );
            console.log(res.permisos)
            aleerta(res.permisos);
            setUser(res.permisos)
            navigate('/main')
        }
        else{
            setHkmLogin("Usuario o contrasena invalido trata de nuevo")
            setHkbLogin(true)
        }
    }

    async function hkRedirectRecovery() {
        navigate("/recovery")
        
    }

    return {
        hkValidateLogin,
        hkmLogin,
        hkbLogin,
        hkRedirectRecovery
    }
}
