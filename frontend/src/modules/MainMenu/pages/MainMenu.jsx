import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import useRepair from "../../RepairJob/hooks/useRepair";
import styles from "./MainMenu.module.css";
import RepairCard from "../components/RepairCard/RepairCard"
import ModalRepair from "../components/ModalRepair/ModalRepair";
import Buttom from "../../../components/Buttom/Buttom";
import { API_URL } from "../../../utils/api";
function MainMenu() {
    const [newButton, setNewButton] = useState(false)
    const {repairList, getList, updateHead, showModalRepair,setShowModalRepair} = useRepair();
      useEffect(() => {
        const socket = io(API_URL, { withCredentials: true });
        socket.on("newRepair", () => {
            getList();
        });

        socket.on("refreschRepair", () => {
            getList();
        });
        return () => {
            socket.off("newRepair");
            socket.off("refreschRepair");
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        getList();
    },[getList])

    useEffect(() => {
        const stored = localStorage.getItem("rol")
        if(stored){
        const data = JSON.parse(atob(stored))==="admin";
        setNewButton(data);}
    },[setNewButton])

    return (
      <> 
      <div className={styles.mainContainer}>
        <div className={styles.buttomContainer}>
      {newButton && (<Buttom extraClass={styles.mainButton} action={() => setShowModalRepair(true)} label="Nueva tarea"/>)}
        </div>
        <h2 style={{marginLeft: "10px"}}>Tareas Disponibles</h2>
      <div className={styles.container}>
            {repairList.map((repair) => <RepairCard key={repair.id} id={repair.id} 
            action={updateHead}
            modelo={repair.modelo} 
            status_label={repair.status_label}
            repair_problem={repair.repair_problem}
            repair_status={repair.repair_status}/>)}
        </div>
        {showModalRepair && (<ModalRepair hideModal={setShowModalRepair} />)}
        </div>
        </> 
    )
}

export default MainMenu;