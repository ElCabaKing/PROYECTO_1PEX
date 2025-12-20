import { useEffect } from "react";
import useRepair from "../../RepairJob/hooks/useRepair"
import styles from "./MyJobs.module.css"
import { useNavigate } from "react-router-dom";
import shIncon from "../../../media/shIcon.avif"
import Buttom from "../../../components/Buttom/Buttom";

function MyJobs() {
  const { getUserRepairList, userRepairList } = useRepair();
  const navigate = useNavigate();
  useEffect(() => {
    getUserRepairList();

  }, [getUserRepairList])

  return (
    <div className={styles.grandContainer}>
      <h2 style={{marginLeft: "10px"}}>Mis Tareas</h2>
      <div className={styles.tableContainer} >
        <table className={styles.tabla}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Modelo</th>
              <th>Problema</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {userRepairList.map((repair) =>
              <tr className={styles.fila} key={repair.id}>
                <td>{repair.id}</td>
                <td>{repair.modelo}</td>
                <td>{repair.repair_problem}</td>
                <td>
                  <div className={styles.tools}>
                    <Buttom action={() => navigate(`/repair/${repair.id}`)} extraClass={styles.buttonMinus} label={<img alt="Buscar" className={styles.Iconimg} src={shIncon}/>}/>
                  </div>
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MyJobs