import Card from "../components/Card/Card";


function MainMenu(){
    const permisos = JSON.parse(atob(localStorage.getItem("menuList")));

    return(
        <div>
            {permisos.map((item) => (<Card menu_label={item.menu_label} menu_path={item.menu_path} />))}
        </div>
    )
}

export default MainMenu;