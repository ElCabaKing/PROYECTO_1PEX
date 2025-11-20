import styles from "./Buttom.module.css"
function Buttom(props) {
  return (
    <button className={styles.Buttom_base} onClick={props.action}>{props.label}</button>
  )
}

export default Buttom