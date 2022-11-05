import React, { FC } from "react";
import styles from "./header.module.scss";

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>Hacker News</h1>
        <h2 className={styles.subtitle}>Последние новости в мире it</h2>
      </div>
    </header>
  );
};
