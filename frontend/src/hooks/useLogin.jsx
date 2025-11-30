import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { appstLogin } from "../api/login.api";
import { UserContext } from "../context/AppContext"
export default function useLogin() {
    const { aleerta, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [hkmLogin, setHkmLogin] = useState(''); //mensaje resultante del login
    const [hkbLogin, setHkbLogin] = useState(false); //bandera que muestra el mensaje
    const [hkmodalShow, setHkmodalShow] = useState(false) //bandera que muestra el modal
    async function hkValidateLogin({ user_nombre, user_password }) {
        const res = await appstLogin({ user_nombre, user_password });
        console.log("login", res)
        console.log("boleans", res.first_time, res.login)
        if (res.login && res.first_time) {
            console.log("entro");
            localStorage.setItem("user_name", btoa(JSON.stringify(res.user_name)));
            localStorage.setItem("menuList", btoa(JSON.stringify(res.permisos)));
            setHkmodalShow(true);
            return
        }
        if (res.login) {
            localStorage.setItem("user_name", btoa(JSON.stringify(res.user_name)));
            localStorage.setItem("menuList", btoa(JSON.stringify(res.permisos)));
            console.log(res.permisos)
            aleerta(res.permisos);
            setUser(res.permisos)
            navigate('/main')
        }
        else {
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
        hkRedirectRecovery,
        hkmodalShow,
        setHkmodalShow
    }
}
