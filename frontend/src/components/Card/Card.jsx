import { useNavigate } from "react-router-dom";
import styles from "./Card.module.css";
import { LogOut } from "../../api/login.api";
const Card = (props) => {
  const navigate = useNavigate()
  async function closeSession() {
    const res = await LogOut();
    console.log(res)
    if(res.logout){
    localStorage.clear();
    navigate("/login")}
  }
  return (
    <button className={styles.card} onClick={() => {props.closefun();props.menu_path ? navigate(props.menu_path) : closeSession()}}>
      <h2 className={styles.title} >{props.menu_label}</h2>
    </button>
  )
}

export default Card