
import { useEffect, useRef } from "react";
import useServicio from "../hooks/useServicio"
import Buttom from "../../../components/Buttom/Buttom";
import ModalNewService from "../components/ModalNewService/ModalNewService";
import Input from "../../../components/Input/Input";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import styles from "./Servicio.module.css";

function Servicio() {
  const isFirstNameRender = useRef(true);
  const { serviceList, getServiceListFunc, showModal,
    setShowModal, maxIndex, index, setIndex, serviceName,
    setServiceName,getServiceListbyNameFunc } = useServicio();

  useEffect(() => {
    getServiceListFunc()

  }, [index])

  useEffect(() => {
    if (serviceName !== "") return
    getServiceListFunc()

  }, [index, serviceName]);

  useEffect(() => {
    if (isFirstNameRender.current) {
      isFirstNameRender.current = false;
      return;
    }
    if (serviceName != "") {
      getServiceListbyNameFunc();
    }
  }, [index, serviceName]);


  return (
    <div className={styles.mainContainer}>
      <h2 style={{ marginLeft: "10px" }}>Servicios</h2>
      <div className={styles.upThings} >
        <Buttom extraClass={styles.addButton} action={() => setShowModal(true)} label="+ Servicio"></Buttom>
        <Input value={serviceName} onChange={(e) => setServiceName(e.target.value)}></Input>
        <Select value={maxIndex.includes(index) ? index : ''} onChange={(e) => setIndex(e.target.value)}>
          {maxIndex.map((n) => (<MenuItem value={n}>{n}</MenuItem>))}
        </Select>
      </div>
      <div className={styles.distContainer}>
        <div className={styles.tableContainer}>
          <table className={styles.tabla}>
            <thead>
              <tr>
                <th>SERVICIO</th>
                <th>PRECIO</th>
              </tr>
            </thead>
            <tbody>
              {serviceList.map((servicio) => (
                <tr className={styles.fila} key={servicio.id}>
                  <td>{servicio.service_nombre}</td>
                  <td>{`$${servicio.service_value}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && (
        <ModalNewService refreshs={getServiceListFunc} close={setShowModal} />
      )}
    </div>
  )
}

export default Servicio