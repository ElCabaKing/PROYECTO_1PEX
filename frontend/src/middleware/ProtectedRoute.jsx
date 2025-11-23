import { api } from "../utils/api";
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const [allow, setAllow] = useState(null)
    async function Validate() {
        console.log("ap")
        const res = await api.get("/authUserV", { headers: { credential: "include" } });
        console.log(res);
        if (res.validation) {
            setAllow(true)
        }
    }

    useEffect(() => {
        Validate();
        setInterval(() => {
            Validate()
        }, 5 * 60 * 1000);
    }, [])

    if (allow === true) {
        return children;
    }

    if (allow === null) {
        return <div>Cargando</div>
    }

    if (allow === false) {
        navigate('/error');
    }
}

export default ProtectedRoute;