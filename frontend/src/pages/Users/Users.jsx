import { useEffect } from "react";
import UseUser from "../../hooks/useUsers"
import Buttom from "../../components/Buttom/Buttom"
import styles from "../Users/Users.module.css"
import ModalUser from "../../components/ModalUser/ModalUser";
function Users() {
  const { hkgetUser, userList, roles_list, message, hkchangeRole,
    showAlert, hkalerStatus, showNewUserFrom, setShowNewUserFrom,
    hksaveUser, indexMaxList, setIndexNum,indexNum } = UseUser();
  useEffect(() => {
    hkgetUser();
  }, [indexNum])

  return (
    <>
      <div className={styles.buttomContainer}>
        <h1>Usuarios</h1>

        <Buttom action={setShowNewUserFrom} label="Nuevo usuario" />
        {showAlert && (<div>{message}</div>)}
      </div>
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
                <select defaultValue={user.rol_id}
                  onChange={(e) => hkchangeRole({ ID: user.ID, rol_id: e.target.value })}>
                  {roles_list.map((rol) => (<option key={rol.id} value={rol.id}>{rol.rol_nombre}</option>))}
                </select>
              </td>
              <td><button value={user.estado} onClick={(e) => hkalerStatus({ ID: user.ID, estado: e.target.value })} >{user.estado ? "Activo" : "Inactivo"}</button></td>
            </tr>))}
          </tbody>
        </table>
        <select onChange={(e) => {setIndexNum(e.target.value)}}>
              {indexMaxList.map((num) => (<option value={num} key={num}>{num}</option>))}
        </select>
      </div>
      {showNewUserFrom && (<ModalUser saveUser={hksaveUser} closeModal={setShowNewUserFrom} rol_list={roles_list} />)}
    </>
  )
}

export default Users