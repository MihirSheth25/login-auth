// navbar file #2 is displayed after login and does not include the login page route and button

// alternative to using 2 navbars is to use vanilla javascript in the login.js react component =>
// use document.getElementByName... and change display to none in the handleSubmit function

import React from "react";
import { Outlet, Link } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar2() {
  return (
    <div>
      <nav className={styles.navbar}>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/product">Products</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default Navbar2;
