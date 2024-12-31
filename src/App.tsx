import React from "react";
import styles from "./index2.module.scss";
import "./index.scss";

const App = () => {
  console.log(styles);

  return <div className={styles["container"]}>hello React TS</div>;
};

export default App;
