
import Card from "../Card/Card"
import { useState, useEffect } from "react";
import styles from "../MenuLeft/MenuLeft.module.css"
import img from "../../media/Logo.avif"
function MenuLeft({ children }) {
    const [showMenu, setShowMenu] = useState(false)
    const [menuItem, setMenuItem] = useState([])
    useEffect(() => {
        const data = JSON.parse(atob(localStorage.getItem("menuList")));
        setMenuItem(data)
    }, [])
    return (
        <div className={styles.pageContainer}>
            <button className={styles.showButton} onClick={() => setShowMenu(true)}>Tre rayta</button>
            <div className={`${styles.menuContainer} ${showMenu ? styles.menuContainerExtra : ""}`}>
                <div>
                    <img src={img}></img>
                    <button className={styles.showButton} onClick={() => setShowMenu(false)}>X</button>
                </div>
                <Card menu_label="Home" menu_path="/main"></Card>
                {menuItem.map((item) => (<Card key={item.menu_label} menu_label={item.menu_label} menu_path={item.menu_path} />))}
                <div className={styles.last}>
                    <Card menu_label="LogOut" />
                </div>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}

export default MenuLeft