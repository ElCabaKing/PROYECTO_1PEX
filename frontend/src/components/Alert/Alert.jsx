import { io } from 'socket.io-client'
import { useState, useEffect, useRef } from 'react'
import styles from "../Alert/Alert.module.css"
import audioAlert from "../../media/alert.mp3"

function Alert({ children }) {
    const audioRef = useRef(null);
    const [alert, setAlert] = useState("");
    const [show, setShow] = useState(false);
    const [blur, setBlur] = useState(false);
    useEffect(() => {
        const socket = io("http://localhost:5000", { withCredentials: true });


        socket.on("statusLogin", (data) => {
            setAlert(`El usuario ${data} acaba de iniciar sesion`);
            setBlur(false);
            setShow(true);
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play();
            }
            setTimeout(() => { setBlur(true) }, 2000);
            setTimeout(() => { setShow(false) }, 3000);
        });

        socket.on("alertRepair", (data) => {
            setAlert(data);
            setBlur(false);
            setShow(true);
            audioRef.current?.play();
            setTimeout(() => setBlur(true), 2000);
            setTimeout(() => setShow(false), 3000);
        });
        return () => {
            socket.off("statusLogin");
            socket.off("alertRepair");
            socket.disconnect();
        };
    }, [])

    return (
        <>
            <audio ref={audioRef} src={audioAlert} preload="auto" />
            {show && (<div className={`${styles.alertCard} ${blur ? styles.alertCardAnimated : ""}`}>{alert}</div>)}
            {children}
        </>
    )
}

export default Alert