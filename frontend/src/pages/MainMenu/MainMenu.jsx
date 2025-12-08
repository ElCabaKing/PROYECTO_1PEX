import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import useRepair from "../../hooks/useRepair";
import styles from "../MainMenu/MainMenu.module.css";
import RepairCard from "../../components/RepairCard/RepairCard"
import ModalRepair from "../../components/ModalRepair/ModalRepair";
import Buttom from "../../components/Buttom/Buttom";
function MainMenu() {
    const [newButton, setNewButton] = useState(false)
    const {repairList, hkGetList, hkUpdateHead, showModalRepair,setShowModalRepair} = useRepair();
      useEffect(() => {
        const socket = io("http://localhost:5000", { withCredentials: true });
        socket.on("newRepair", () => {
            hkGetList();
        });

        socket.on("refreschRepair", () => {
            hkGetList();
        });
        return () => {
            socket.off("newRepair");
            socket.off("refreschRepair");
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        hkGetList();
    },[])

    useEffect(() => {
        const stored = localStorage.getItem("rol")
        if(stored){
        const data = JSON.parse(atob(stored))=="admin";
        setNewButton(data);}
    })

    return (
      <> 
      <div className={styles.mainContainer}>
        <div className={styles.buttomContainer}>
      {newButton && (<Buttom action={() => setShowModalRepair(true)} label="Nueva tarea"/>)}
        </div>
        Tareas Disponibles
      <div className={styles.container}>
            {repairList.map((repair) => <RepairCard key={repair.id} id={repair.id} 
            action={hkUpdateHead}
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