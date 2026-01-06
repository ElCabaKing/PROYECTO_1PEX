import styles from "./ModalBase.module.css"

function ModalBase({children, extraClass}) {
  return (
    <div className={styles.backdrop}>
        <div  className={`${styles.modalBase} ${extraClass}`}>
            {children}
        </div>
    </div>
  )
}

export default ModalBase