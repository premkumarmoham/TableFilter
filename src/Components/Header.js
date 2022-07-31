import React from "react";
import logo from '../images/logo.jpeg'
const Header=()=>{
    return(
        <nav class="navbar navbar-light bg-light">
        <a class="navbar-brand" href="#">
          <img className="m-2" src={logo} width="100" height="30" alt="KaayLabs" />
        </a>
      </nav>
    )
}

export default Header;