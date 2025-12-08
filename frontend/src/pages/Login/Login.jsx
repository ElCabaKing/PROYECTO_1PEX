import { useState } from "react"
import useLogin from "../../hooks/useLogin";
import icon from "../../media/icon.avif"
import logo from "../../media/Logo.avif"
import styles from "../Login/Login.module.css"
import Input from "../../components/Input/Input";
import Buttom from "../../components/Buttom/Buttom";
import ModalAns from "../../components/ModalAns/ModalAns";
import ModalPassword from "../../components/ModalPassword/ModalPassword";
import {  useNavigate } from "react-router-dom";
function Login() {
    const { hkValidateLogin, hkmLogin, hkbLogin, hkRecoveryModal, sethkRecoveryModal,hkmodalShow} = useLogin()
    const [user_nombre, setUser_nombre] = useState('');
    const [user_password, setUser_password] = useState('');
    const navigate = useNavigate()

    return (
        <div className={styles.loginContainer}>
        <div className="container container--row ">
            <Buttom action={() => navigate('/')} label="<-" extraClass={styles.backButtom}/>
            <div className={styles.content}>
                <div className={styles.imgContainer}>

                    <p>Iniciar sesion</p>
                    <img alt="logo" src={logo}></img>
                </div>
                {hkbLogin && (<p className={styles.message}>{hkmLogin}</p>)}
                <form onSubmit={(e) => {e.preventDefault();hkValidateLogin({ user_nombre: user_nombre, user_password: user_password })}}>
                <Input
                    name="user_name"
                    type="text"
                    value={user_nombre}
                    onChange={(e) => setUser_nombre(e.target.value)}
                    placeholder="Nombre de Usuario"
                />
                <Input
                    name="user_password"
                    type="password"
                    value={user_password}
                    onChange={(e) => setUser_password(e.target.value)}
                    placeholder="Contrasena"
                />
                <p className={styles.pDirect}>
                     <span className={styles.span}onClick={() => sethkRecoveryModal(true)}>Has olvidado tu contraseña?</span>
                </p>
                <Buttom
                    type="submit"
                    label="Iniciar Sesion"
                    estilo="base"
                />
                </form>
            </div>
            <div className={`${styles.imgContainer} ${styles.imgContainerBg} ${styles.hideScreen}`}>
                <img alt="icon" src={icon}></img>
                <p>Reparamos rápido <br/> cuidamos tu confianza</p>
            </div>
            {hkmodalShow && (<ModalAns user_name={user_nombre}/>)}
            {hkRecoveryModal && (<ModalPassword cancel={sethkRecoveryModal}/>)}
        </div>
        </div>
    )
}
export default Login;