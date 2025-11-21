import Card from "../components/Card/Card";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

function MainMenu() {
   useEffect(() => {
    const socket = io("http://localhost:5000");
    socket.on("repairStatusChanged", (data) => {
        console.log("Cambio detectado:", data);
        // Aquí haces tu alerta, notificación o refresco de tabla
    });
   }, [])
   
    const [menuItem, setMenuItem] = useState([])
    useEffect(() => {
        const data = JSON.parse(atob(localStorage.getItem("menuList")));
        setMenuItem(data)
    }, [])

    return (
        <div>
            {menuItem.map((item) => (<Card key={item.menu_label} menu_label={item.menu_label} menu_path={item.menu_path} />))}
        </div>
    )
}

export default MainMenu;