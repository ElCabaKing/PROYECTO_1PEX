
import styles from "./Input.module.css"


const Input = ({name, type,pattern, title, value, onChange, placeholder, maxLength, min, extraClass}) => {
  return (
    <input
      name={name}
      className={`${styles.cmpInput} ${extraClass}`}
      type={type}
      pattern={pattern}
      title={title}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      maxLength={maxLength}
      min={min}
      required
    />
  )
}

export default Input