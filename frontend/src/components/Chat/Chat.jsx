import { useState } from "react";
import axios from 'axios';
import { API_URL } from "../../utils/api";
import { useEffect } from "react";
import Buttom from "../Buttom/Buttom";
function Chat({ repairId }) {
    const [mensajes, setMensajes] = useState([])

    async function getMessagges() {
        const listMemsajes = await axios.get(`${API_URL}/chat/getChatbyId`,
            {
                params: {
                    repairId
                }
            }
        );
        console.log(listMemsajes.data)
        setMensajes(listMemsajes.data);
    }

    useEffect(() => {
        getMessagges()


    }, [])


    return (
        <div style={{width: "350px"}}>
            {mensajes.map((mensaje) => (<div style={{ width: "100%", justifyItems: mensaje.isTeam ? "left" : "right" }}>
                <div style={{ width: "50%", justifyItems: mensaje.isTeam ? "left" : "right" }}>
                    <p style={{backgroundColor: mensaje.isTeam ? "": "purple", 
                        padding: "10px", borderRadius: "5px", color: mensaje.isTeam ? "": "white"}}>{mensaje.mensaje}</p>
                </div>
            </div>))}
            <textarea name="" id=""></textarea>
            <Buttom label="ENVIAR"></Buttom>
        </div>

    )
}

export default Chat