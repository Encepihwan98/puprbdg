import React from "react";
import { Navbar } from "react-bootstrap";
import Logo from "../assets/images/puprbdg.png";
// import User from "../assets/images/user.png";
import "bootstrap/dist/css/bootstrap.min.css";
// import "../assets/css/style.css";
import "../assets/css/style2.css";

const Navbar2 = () => {
  return (
    <div>
      <Navbar className="navbar-shadow bg-white navbar-size" expand="lg">
        <Navbar.Brand href="#home">
          <img alt="React Bootstrap logo" src={Logo} className="navbar-logo" />
        </Navbar.Brand>
        <Navbar.Brand href="#home" className="inter-25 fw-500 menu1">
          Dashboard
        </Navbar.Brand>
        <Navbar.Brand href="#home" className="inter-25 fw-500 menu2">
          Office
        </Navbar.Brand>
        {/* <Navbar.Brand className="user-menu ms-auto mrg-50">
          <Navbar.Text className="inter">Jhon Doe</Navbar.Text>
          <Navbar.Brand>
            <img alt="PUPR Logo" src={User} width="56" height="76" className="navbarUser" />
          </Navbar.Brand>
        </Navbar.Brand> */}
      </Navbar>
    </div>
  );
};

export default Navbar2;
