import { useNavigate } from "react-router-dom"
function Home(){
    const navigate = useNavigate();
    var codenumber = 0;
    return(
        <div className="container">
            <p>Tienes un producto con nosotros?</p>
            <p>Ingresa su codigo aqui</p>
            <input value={codenumber} readOnly></input>
            <button>Buscar</button>
            <p>Eres un empleado ingresa aqui</p>
            <button onClick={() => navigate('/login') }>Ir al login</button>
        </div>
    )
}

export default Home;