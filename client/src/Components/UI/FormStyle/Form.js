/* MIHIR SHETH | 25-07-2022 */

/* universal custom component to wrap around all forms to give them a unified styling */
import React from "react";
import styles from "./Form.module.css";

function Form(props) {
  return <div className={styles.formDiv}>{props.children}</div>;
}
export default Form;
