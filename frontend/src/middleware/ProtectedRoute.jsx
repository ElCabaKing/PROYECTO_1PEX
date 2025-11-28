import axios from "axios";
import { API_URL } from "../utils/api";
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const [allow, setAllow] = useState(null)
    async function Validate() {
        const res = await axios.get(`${API_URL}/authUserV`,
            {
                withCredentials: true
            }
        );
        console.log(res);
        if (res.data.validation) {
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
    }, [allow,navigate]);


    if (allow === true) {
        return children;
    }

    if (allow === null) {
        return <div>Cargando</div>
    }
    return null;
}

export default ProtectedRoute;