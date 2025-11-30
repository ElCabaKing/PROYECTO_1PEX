import Input from "../Input/Input";
import Buttom from "../Buttom/Buttom";
import { useEffect } from "react";
import useModalAns from "../../hooks/useModalAns";
import { useNavigate } from "react-router-dom";
import styles from "../ModalAns/ModalAns.module.css"
function ModalAns(props) {
    const { userAnsWord,
        userFirstPass,
        userSecondPass,
        setUserFirstPass,
        setUserSecondPass,
        generateAns,
        saveAll,
        passError } = useModalAns();
        
    useEffect(() => {
        generateAns()
    }, [])

    return (
        <div className={styles.backdrop}>
            <div className={styles.modalAns}>
                <h1>Este es tu codigo de seguridad</h1>
                <h3>Guardalo bien es unico</h3>
                {userAnsWord}
                <h3>Ahora cambiaremos tu clave</h3>
                {passError && (<p>Las claves deben coincidir</p>)}
                <form onSubmit={(e) => {
                    e.preventDefault();
                    saveAll({ ans: userAnsWord, user_password: userSecondPass, user_name: props.user_name })
                }}>
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
                    <Buttom
                        type="submit"
                        label="Terminado"
                    />
                </form>
            </div>
        </div>
    )
}

export default ModalAns