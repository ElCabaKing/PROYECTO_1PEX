import { useNavigate } from "react-router-dom";
import styles from "./Card.module.css";
import { appstLogOut } from "../../api/login.api";
const Card = (props) => {
  const navigate = useNavigate()
  async function closeSession() {
    const res = await appstLogOut();
    console.log(res)
    if(res.logout){
    navigate("/login")}
  }
  return (
    <div className={styles.card} onClick={() => props.menu_path ? navigate(props.menu_path) : closeSession()}>
      <h1 className={styles.title} >{props.menu_label}</h1>
    </div>
  )
}

export default Card