import Buttom from "../Buttom/Buttom"
import Input from "../Input/Input"
import ModalBase from "../ModalBase/ModalBase"
import styles from "../ModalPassword/ModalPassword.module.css"
function ModalPassword({cancel,}) {
  return (
    <ModalBase>
        <h1>Cambio de contrasena</h1>
        <Input/>
        <Input/>
        <div style={{display: "flex", flexDirection: "row", marginTop: "15px"}}>
        <Buttom label="Vereficar" />
        <Buttom label="Cancelar" estilo="negativo" action={() => cancel(false)}/>
          </div>

    </ModalBase>
  )
}

export default ModalPassword