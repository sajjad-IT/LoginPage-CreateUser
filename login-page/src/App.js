import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./component/login/loginPage";
import CreateUser from "./component/CreateUser/CreateUser";
import Dashboard from "./component/Dashboard/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/CreateUser" element={<CreateUser/>}/>
        <Route path="/Dashboard" element={<Dashboard/>}/>
      </Routes>
    </Router>
      
    
  );
}

export default App;
