import { useNavigate } from "react-router-dom"
import Input from '../../components/Input/Input'
import useHome from "../../hooks/useHome";
import ModalBase from "../../components/ModalBase/ModalBase"
import Buttom from "../../components/Buttom/Buttom";
import styles from "../Home/Home.module.css"
function Home() {
    const { codeNumber, setCodeNumber, message,showError,hkSearchCode,showModal,setShowModal,repairModalData } = useHome();
    const navigate = useNavigate();
    return (
        <div className={styles.homeContainer}>
        <div className={`container container--column ${styles.formContainer}`}>
            <p>Tienes un producto con nosotros? <br/>
                Ingresa su codigo aqui
            </p>
            {showError && (<p>{message}</p>)}
            <form onSubmit={(e) => {
                e.preventDefault(); 
                hkSearchCode(codeNumber);
            }}>
                <Input name="codeNumber"
                    type="text"
                    value={codeNumber}
                    onChange={(e) => setCodeNumber(e.target.value)}
                    pattern="\d+"
                    title="Solo numeros"
                    placeholder="Codigo" />
                <Buttom label="Buscar" type="submit" />
            </form>
            <p>Eres un empleado ingresa aqui</p>
           <Buttom label="Ir al login" action={() => navigate('/login')}/>
            {showModal && (
                <ModalBase>
                    <p>Id: {`${repairModalData.repair_data.id}`}</p>
                    <p>Cliente: {`${repairModalData.repair_data.cedula_cliente}`}</p>
                    <p>Inicio: {`${new Date(repairModalData.repair_data.fecha_inicio).toLocaleString()}`}</p>
                    <p className={repairModalData.repair_data.status_label==="REPARADO"? styles.repared : ""}>
                        Estado: {`${repairModalData.repair_data.status_label}`}</p>
                    <p>Total: ${repairModalData.repair_data.Total? repairModalData.repair_data.Total: "0"}</p>
                    <Buttom label="Listo" action={() => {setCodeNumber("");setShowModal(false)}}/>
                </ModalBase>
            )}

        </div>
        </div>
    )
}

export default Home;