import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Login } from "../api/login.api";

export default function useLogin() {
    const navigate = useNavigate();

    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const [showFirstLoginModal, setShowFirstLoginModal] = useState(false);
    const [showRecoveryModal, setShowRecoveryModal] = useState(false);
    const [user_nombre, setUser_nombre] = useState('');
    const [user_password, setUser_password] = useState('');

    function saveUserData({ user_name, userPermissions, rol }) {
        localStorage.setItem("user_name", btoa(JSON.stringify(user_name)));
        localStorage.setItem("menuList", btoa(JSON.stringify(userPermissions)));
        localStorage.setItem("rol", btoa(JSON.stringify(rol)));
    }

    async function validateLogin() {
        try {
            const res = await Login({ user_nombre, user_password });
            console.log("login response:", res);

            if (res.login) {
                saveUserData(res);

                if (res.first_time) {
                    setShowFirstLoginModal(true);
                    return;
                }

                navigate("/main");
            } else {
                setMessage("Usuario o contraseña inválido. Intenta de nuevo.");
                setShowMessage(true);
            }
        } catch (error) {
            console.error("ERROR LOGIN:", error);
            setMessage("Error inesperado. Inténtalo más tarde.");
            setShowMessage(true);
        }
    }

    return {
        validateLogin,
        message,
        showMessage,
        showFirstLoginModal,
        showRecoveryModal,
        setShowRecoveryModal,
        user_nombre,
        setUser_nombre,
        user_password,
        setUser_password,
        navigate
    };
}
