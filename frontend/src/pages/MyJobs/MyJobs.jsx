import { useEffect } from "react";
import useRepair from "../../hooks/useRepair"
import styles from "../MyJobs/MyJobs.module.css"
function MyJobs() {
  const { hkGetUserRepairList, userRepairList } = useRepair();

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
                    <button className={styles.toolsButton}></button>
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