import Buttom from '../../../../components/Buttom/Buttom';
import ModalBase from '../../../../components/ModalBase/ModalBase';
import useModalNewService from './useModalNewService';
import Input from '../../../../components/Input/Input'
function ModalNewService({ close,refreshs}) {
    const { serviceName,
        setServiceName,
        vpe,
        setVpe,
        sendNewService } = useModalNewService();
    return (
        <ModalBase>
           <form onSubmit={async (e) => {e.preventDefault(); await sendNewService();refreshs(); close(false)}}>
            <p>Ingresar nuevo Servicio</p>
            Nombre del servicio
            <Input value={serviceName} onChange={(e) => setServiceName(e.target.value.toUpperCase())} />
           Valor por servicio
            <Input value={vpe} type="number" min={0} onChange={(e) => setVpe(e.target.value)} />
            <Buttom type='submit' label="Ingresar"></Buttom>
            <Buttom action={() => close(false)} label="Cancelar" estilo='negativo'></Buttom>
            </form>
        </ModalBase>
    )
}

export default ModalNewService