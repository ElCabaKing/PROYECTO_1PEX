import ModalBase from '../../../../components/ModalBase/ModalBase'
import Input from '../../../../components/Input/Input'
import Buttom from '../../../../components/Buttom/Buttom'
import useRepairDetail from './useRepairDetail'
import styles from '../ModalRepairDetail/ModalRepairDetail.module.css'
function ModalRepairDetail({cancel,repair_id,refresh}) {
  const {valor, setValor, detalle, setDetalle, hkSaveRepairDetail} = useRepairDetail()
  return (
    <ModalBase>
      <h3>Ingresar Detalle</h3>
      <form onSubmit={async (e) => {e.preventDefault(); await hkSaveRepairDetail(repair_id);await refresh(repair_id);cancel(false)}}>
        <Input placeholder="Valor" type="number" value={valor} onChange={(e) => setValor(e.target.value)}></Input>
        <Input placeholder="Detalle" type="text" value={detalle} onChange={(e) => setDetalle(e.target.value)}></Input>
        <div className={styles.ButtonContainer}>
        <Buttom extraClass={styles.Button}label="Ingresar" type='submit' />
        <Buttom  extraClass={styles.Button} label="Cancelar" estilo="negativo" action={() => cancel(false)}/>
        </div>
        </form>
    </ModalBase>
  )
}

export default ModalRepairDetail