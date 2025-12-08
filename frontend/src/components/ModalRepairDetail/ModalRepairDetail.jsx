import ModalBase from '../ModalBase/ModalBase'
import Input from '../Input/Input'
import Buttom from '../Buttom/Buttom'
import useRepairDetail from '../../hooks/useRepairDetail'
function ModalRepairDetail({cancel,repair_id,refresh}) {
  const {valor, setValor, detalle, setDetalle, hkSaveRepairDetail} = useRepairDetail()
  return (
    <ModalBase>
      <form onSubmit={async (e) => {e.preventDefault(); await hkSaveRepairDetail(repair_id);await refresh(repair_id);cancel(false)}}>
        <Input placeholder="Valor" type="number" value={valor} onChange={(e) => setValor(e.target.value)}></Input>
        <Input placeholder="Detalle" type="text" value={detalle} onChange={(e) => setDetalle(e.target.value)}></Input>
        <div style={{display: "flex", flexDirection: "row", marginTop: "15px"}}>
        <Buttom label="Ingresar" type='submit' />
        <Buttom label="Cancelar" estilo="negativo" action={() => cancel(false)}/>
        </div>
        </form>
    </ModalBase>
  )
}

export default ModalRepairDetail