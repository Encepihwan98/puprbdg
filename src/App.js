// import logo from './logo.svg';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import './App.css';
import './assets/css/style2.css';
import './assets/css/mobile.css';
import Dashboard from "./pages/dasboard/Dashboard";
import Office from "./pages/office/Office";


function App() {
  return (
    <div className="myBg">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard/>}></Route>
          <Route path="/office" element={<Office/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
