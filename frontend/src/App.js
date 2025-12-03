//Aqui haremos las rutas, aqui solo llaman a las pages junto con su URL
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home"
import MainMenu from "./pages/MainMenu/MainMenu";
import Users from "./pages/Users/Users";
import MasterLayout from "./middleware/MasterLayout";
import MyJobs from "./pages/MyJobs/MyJobs";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />

        <Route path="/main" element={<MasterLayout><MainMenu /></MasterLayout>} />
        <Route path="*" element={<MasterLayout></MasterLayout>} />
        <Route path="/users" element={<MasterLayout><Users /></MasterLayout>} />
        <Route path="/jobs" element={<MasterLayout><MyJobs/></MasterLayout>} />
        <Route path="/component" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
