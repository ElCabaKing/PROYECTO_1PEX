import { io } from 'socket.io-client'
import { useState, useEffect} from 'react'


function Alert({children}) {
    const [alert, setAlert] = useState("")
    const [show, setShow] = useState(false)
    useEffect(() => {
        const socket1 = io("http://localhost:5000");


        socket1.on("statusLogin", (data) => {
            setAlert(`El usuario ${data} acaba de iniciar sesion`);
            setShow(true);
            console.log("datos",data)
            setTimeout(() => {setShow(false)}, 5000);
        });
    }, [])
    return (
        <div>
        {show && (<div>{alert}</div>)}
        {children}
        </div>
    )
}

export default Alert