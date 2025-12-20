import useLogin from "../hooks/useLogin";
import icon from "../../../media/icon.avif"
import logo from "../../../media/Logo.avif"
import styles from "./Login.module.css"
import Input from "../../../components/Input/Input";
import Buttom from "../../../components/Buttom/Buttom";
import ModalAns from "../components/ModalAns/ModalAns";
import ModalPassword from "../components/ModalPassword/ModalPassword";
function Login() {
    const { validateLogin,
        message,
        showMessage,
        showFirstLoginModal,
        showRecoveryModal,
        setShowRecoveryModal,
        user_nombre,
        setUser_nombre,
        user_password,
        setUser_password,
        navigate } = useLogin()


    return (
        <div className={styles.loginContainer}>
            <div className="container container--row ">
                <Buttom action={() => navigate('/')} label="<-" extraClass={styles.backButtom} />
                <div className={styles.content}>
                    <div className={styles.imgContainer}>

                        <p>Iniciar sesion</p>
                        <img alt="logo" src={logo}></img>
                    </div>
                    {showMessage && (<p className={styles.message}>{message}</p>)}
                    <form onSubmit={(e) => { e.preventDefault(); validateLogin({ user_nombre: user_nombre, user_password: user_password }) }}>
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
                            <span className={styles.span} onClick={() => setShowRecoveryModal(true)}>Has olvidado tu contraseña?</span>
                        </p>
                        <Buttom
                            type="submit"
                            label="Iniciar Sesion"
                            estilo="base"
                            extraClass={styles.logInButtom}
                        />
                    </form>
                </div>
                <div className={`${styles.imgContainer} ${styles.imgContainerBg} ${styles.hideScreen}`}>
                    <img alt="icon" src={icon}></img>
                    <p>Reparamos rápido <br /> cuidamos tu confianza</p>
                </div>
                {showFirstLoginModal && (<ModalAns user_name={user_nombre} />)}
                {showRecoveryModal && (<ModalPassword cancel={setShowRecoveryModal} />)}
            </div>
        </div>
    )
}
export default Login;