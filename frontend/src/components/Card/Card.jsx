import { useNavigate } from "react-router-dom";
import styles from "./Card.module.css";
import { LogOut } from "../../api/login.api";
const Card = ({menu_label, closefun, menu_path}) => {
  const navigate = useNavigate()
  async function closeSession() {
    const res = await LogOut();
    if(res.logout){
    localStorage.clear();
    navigate("/login")}
  }
  return (
    <button className={styles.card} onClick={() => {closefun();menu_path ? navigate(menu_path) : closeSession()}}>
      <h2 className={styles.title} >{menu_label}</h2>
    </button>
  )
}

export default Card