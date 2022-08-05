import React from "react";
import styles from "./Alert.module.css";

function Accept(props) {
  return (
    <div className={styles.accept}>
      <span>{props.accMsg}</span>
      {props.children}
    </div>
  );
}
export default Accept;
