import axios from "axios";
import { API_URL } from "../utils/api";
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const [allow, setAllow] = useState(null)
    async function Validate() {
        try{const res = await axios.get(`${API_URL}/authUserV`,
            {
                withCredentials: true
            }
        );
        console.log(res.data);
        if (res.data.validation) {
            setAllow(true)
        }
        else {
            setAllow(false)
        }
    }catch(error){
        console.log(error)
        alert(error)
    }}
    
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
            console.log("wtf llego al false")
            navigate("/login");
        }
    }, [allow]);


    if (allow === null) {
        return <div>Cargando</div>
    }
    return children;
}

export default ProtectedRoute;