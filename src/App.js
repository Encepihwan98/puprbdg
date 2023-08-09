// import logo from './logo.svg';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import './App.css';
import './assets/css/style2.css';
import './assets/css/mobile.css';
import Dashboard from "./pages/dasboard/Dashboard";
import Dashboard2 from "./pages/dasboard/Dashboard2";
import Tabel  from "./pages/tabel/Tabel";
import Office from "./pages/office/Office";


function App() {
  return (
    <div className="myBg">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard/>}></Route>
          <Route path="/office" element={<Office/>}></Route>
          <Route path="/dashboard2" element={<Dashboard2/>}></Route>
          <Route path="/tabel" element={<Tabel/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
