import { useNavigate } from "react-router-dom"
import Input from '../../components/Input/Input'
import useHome from "../../hooks/useHome";
function Home() {
    const { codeNumber, setCodeNumber, hkSearchCode } = useHome();
    const navigate = useNavigate();
    return (
        <div className="container container--column">
            <p>Tienes un producto con nosotros?</p>
            <p>Ingresa su codigo aqui</p>
            <form onSubmit={(e) => {
                e.preventDefault(); // evita reload
                hkSearchCode();
            }}>
                <Input name="codeNumber"
                    type="text"
                    value={codeNumber}
                    onChange={(e) => setCodeNumber(e.target.value)}
                    pattern="\d+"
                    title="Solo numeros"
                    placeholder="Codigo" />
                <button>Buscar</button>
            </form>
            <p>Eres un empleado ingresa aqui</p>
            <button onClick={() => navigate('/login')}>Ir al login</button>

        </div>
    )
}

export default Home;