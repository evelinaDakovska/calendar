import { v4 as uuidv4 } from "uuid";
import styles from "./Calendar.module.scss";

export const DayName = ({ name }: { name: string }) => {
  return (
    <div key={uuidv4()} className={styles["day-name"]}>
      {name}
    </div>
  );
};
