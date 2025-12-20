import { useState } from 'react'
import Buttom from '../../../../components/Buttom/Buttom'
import ModalBase from '../../../../components/ModalBase/ModalBase'
import ServiceMenuDetail from '../MenusDetail/ServiceMenuDetail/ServiceMenuDetail'
import PartMenuDetail from '../MenusDetail/PartMenuDetail/PartMenuDetail'
import styles from './ModalRepairDetail.module.css'
function ModalRepairDetail({ cancel, repair_id, refresh }) {
  const [currentSecction, setCurrentSecction] = useState("Servicio");
  return (
    <ModalBase extraClass={styles.modalSize}>
      <div className={styles.buttonContainer}>
        <Buttom extraClass={styles.button} estilo={currentSecction === "Servicio" ? "Negativo" : "base"} action={() => setCurrentSecction("Servicio")} label="Servicio"></Buttom>
        <Buttom extraClass={styles.button} estilo={currentSecction === "Repuesto" ? "Negativo" : "base"} action={() => setCurrentSecction("Repuesto")} label="Repuesto"></Buttom>
      </div>
      {currentSecction === "Servicio" && (<ServiceMenuDetail cancel={cancel}
        repair_id={repair_id} refresh={refresh} />
      )
      }
      {currentSecction === "Repuesto" && (<PartMenuDetail cancel={cancel}
        repair_id={repair_id} refresh={refresh} />
      )
      }
    </ModalBase>
  )
}

export default ModalRepairDetail