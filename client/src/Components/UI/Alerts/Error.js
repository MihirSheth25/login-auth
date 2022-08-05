import React from "react";
import styles from "./Alert.module.css";

function Error(props) {
  return (
    <div className={styles.error}>
      <span>{props.errMsg}</span>
      {props.children}
    </div>
  );
}
export default Error;
