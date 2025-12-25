import { useEffect } from "react";
import UseUser from "../hooks/useUsers"
import Buttom from "../../../components/Buttom/Buttom"
import styles from "./Users.module.css"
import ModalUser from "../components/ModalUser/ModalUser";
function Users() {
  const { getUser, userList, roles_list, message, changeRole,
    showAlert, alertStatus, showNewUserFrom, setShowNewUserFrom,
    saveUser, indexMaxList, setIndexNum,indexNum } = UseUser();
  useEffect(() => {
    getUser();
  }, [indexNum])

  return (
    <>
      <div className={styles.buttomContainer}>
        <h2 style={{margin: "10px"}}>Usuarios</h2>
        <div>
        <Buttom extraClass={styles.MainButton} action={setShowNewUserFrom} label="Nuevo usuario" />
        </div>
        {showAlert && (<div>{message}</div>)}
      </div>
      <div className={styles.mainContainer}>
      <div className={styles.tableContainer}>
        <table className={styles.tabla}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Nombre de Usuario</th>
              <th>Rol</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user) => (<tr className={styles.fila} key={user.ID}>
              <td>{user.ID}</td>
              <td>{user.nombre}</td>
              <td>{user.apellido}</td>
              <td>{user.user_nombre}</td>
              <td>
                <select className={styles.select} defaultValue={user.rol_id}
                  onChange={(e) => changeRole({ ID: user.ID, rol_id: e.target.value })}>
                  {roles_list.map((rol) => (<option key={rol.id} value={rol.id}>{rol.rol_nombre}</option>))}
                </select>
              </td>
              <td><Buttom extraClass={styles.statusButton} value={user.estado} action={() => alertStatus(user.ID,user.estado)} label={user.estado ? "Activo" : "Inactivo"}/></td>
            </tr>))}
          </tbody>
        </table>
        
      </div>
      <select onChange={(e) => {setIndexNum(e.target.value)}}>
              {indexMaxList.map((num) => (<option value={num} key={num}>{num}</option>))}
        </select>
        </div>
      {showNewUserFrom && (<ModalUser saveUser={saveUser} closeModal={setShowNewUserFrom} rol_list={roles_list} />)}
    </>
  )
}

export default Users