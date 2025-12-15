
import styles from "./Input.module.css"


const Input = ({name, type,pattern, title, value, onChange, placeholder, maxLength}) => {
  return (
    <input
      name={name}
      className={styles.cmpInput}
      type={type}
      pattern={pattern}
      title={title}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      maxLength={maxLength}
      required
    />
  )
}

export default Input