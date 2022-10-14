import { useEffect } from "react";
import styles from "./loader.module.css";

const Loader = ({ loading }) => {
  useEffect(() => {
    if(loading) {
        document.body.style.height = "100vh";
        document.body.style.overflowY = "hidden";
        document.querySelector('.my-app').style.overflowY = "hidden";
    } else {
        document.body.style.overflowY = "auto";
        document.body.style.height = "fit-content";
        document.querySelector('.my-app').style.overflowY = "auto";
    }
  }, [loading]);

  return (
    loading && (
      <div className={styles.wrapper}>
        <div className={styles.ldsRing}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    )
  );
};

export default Loader;
