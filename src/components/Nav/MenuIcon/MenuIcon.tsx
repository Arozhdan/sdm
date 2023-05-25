import { FC } from "react";
import styles from "./MenuIcon.module.css";
export const MenuIcon: FC = () => {
  return (
    <div className={styles.icon}>
      <span className={styles.line}></span>
      <span className={styles.line}></span>
      <span className={styles.line}></span>
    </div>
  );
};
