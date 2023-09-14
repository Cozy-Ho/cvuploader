"use client";

import styles from "./page.module.css";
import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(prev => prev + 1);
  };
  return (
    <main className={styles.main}>
      <div onClick={handleClick}>{`Hello world! ${count}`}</div>
    </main>
  );
}
