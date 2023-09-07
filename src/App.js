// import logo from './logo.svg';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import './App.css';
import './assets/css/style2.css';
import './assets/css/mobile.css';
import Dashboard from "./pages/dasboard/Dashboard";
import Dashboard2 from "./pages/dasboard/Dashboard2";
import Tabel  from "./pages/tabel/Tabel";
import Office from "./pages/office/Office";
import Tabel2 from "./pages/accordion/Table"

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function App() {
  return (
    <div className="myBg">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard/>}></Route>
          <Route path="/office" element={<Office/>}></Route>
          <Route path="/dashboard2" element={<Dashboard2/>}></Route>
          <Route path="/tabel/:angka" element={<Tabel/>}></Route>
          <Route path="/tabel2/:angka" element={<Tabel2/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
