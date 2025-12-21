//Aqui haremos las rutas, aqui solo llaman a las pages junto con su URL
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./modules/Login/pages/Login";
import Home from "./modules/Home/pages/Home"
import MainMenu from "./modules/MainMenu/pages/MainMenu";
import Users from "./modules/User/pages/Users";
import MasterLayout from "./middleware/MasterLayout";
import MyJobs from "./modules/MyJobs/pages/MyJobs";
import RepairJob from "./modules/RepairJob/pages/RepairJob";
import History from "./modules/History/pages/History";
import Repuesto from "./modules/Repuesto/pages/Repuesto";
import Servicio from "./modules/Servicio/pages/Servicio";
import ChatPage from "./modules/ChatM/page/ChatPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />

      <Route element={<MasterLayout/>}>
        <Route path="/main" element={<MainMenu />} />
        <Route path="*" />
        <Route path="/users" element={<Users />} />
        <Route path="/jobs" element={<ChatPage/>} />
        <Route path="/repair/:id" element={<RepairJob/>} />
        <Route path="/historial" element={<History/>}/>
        <Route path="/repuestos" element={<Repuesto/>}/>
        <Route path="/servicios" element={<Servicio/>}/>

      </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
