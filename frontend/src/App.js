//Aqui haremos las rutas, aqui solo llaman a las pages junto con su URL
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home"
import MainMenu from "./pages/MainMenu/MainMenu";
import ProtectedRoute from "./middleware/ProtectedRoute";
import Alert from "./components/Alert/Alert";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>

        <Route path="/main" element={<ProtectedRoute><Alert><MainMenu/></Alert></ProtectedRoute>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="*" element={<h1>LOST</h1>}/>
        <Route path="/component" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
