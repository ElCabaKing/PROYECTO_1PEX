import Buttom from '../../../../components/Buttom/Buttom';
import ModalBase from '../../../../components/ModalBase/ModalBase';
import useModalNewPart from './useModalNewPart';
import Input from '../../../../components/Input/Input'
function ModalNewPart({ close,refreshs}) {
    const { partName,
        setPartName,
        baseStock,
        setBaseStock,
        pve,
        setPve,
        sendNewPart } = useModalNewPart();
    return (
        <ModalBase>
           <form onSubmit={async (e) => {e.preventDefault(); await sendNewPart();refreshs(); close(false)}}> 
            <p>Ingresar nueva Pieza</p>
            Nombre de la pieza
            <Input value={partName} onChange={(e) => setPartName(e.target.value.toUpperCase())} />
            Stock inicial
            <Input value={baseStock} type="number" min={0} onChange={(e) => setBaseStock(e.target.value)} />
           Valor por pieza
            <Input value={pve} type="number" min={0} onChange={(e) => setPve(e.target.value)} />
            <Buttom type='submit' label="Ingresar"></Buttom>
            <Buttom action={() => close(false)} label="Cancelar" estilo='negativo'></Buttom>
            </form>
        </ModalBase>
    )
}

export default ModalNewPart