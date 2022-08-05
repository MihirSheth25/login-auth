/* MIHIR SHETH | 23-07-2022 */

// https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications => guide
import React, { useState } from "react";
import styles from "./Login.module.css";

import Form from "../UI/FormStyle/Form";
import Reset from "./PassReset/Reset";
import Error from "./../UI/Alerts/Error";
import passShowImg from "./../Assets/PasswordState/show-pass.svg";
import passHideImg from "./../Assets/PasswordState/hide-pass.svg";

// https://www.freecodecamp.org/news/how-to-use-proptypes-in-react/#:~:text=PropTypes%20are%20a%20good%20first,of%20React%20a%20dynamic%20touch. =>
/* import PropTypes from "prop-types"; */ // => line not necessary; used in debugging large apps

// sends data to backend
async function loginUser(credentials) {
  return fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

function Login({ setToken }) {
  // reads user input in the input fields
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordShown, setPasswordShown] = useState(false);

  const [errMsg, setErrMsg] = useState(false);
  const [resetForm, setResetForm] = useState(false);

  // prevents default behaviour of form where it redirects to a new page on submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      email,
      password,
    });
    // sets the token to token received from API enabling rest of the pages to be rendered on successful login
    setToken(token);
    if (setToken !== token) {
      setErrMsg(true);
    }
  };

  return (
    <div>
      {/* <Form /> --> custom component to provide styling */}
      <Form>
        <h3 className={styles.warning}>
          Please login to gain access to website
        </h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">
            Email:
            <input
              required
              type="email"
              id="email"
              onChange={(e) => {
                setEmail(e.target.value); // => records value in email inut field
                setErrMsg(false);
              }}
            />
          </label>
          <div className={styles.passContainer}>
            {/* https://stackblitz.com/edit/show-hide-password-react?file=src%2FApp.js => password visibility */}
            <label htmlFor="password">
              Password:
              <input
                className={styles.passInp}
                required
                type={passwordShown ? "text" : "password"}
                id="password"
                name="password"
                onChange={(e) => {
                  setPassword(e.target.value); // => records value in password input field
                  setErrMsg(false);
                }}
              />
              <img
                className={styles.passVisImg}
                title={passwordShown ? "Hide password" : "Show password"}
                alt="Password visibility"
                src={passwordShown ? passHideImg : passShowImg} // TODO --> EDIT
                // state keeps jumping from false to true and vice versa on click =>
                onClick={() => setPasswordShown((prevState) => !prevState)}
              />
            </label>
          </div>
          {errMsg && <Error errMsg="Invalid Credentials" />}
          <div>
            <button type="submit">Login</button>
          </div>
          <span className={styles.resBut} onClick={(e) => setResetForm(true)}>
            Forgot password?
          </span>
        </form>
        {/* invalid user message here --> useState */}
      </Form>
      {resetForm && <Reset onCancel={(e) => setResetForm(false)} />}
      {/* <BrowserRouter>
        <Routes>
          <Route exact path="/reset" element={<Reset />} />
        </Routes>
      </BrowserRouter> */}
    </div>
  );
}

/* Login.propTypes = {
   setToken: PropTypes.func.isRequired,
 }; */ // => lines not necessary

export default Login;
