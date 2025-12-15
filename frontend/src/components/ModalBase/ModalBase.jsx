import styles from "../ModalBase/ModalBase.module.css"

function ModalBase({children}) {
  return (
    <div className={styles.backdrop}>
        <div className={styles.modalBase}>
            {children}
        </div>
    </div>
  )
}

export default ModalBase