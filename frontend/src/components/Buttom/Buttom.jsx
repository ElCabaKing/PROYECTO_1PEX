import styles from "./Buttom.module.css"
function Buttom(props) {
  return (
<<<<<<< HEAD
    <button className={styles.Buttom_base} onClick={props.action}>{props.label}</button>
=======
    <button 
    type={props.type} 
    className={styles.Buttom_base} 
    onClick={props.action}>{props.label}</button>
>>>>>>> ft/MainMenu
  )
}

export default Buttom