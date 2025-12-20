import Input from "../../../../components/Input/Input";
import Buttom from "../../../../components/Buttom/Buttom";
import { useEffect } from "react";
import useModalAns from "./useModalAns";
import styles from "./ModalAns.module.css"
import ModalBase from "../../../../components/ModalBase/ModalBase";
function ModalAns({user_name}) {
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
        <ModalBase>
                <h1>Este es tu codigo de seguridad</h1>
                <h3>Guardalo bien es unico</h3>
                {userAnsWord}
                <h3>Ahora cambiaremos tu clave</h3>
                {passError && (<p>Las claves deben coincidir</p>)}
                <form onSubmit={(e) => {
                    e.preventDefault();
                    saveAll({ ans: userAnsWord, user_password: userSecondPass, user_name: user_name })
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
                    <div className={styles.buttonContainer}>
                    <Buttom
                        extraClass={styles.button}
                        type="submit"
                        label="Terminado"
                    />
                    </div>
                </form>
            </ModalBase>
    )
}

export default ModalAns