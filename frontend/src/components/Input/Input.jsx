
import styles from "./Input.module.css"


const Input = (props) => {
  return (
    <input
      name={props.name}
      className={styles.cmpInput}
      type={props.type}
      pattern={props.pattern}
      title={props.title}
      value={props.value}
      onChange={props.onChange}
      placeholder={props.placeholder}
    />
  )
}

export default Input