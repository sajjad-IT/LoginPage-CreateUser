import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./component/login/loginPage";
import CreateUser from "./component/CreateUser/CreateUser";
import Dashboard from "./component/Dashboard/DashboardHome/Dashboard";
import Sidebar from "./component/Dashboard/sidebar/sidebar";
import Topbar from './component/Dashboard/topbar/Topbar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/CreateUser" element={<CreateUser/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/sidebar" element={<Sidebar/>}/>
        <Route path="/topbar" element={<Topbar/>}/> 
      </Routes>
    </Router>
      
    
  );
}

export default App;
