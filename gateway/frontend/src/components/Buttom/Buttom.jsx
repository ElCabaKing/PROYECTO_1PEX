import styles from "./Buttom.module.css"

function Buttom({
  type = "button",
  estilo = "base",
  label,
  action,
  disable,
  extraClass = ""
}) {
  
  const baseClass =
    estilo === "base" ? styles.Buttom_base : styles.Buttom_negative;

  return (
    <button
      type={type}
      className={`${baseClass} ${extraClass}`}
      disabled={disable}
      onClick={action}
    >
      {label}
    </button>
  );
}

export default Buttom;
