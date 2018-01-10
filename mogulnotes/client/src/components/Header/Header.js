import React from "react";
import './Header.css';

const Header = () =>
  <nav>
    <div class="nav-wrapper">
      <a href="#!" className="brand-logo left">Mogul Notes <img className = "responsive-img imglogo" src="./favicon.ico"/></a>
      <ul class="right ">
        <li><a href='#'>Search</a></li>
        <li class="active"><a href='#'>Save</a></li>
      </ul>
    </div>
  </nav>;
export default Header;
