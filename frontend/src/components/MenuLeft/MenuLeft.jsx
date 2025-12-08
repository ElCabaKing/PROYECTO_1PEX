
import Card from "../Card/Card"
import { useState, useEffect } from "react";
import styles from "../MenuLeft/MenuLeft.module.css"
import img from "../../media/Logo.avif"
function MenuLeft({ children }) {
    const [showMenu, setShowMenu] = useState(false)
    const [menuItem, setMenuItem] = useState([])
    const sidebar = "<"
    useEffect(() => {
        const stored = localStorage.getItem("menuList")
        if(stored){
        const data = JSON.parse(atob(stored));
        setMenuItem(data);}
    }, [])
    return (
        <div className={styles.pageContainer}>
            <div className={styles.buttonContainer}>
            <button className={styles.showButton} onClick={() => setShowMenu(true)}>{sidebar}</button>
            </div>
            <div className={`${styles.menuContainer} ${showMenu ? styles.menuContainerExtra : ""}`}>
                <div className={styles.menuUp}>
                    <div className={styles.logoContainer}>
                    <img className={styles.logo} src={img}></img>
                    </div>
                    <button className={styles.showButton} onClick={() => setShowMenu(false)}>X</button>
                </div>
                <Card closefun={setShowMenu} menu_label="Home" menu_path="/main"></Card>
                {menuItem.map((item) => (<Card closefun={setShowMenu} key={item.menu_label} menu_label={item.menu_label} menu_path={item.menu_path} />))}
                <div className={styles.last}>
                    <Card closefun={setShowMenu} menu_label="LogOut" />
                </div>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}

export default MenuLeft