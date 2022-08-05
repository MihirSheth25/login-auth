import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useToken from "./Components/Login/useToken";
import "./App.css";

import Home from "./Components/Pages/Home";
import About from "./Components/Pages/About";
import Products from "./Components/Pages/Products";
// import Navbar from "./Components/UI/Nav/Navbar";
import Navbar2 from "./Components/UI/Nav/Navbar2";
import Login from "./Components/Login/Login";
// import Confirm from "./Components/Login/PassReset/Confirm";
import ResetPassword from "./Components/Login/PassReset/Test";

function App() {
  const { token, setToken } = useToken();

  // before login => no token is received; none of the routes in the navbar will work
  if (!token) {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Login setToken={setToken}>
                  <Navbar2 />
                </Login>
              }
            >
              <Route
                exact
                path="/"
                element={
                  <Login setToken={setToken}>
                    <Home />
                  </Login>
                }
              />
              <Route
                exact
                path="/home"
                element={
                  <Login setToken={setToken}>
                    <Home />
                  </Login>
                }
              />
              <Route
                exact
                path="/about"
                element={
                  <Login setToken={setToken}>
                    <About />
                  </Login>
                }
              />
              <Route
                exact
                path="/products"
                element={
                  <Login setToken={setToken}>
                    <Products />
                  </Login>
                }
              />
            </Route>
            <Route
              exact
              path="/reset-password/:token"
              element={<ResetPassword />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }

  // once the token is received on a successful login, all other pages can be accessed through navbar
  // reference for navbar routing => https://www.w3schools.com/REACT/react_router.asp
  // return (

  // );
}

export default App;
