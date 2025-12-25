import { useState } from "react";
import axios from 'axios';
import { API_URL } from "../../utils/api";
import { useEffect } from "react";
import Buttom from "../Buttom/Buttom";
import styles from './Chat.module.css';
import socket from "../../utils/socket";

function Chat({ repairId, isTeam, bandera }) {
    const [mensajes, setMensajes] = useState([]);
    const [mensaje, setMensaje] = useState("")

    async function getMessagges() {
        const listMemsajes = await axios.get(`${API_URL}/chat/getChatbyId`,
            {
                params: {
                    repairId
                }
            }
        );
        setMensajes(listMemsajes.data);
        return;
    }

    async function updatePartStatus({ newStock, partId, type, detailPart, newStatus }) {
        const res = await axios.post(`${API_URL}/chat/updatePartStatus`,
            {
                repairId,
                newStatus,
                newStock,
                partId,
                type,
                detailPart
            }

        )
        getMessagges();
        return;
    }

    async function sendMensaje() {
        const res = await axios.post(`${API_URL}/chat/createNewMessage`,
            {
                repairId,
                message: mensaje,
                isTeam
            }
        )
        getMessagges();
        return;
    }

    useEffect(() => {
        getMessagges()


    }, [repairId, bandera]);

    useEffect(() => {
        socket.emit("joinRepairRoom", repairId);

    }, [repairId]);

    useEffect(() => {

        socket.on("ChatRefresh", () => {
            getMessagges()
        });

        return () => {
            socket.off("ChatRefresh");
        };

    }, [])



    return (
        <div className={styles.chatContainer}>
            <div className={styles.messages}>
                {mensajes.map((mensaje, index) => (
                    <div key={mensaje.id || index} className={`${styles.message} ${mensaje.isTeam ? styles.left : styles.right}`}>
                        <p className={styles.messageText}>{`${mensaje.mensaje}${mensaje.units ? ': ' + mensaje.units : ''} ${mensaje.part_name ? mensaje.part_name : ''} ${mensaje.part_value ? 'por $' + mensaje.part_value + 'c/u' : ''} ${mensaje.accepted === 2 ? ": APROBADA" : mensaje.accepted === 3 ? ": RECHAZADA" : ''}`}</p>
                        {mensaje.accepted === 1 && isTeam === false && (
                            <div className={styles.buttons}>
                                <button
                                    onClick={async () => {
                                        await updatePartStatus({
                                            newStock: mensaje.units,
                                            partId: mensaje.part_id,
                                            type: "-",
                                            detailPart: mensaje.detail_id,
                                            newStatus: 2
                                        });
                                    }}
                                    className={styles.acceptBtn}>Aceptar</button>
                                <button
                                    onClick={() => updatePartStatus({
                                        detailPart: mensaje.detail_id,
                                        newStatus: 3
                                    })}
                                    className={styles.rejectBtn}>Rechazar</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className={styles.inputArea}>
                <textarea value={mensaje} onChange={(e) => setMensaje(e.target.value.toUpperCase())} className={styles.textarea} placeholder="Escribe un mensaje..." rows="3"></textarea>
                <Buttom action={() => { sendMensaje(); setMensaje("") }} label="ENVIAR"></Buttom>
            </div>
        </div>
    )
}

export default Chat