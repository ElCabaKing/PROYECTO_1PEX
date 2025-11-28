//Aqui haremos las rutas, aqui solo llaman a las pages junto con su URL
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home"
import MainMenu from "./pages/MainMenu/MainMenu";
import ProtectedRoute from "./middleware/ProtectedRoute";
import Alert from "./components/Alert/Alert";
import MenuLeft from "./components/MenuLeft/MenuLeft";
import ModalAns from "./components/ModalAns/ModalAns";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>

        <Route path="/main" element={<ProtectedRoute><Alert><MenuLeft><MainMenu/></MenuLeft></Alert></ProtectedRoute>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="*" element={<ProtectedRoute><MenuLeft><Alert> </Alert></MenuLeft></ProtectedRoute>}/>
        <Route path="/component" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
