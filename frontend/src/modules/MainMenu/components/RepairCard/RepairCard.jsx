import styles from './RepairCard.module.css'
function RepairCard({id,modelo,status_label,repair_problem,action}) {
  return (
    <>
    <button className={styles.cards} onClick={() => action(id,2)}>
        <p className={styles.id}>ID: {id}</p>
        <p>Modelo: {modelo}</p>
        <p>Estado: {status_label}</p>
        <p>Problema: {repair_problem}</p>
    </button>
    </>
  )
}

export default RepairCard