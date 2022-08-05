import React, { useState } from "react";
import Form from "../../UI/FormStyle/Form";
import styles from "./../Login.module.css";

import Error from "./../../UI/Alerts/Error";
import Accept from "../../UI/Alerts/Accept";

import axios from "axios";

function Reset(props) {
  const [email, setEmail] = useState("");
  const [errMsg, setErrMsg] = useState(false);
  const [accMsg, setAccMsg] = useState(false);

  const [resetLink, setResetLink] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/reset", {
        email: email,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data === "email not in db") {
          setErrMsg(true);
          setResetLink("");
        } else if (response.data) {
          setResetLink(response.data);
        } else if (response.data === "recovery email sent") {
          setErrMsg(false);
          setAccMsg(true);
        }
      })
      .catch((error) => {
        console.log(error.data);
      });
  };

  return (
    <div>
      <Form>
        <div className={styles.msg}>
          <h3>Forgot your password?</h3>
          <p>We'll send you an email with the link to reset your password</p>
        </div>
        <form onSubmit={sendEmail}>
          <input
            required
            id="email"
            type="email"
            placeholder="Authorised email"
            onChange={(e) => {
              setEmail(e.target.value);
              setErrMsg(false);
            }}
          />
          {errMsg && <Error errMsg="Email is not registered" />}
          {accMsg && <Accept accMsg="Recovery email sent" />}
          <button type="submit">Get link</button>
          <span className={styles.resBut} onClick={props.onCancel}>
            Cancel
          </span>
        </form>
      </Form>
      <a href={resetLink} target="blank">
        {resetLink}
      </a>
    </div>
  );
}
export default Reset;
