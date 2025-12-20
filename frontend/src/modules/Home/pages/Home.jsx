import { useNavigate } from "react-router-dom"
import Input from '../../../components/Input/Input'
import useHome from "../hooks/useHome";
import ModalBase from "../../../components/ModalBase/ModalBase"
import Buttom from "../../../components/Buttom/Buttom";
import styles from "./Home.module.css"
import Chat from "../../../components/Chat/Chat";
function Home() {
    const { codeNumber, setCodeNumber, message,showError,
        searchCode,showModal,setShowModal,repairModalData } = useHome();
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
                searchCode(codeNumber);
            }}>
                <Input name="codeNumber"
                    type="text"
                    value={codeNumber}
                    onChange={(e) => setCodeNumber(e.target.value)}
                    pattern="\d+"
                    title="Solo numeros"
                    placeholder="Codigo" />
                <Buttom label="Buscar" type="submit" extraClass={styles.ButtomExtra} />
            </form>
            <p>Eres un empleado? Ingresa aqui</p>
           <Buttom extraClass={styles.ButtomExtra} label="Ir al login" action={() => navigate('/login')}/>
            {showModal && (
                <ModalBase>
                    <div className={styles.chatContainer}>
                        <div>
                    <p>Id: {`${repairModalData.id}`}</p>
                    <p>Cliente: {`${repairModalData.cedula_cliente}`}</p>
                    <p>Inicio: {`${new Date(repairModalData.fecha_inicio).toLocaleString()}`}</p>
                    <p className={repairModalData.status_label==="REPARADO"? styles.repared : ""}>
                        Estado: {`${repairModalData.status_label}`}</p>
                    <p>Total: ${repairModalData.Total? repairModalData.Total: "0"}</p>
                    <Buttom  extraClass={styles.ButtomExtra} label="Listo" action={() => {setCodeNumber("");setShowModal(false)}}/>
                        </div>
                <Chat repairId={codeNumber}></Chat>
                </div>
                </ModalBase>
                
            )}

        </div>
        </div>
    )
}

export default Home;