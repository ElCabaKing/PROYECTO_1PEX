//Aqui haremos las rutas, aqui solo llaman a las pages junto con su URL
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home"
import MainMenu from "./pages/MainMenu/MainMenu";
import Users from "./pages/Users/Users";
import MasterLayout from "./middleware/MasterLayout";
import MyJobs from "./pages/MyJobs/MyJobs";
import RepairJob from "./pages/RepairJob/RepairJob";
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
        <Route path="/jobs" element={<MyJobs/>} />
        <Route path="/repair/:id" element={<RepairJob/>} />
        <Route path="/component" />
      </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
