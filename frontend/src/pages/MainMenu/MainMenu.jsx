import Card from "../../components/Card/Card";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/AppContext"
function MainMenu() {
    const { user } = useContext(UserContext);
  

    const [menuItem, setMenuItem] = useState([])
    useEffect(() => {
        const data = JSON.parse(atob(localStorage.getItem("menuList")));
        setMenuItem(data)
    }, [])

    return (
        <div>
            {menuItem.map((item) => (<Card key={item.menu_label} menu_label={item.menu_label} menu_path={item.menu_path} />))}
            <button onClick={() => console.log(user)}>UserContext</button>
            {user.map((item) => (<p>{item.menu_label}</p>))}
        </div>
    )
}

export default MainMenu;