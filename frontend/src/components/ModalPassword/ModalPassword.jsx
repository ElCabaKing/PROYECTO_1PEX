import Buttom from "../Buttom/Buttom"
import Input from "../Input/Input"
import ModalBase from "../ModalBase/ModalBase"
import styles from "../ModalPassword/ModalPassword.module.css"
import useRecovery from "../../hooks/useRecovery"
function ModalPassword({ cancel, }) {
  const {
    user_name,
    setUser_name,
    isCorrect,
    setUserFirstPass,
    userFirstPass,
    userSecondPass,
    setUserSecondPass,
    validateWord,
    securityCode,
    setSecurityCode,
    message,
    showError,
    setShowError,beggin,saveAll } = useRecovery()
  return (
    <div>
      {beggin && (<ModalBase>
        <h1>Cambio de contrasena</h1>
        {showError && (<p>{message}</p>)}
        <form onSubmit={(e) => { e.preventDefault(); validateWord() }}>
          <Input placeholder="Nombre de Usuario" value={user_name} onChange={(e) => { setUser_name(e.target.value) }} />
          <Input placeholder="Codigo de seguridad" value={securityCode} onChange={(e) => { setSecurityCode(e.target.value) }} />
          <div style={{ display: "flex", flexDirection: "row", marginTop: "15px" }}>
            <Buttom label="Vereficar" type="submit" />
            <Buttom label="Cancelar" estilo="negativo" action={() => cancel(false)} />
          </div>
        </form>

      </ModalBase>)}
      {isCorrect && (
        <ModalBase>
          <p>Cambia tu contrasena</p>
          {showError && (<p>{message}</p>)}
          <form onSubmit={(e) => {e.preventDefault();saveAll(cancel)}}>
            <Input
            name="userNewPassword"
            type="password"
            placeholder="Nueva contrasena"
            value={userFirstPass}
            onChange={(e) => setUserFirstPass(e.target.value)}
          ></Input>
          <Input
            name="userNewPassword"
            type="password"
            placeholder="Confirmar contrasena"
            value={userSecondPass}
            onChange={(e) => setUserSecondPass(e.target.value)}
          ></Input>
          <Buttom label="Cambiar" type="submit"/>
          <Buttom label="Cancelar" estilo="negativo"/>
          </form>
        </ModalBase>
      )}
    </div>
  )
}

export default ModalPassword