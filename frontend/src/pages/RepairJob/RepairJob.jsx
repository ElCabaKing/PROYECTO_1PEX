import { useParams } from "react-router-dom";
import useJob from "../../hooks/useJob";
import { useEffect, useState } from "react";
import useRepair from "../../hooks/useRepair";
import ModalRepairDetail from "../../components/ModalRepairDetail/ModalRepairDetail";
import Buttom from "../../components/Buttom/Buttom";
import styles from "../RepairJob/RepairJob.module.css";
function RepairJob() {
  const { id } = useParams();
  const { hkgetJob,navigate, jobBody, header, noData, isUser, setShowModalDetail, showModalDetail,
    hkFinishRepair } = useJob();
  const { hkUpdateHead } = useRepair();
  const [inMaintance, setInMaintance] = useState(true)


  useEffect(() => {
    hkgetJob(id);
  }, [])

  useEffect(() => {
    setInMaintance(
      header.status_label === "REPARADO" ||
      header.status_label === "DISPONIBLE"
    );
  }, [header]);

  return (
    <>
      <div className={styles.headerContainer}>
        <p>Id de Pedido: {header.id}</p>
        <p>Problema: {header.repair_problem}</p>
        <p>Estado: {header.status_label}</p>
        <p>Total: ${header.total}</p>
        <Buttom disable={inMaintance || !isUser} estilo={inMaintance || !isUser? "negativo" : "base"} action={async () => {await hkFinishRepair(id); navigate('/jobs'); }} label="Terminar" />
      </div>
      <div className={styles.tablaContainer}>
        <table className={styles.tabla}>
          <thead>
            <tr>
              <th>Detalle</th>
              <th>Fecha</th>
              <th>Valor</th>
              <th><Buttom estilo={(noData || !isUser || inMaintance ? "negativo" : "base")} disable={noData || !isUser || inMaintance} action={() => setShowModalDetail(true)} label="+" /></th>
            </tr>
          </thead>
          <tbody>
            {noData ? (
              <tr key="noData">
                <td colSpan={2}>
                  <a>Aun no se acepta este trabajo Aceptalo!!</a>
                </td>
                <td colSpan={2}>
                  <Buttom action={async () => { await hkUpdateHead(header.id, 2);navigate('/jobs') }} label="Aceptar" />
                </td>
              </tr>
            ) : (
              jobBody.map((registro) => (
                <tr key={registro.id}>
                  <td>{registro.detalle}</td>
                  <td>{new Date(registro.fecha_ingreso).toLocaleString()}</td>
                  <td>${registro.valor}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {showModalDetail && (<ModalRepairDetail refresh={hkgetJob} repair_id={header.id} cancel={setShowModalDetail} />)}
    </>
  )
}

export default RepairJob