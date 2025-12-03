import { useEffect } from "react";
import useRepair from "../../hooks/useRepair"
import styles from "../MyJobs/MyJobs.module.css"
import { useNavigate } from "react-router-dom";
function MyJobs() {
  const { hkGetUserRepairList, userRepairList } = useRepair();
  const navigate = useNavigate();
  useEffect(() => {
    hkGetUserRepairList()

  }, [])

  return (
    <div className={styles.grandContainer}>
      <div className={styles.tableContainer} >
        <table className={styles.tabla}>
          <thead>
            <tr>
              <th>Trabajos</th>
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
                    <button onClick={() => navigate(`/repair/${repair.id}`)} className={styles.toolsButton}></button>
                    <button className={styles.toolsButton}></button>
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