import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ModalRepairDetail from "../components/ModalRepairDetail/ModalRepairDetail";
import Buttom from "../../../components/Buttom/Buttom";
import styles from "./RepairJob.module.css";
import useJob from "../hooks/useJob";
import useRepair from "../../MyJobs/hooks/useRepair";
function RepairJob() {
  const { id } = useParams();
  const { getJob, navigate, jobBody, header, noData, isUser, setShowModalDetail, showModalDetail,
    alterRepair, } = useJob();
  const { updateHead } = useRepair();
  const [inMaintance, setInMaintance] = useState(true);

  const acceptedColors = {
    1: "#99918fff", // pendiente
    3: "#e22a2aff", // aceptado
    2: "#4bc44bff", // rechazado
  };

  const fontColors = {
    1: "#464140ff", // pendiente
    3: "#5a1919ff", // aceptado
    2: "#204e20ff", // rechazado
  };


  useEffect(() => {
    getJob(id);
  }, [id])

  useEffect(() => {
    setInMaintance(
      header.status_label === "DISPONIBLE" ||
      header.status_label === "ENTREGADO" 
    );
  }, [header]);

  return (
    <>
      <div className={styles.headerContainer}>
        <p>Id de Pedido: {header.id}</p>
        <p>Problema: {header.repair_problem}</p>
        <p>Estado: {header.status_label}</p>
        <p>Total: ${header.total}</p>
        <Buttom extraClass={styles.mainButton}
         disable={inMaintance || !isUser } 
         estilo={inMaintance || !isUser ? "negativo" : "base"} 
         action={async () => { await alterRepair(id,header.status_label==="EN REPARACION"? 3 : 4); navigate('/jobs'); }} 
         label={header.status_label==="REPARADO"? "ENTREGAR" : "TERMINAR"} />
      </div>
      <div className={styles.tablaContainer}>
        <table className={styles.tabla}>
          <thead>
            <tr>
              <th>Detalle</th>
              <th>Fecha</th>
              <th>Valor</th>
              <th><Buttom extraClass={styles.addButton} estilo={(noData || !isUser || inMaintance ? "negativo" : "base")} disable={noData || !isUser || inMaintance} action={() => setShowModalDetail(true)} label="+" /></th>
            </tr>
          </thead>
          <tbody>
            {noData ? (
              <tr key="noData">
                <td colSpan={2}>
                  <p>Aun no se acepta este trabajo Aceptalo!!</p>
                </td>
                <td colSpan={2}>
                  <Buttom action={async () => { await updateHead(header.id, 2); navigate('/jobs') }} label="Aceptar" />
                </td>
              </tr>
            ) : (
              jobBody.map((registro) => (
                <tr style={{ backgroundColor: acceptedColors[registro.accepted] || "",   }} key={registro.id}>
                  <td style={{ color: fontColors[registro.accepted] || "" }}>{registro.detalle}</td>
                  <td style={{ color: fontColors[registro.accepted] || "" }}>{new Date(registro.fecha).toLocaleString()}</td>
                  <td style={{ color: fontColors[registro.accepted] || "" }}> {registro.total ? `$${registro.total}` : ``}</td>
                  <td></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {showModalDetail && (<ModalRepairDetail refresh={getJob} repair_id={header.id} cancel={setShowModalDetail} />)}
    </>
  )
}

export default RepairJob