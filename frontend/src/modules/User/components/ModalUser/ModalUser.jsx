import Input from '../../../../components/Input/Input'
import Button from '../../../../components/Buttom/Buttom'
import { useState } from 'react';
import styles from './ModalUser.module.css'
import ModalBase from '../../../../components/ModalBase/ModalBase';

function ModalUser({ rol_list, closeModal, saveUser }) {

    const [username, setUsername] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [idRol, setIdRol] = useState(1)

    function generateUsername(first, last) {
        const clean = (t) => t.toLowerCase().replace(/[^a-z0-9]/g, "");
        const num = Math.floor(Math.random() * 100);
        return `${clean(first)}_${clean(last)}${num}`;
    }

    function updateUsername(first, last) {
        if (!first && !last) return setUsername("");
        const temp = generateUsername(first, last);
        setUsername(temp);
    }

    return (
        <ModalBase>
            <form onSubmit={(e) => {e.preventDefault(); saveUser({ nombre: nombre, apellido: apellido, user_name: username, user_role: idRol })}}>
                <Input
                    onChange={(e) => {
                        const value = e.target.value;
                        setNombre(value);
                        updateUsername(value, apellido);
                    }}
                    placeholder="Nombre"
                />

                <Input
                    onChange={(e) => {
                        const value = e.target.value;
                        setApellido(value);
                        updateUsername(nombre, value);
                    }}
                    placeholder="Apellido"
                />

                <p>Nombre de usuario:</p>
                <p> {username}</p>

                <select className={styles.select} onChange={(e) => setIdRol(e.target.value)}>
                    {rol_list.map((rol) => (
                        <option key={rol.id} value={rol.id}>{rol.rol_nombre}</option>
                    ))}
                </select>
                <div className={styles.modalButtonContainer}>
                    <Button extraClass={styles.button} type='submit' label="Registrar" />
                    <Button extraClass={styles.button} estilo='negativo' action={() => closeModal(false)} label="Cancelar" />
                </div>
            </form>
        </ModalBase>
    );
}

export default ModalUser;
