import Buttom from "../Buttom/Buttom"
import Input from "../Input/Input"
import useRepair from "../../hooks/useRepair"
import styles from "../ModalRepair/ModalRepair.module.css"
function ModalRepair({hideModal}) {
    const {setCedula_cliente,setModelo,setRepair_problem,
        cedula_cliente,modelo,repair_problem,hkSaveRepair} = useRepair()
  return (
    <>
    <div className={styles.container}>
    <form onSubmit={(e) => {e.preventDefault();hkSaveRepair();hideModal(false)}}> 
      <div className={styles.rowContainer}>
        <Input value={cedula_cliente} onChange={(e) => setCedula_cliente(e.target.value)} placeholder="Cedula del cliente"></Input>
        <Input value={modelo}  onChange={(e) => {setModelo(e.target.value)}} placeholder="Modelo del Telefono"></Input>
        </div>
        <div className={styles.textareaContainer}>
        <textarea className={styles.textarea} value={repair_problem} onChange={(e) => {setRepair_problem(e.target.value)}} placeholder="Problema"></textarea>
      </div>
        <div className={styles.rowContainer}>
        <Buttom label="Registrar" type="submit"></Buttom>
        <Buttom action={() => hideModal(false)} type="button" label="Cancelar"></Buttom>
        </div>
    </form>
    </div>
    </>
  )
}

export default ModalRepair