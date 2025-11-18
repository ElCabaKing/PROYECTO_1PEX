
import { useNavigate } from "react-router-dom";
import { appstLogin } from "../api/login.api";
export default function useLogin() {
    const navigate = useNavigate();
    async function hkValidateLogin(params) {
        const res = await appstLogin(params);
        if (res.login) {
            localStorage.setItem(
                "menuList",
                btoa(JSON.stringify(res.permisos))
            );
            navigate('/main')
        }
    }

    return {
        hkValidateLogin
    }
}
