import { api } from "../utils/api";
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const [allow, setAllow] = useState(null)
    async function Validate() {
        const res = await api.get("/authUserV", { headers: { credential: "include" } });
        console.log(res);
        if (res.validation) {
            setAllow(true)
        }
        else {
            setAllow(false)
        }
    }
    useEffect(() =>{
        Validate();
    },[]);

    useEffect(() => {
        const valInterval = setInterval(() => {
            Validate()
        }, 10 * 60 * 1000);

        return () => {
            clearInterval(valInterval)
        }
    }, [])
    
    useEffect(() => {
        if (allow === false) {
            navigate("/login");
        }
    }, [allow]);


    if (allow === true) {
        return children;
    }

    if (allow === null) {
        return <div>Cargando</div>
    }
    return null;
}

export default ProtectedRoute;