import { useEffect } from "react";
import useHistory from "../hooks/useHistory"
import Buttom from "../../../components/Buttom/Buttom"
import { useNavigate } from "react-router-dom"
import styles from "./History.module.css"
function History() {
  const navigate = useNavigate();
  const { historyList,
    maxIndex,
    currentIndex,
    setCurrentIndex,
    getHistoryList, } = useHistory();

  useEffect(() => {
    getHistoryList()

  }, [currentIndex])

  return (

    <div className={styles.mainContainer}>
      <h2 style={{marginLeft: "10px"}}>Historial</h2>
      <div className={styles.distContainer}>
        <div className={styles.tableContainer}>

          <table className={styles.tabla}>
            <thead>
              <tr>
                <th>Id</th>
                <th>Ced.Cliente</th>
                <th>Fecha Inicio</th>
                <th>Estado</th>
                <th>Tecnico</th>
                <th>Detalles</th>
              </tr>
            </thead>
            <tbody>
              {historyList.map((registro) => (
                <tr className={styles.fila} key={registro.id}>
                  <td>{registro.id}</td>
                  <td>{registro.cedula_cliente}</td>
                  <td>{new Date(registro.fecha_inicio).toLocaleString()}</td>
                  <td>{registro.status_label}</td>
                  <td>{registro.user_nombre ? registro.user_nombre : "-"}</td>
                  <td><Buttom extraClass={styles.verButton} label="Ver" action={() => navigate(`/repair/${registro.id}`)}></Buttom></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <select onChange={(e) => setCurrentIndex(e.target.value)}>
          {maxIndex.map((number) => (
            <option key={number} value={number}>{number}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default History