// import logo from './logo.svg';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import './App.css';
import NavigationBar from './components/NavigationsBar';
import Dashboard from "./pages/dasboard/Dashboard";
import Office from "./pages/office/Office";
import Dashboard2 from "./pages/dasboard/FixDashboard"

function App() {
  return (
    <div className="myBg">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard/>}></Route>
          <Route path="/office" element={<Office/>}></Route>
          <Route path="/Dashboard2" element={<Dashboard2/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
