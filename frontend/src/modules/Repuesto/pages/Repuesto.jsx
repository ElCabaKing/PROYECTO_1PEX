import { useEffect, useRef } from "react";
import useParts from "../hooks/useParts"
import Buttom from "../../../components/Buttom/Buttom";
import ModalNewPart from "../components/ModalNewPart/ModalNewPart";
import Input from "../../../components/Input/Input";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import styles from "./Repuesto.module.css";
function Repuesto() {
  const isFirstNameRender = useRef(true);
  const { partList, getPartList, numIndex, maxIndex,
    setNumIndex, showModal, setShowModal,
    partName, setPartName, getPartListByName } = useParts();

  useEffect(() => {
    if (partName !== "") return
    getPartList()

  }, [numIndex, partName]);

  useEffect(() => {
    if (isFirstNameRender.current) {
      isFirstNameRender.current = false;
      return;
    }
    if (partName != "") {
      getPartListByName();
    }
  }, [numIndex, partName]);


  return (
    <div className={styles.mainContainer}>
      <h2 style={{ marginLeft: "10px" }}>Repuestos</h2>
      <div className={styles.upThings}>
        <Buttom extraClass={styles.addButton} action={() => setShowModal(true)} label="+ Repuesto"></Buttom>
        <Input placeholder="Buscar un repuesto" onChange={(e) => { setPartName(e.target.value); setNumIndex(1) }} />
        <Select value={maxIndex.includes(numIndex) ? numIndex : ''} onChange={(e) => setNumIndex(e.target.value)}>
          {maxIndex.map((n) => (<MenuItem value={n} key={n}>{n}</MenuItem>))}
        </Select>
      </div>
      <div className={styles.distContainer}>
        <div className={styles.tableContainer}>
          <table className={styles.tabla}>
            <thead>
              <tr>
                <th>PIEZA</th>
                <th>STOCK</th>
                <th>PRECIO</th>
              </tr>
            </thead>
            <tbody>
              {partList.map((parte) => (
                <tr className={styles.fila} key={parte.id}>
                  <td>{parte.part_name}</td>
                  <td>{parte.stock}</td>
                  <td>{`$${parte.part_value}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && (
        <ModalNewPart refreshs={getPartList} close={setShowModal} />
      )}
    </div>
  )
}

export default Repuesto