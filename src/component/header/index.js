import React from "react";
import "./header.css";
import Logo  from "../../Images/psw_logo.png";
import { Link } from "react-router-dom";


const Header = () =>{
    return(
        <div id="main">
            <nav className="navbar navbar-expand-lg navbar-dark scrolling-navbar navbar-fixed">
                <div className="container-fluid">

                    <div className="logo">
                        <img src={Logo} />
                    </div>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                        <ul className="navbar-nav ml-auto">
                            <i className="fas fa-search" ></i>
                            <i className="fas fa-bell" ></i>
                            <li className="nav-item active">
                                <Link to="/login" className="nav-link" style={{color: '#5A5E7C', fontWeight:'bolder'}} >Logout
                                    <span className="sr-only">(current)</span>
                                </Link>
                            </li>
                            <i className="fas fa-user" ></i>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
export default Header