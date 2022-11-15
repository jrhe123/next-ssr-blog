import { useState, useEffect } from "react";
import type { NextPage } from "next";
import styles from "./index.module.scss";

type CountDownProps = {
  time?: number;
  onEnd: () => void;
};
const CountDown: NextPage<CountDownProps> = ({ time = 5, onEnd }) => {
  const [count, setCount] = useState<number>(time);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((count) => {
        if (count === 0) {
          clearInterval(id);
          onEnd && onEnd();
          return count;
        }
        return count - 1;
      });
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, [time, onEnd]);

  return <div className={styles.countDown}>{count}</div>;
};

export default CountDown;
