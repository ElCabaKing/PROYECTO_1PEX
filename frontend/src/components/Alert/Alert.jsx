import { io } from 'socket.io-client'
import { useState, setTimeout, useEffect} from 'react'


function Alert({children}) {
    const [alert, setAlert] = useState("")
    const [show, setShow] = useState(false)
    useEffect(() => {
        const socket = io("http://localhost:5000");
        socket.on("repairStatusChanged", (data) => {
            setAlert("Valio manes",data);setShow(true);
            setTimeout(() => {
                setShow(false)
            }, 500);
        });
    }, [])
    return (
        <div>
        {show && (<div>Esto es una alerta con {alert}</div>)}
        {children}
        </div>
    )
}

export default Alert