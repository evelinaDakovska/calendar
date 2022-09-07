import Button from "@mui/material/Button";
import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./Calendar.module.scss";
import { DayCell } from "./DayCell";
import { DayName } from "./DayName";
import { ModalComponent } from "./Modal";
export const Calendar = () => {
  const [today, setToday] = useState<Date>();
  const [month, setMonth] = useState<number>();
  const [year, setYear] = useState<number>(0);
  const [firstDay, setFirstDay] = useState<number>(0);
  const [coefficient, setCoefficient] = useState<number>(0);
  const [openModalForDate, setOpenModalForDate] = useState<Date>();

  useEffect(() => {
    setToday(new Date());
  }, []);

  useEffect(() => {
    if (today) {
      setMonth(today.getMonth());
      setYear(today.getFullYear());
    }
  }, [today]);

  useEffect(() => {
    if (today && month) {
      setFirstDay(new Date(today.getFullYear(), month, 1).getDay());
    }
  }, [today, month]);

  useEffect(() => {
    if (today && firstDay) {
      setCoefficient(2 - firstDay);
    }
  }, [today, firstDay]);

  const dayNames = Array(7)
    .fill(true)
    .map((c, index) => {
      const date = new Date(2022, 7, 1 + index);
      const dayName = date.toLocaleString("bg", {
        weekday: "short",
      });
      return <DayName key={uuidv4()} name={dayName} />;
    });

  const days = useMemo(
    () =>
      year !== 0 &&
      Array(35)
        .fill(true)
        .map((current, index) => {
          if (month !== undefined) {
            const currentDate = new Date(year, month);
            currentDate.setDate(index + coefficient);
            return (
              <DayCell
                openModal={setOpenModalForDate}
                key={uuidv4()}
                day={currentDate}
                month={month}
              />
            );
          } else {
            return null;
          }
        }),
    [year, month, coefficient]
  );

  const nextMonthHandler = () => {
    if (month !== undefined) {
      const changedMonth = month + 1;
      if (changedMonth === 12) {
        setMonth(0);
        setYear((prev) => prev + 1);
      } else {
        setMonth(changedMonth);
      }
    }
  };

  const prevMonthHandler = () => {
    if (month !== undefined) {
      const changedMonth = month - 1;
      setMonth(changedMonth === -1 ? 11 : changedMonth);
      if (changedMonth === -1) {
        setYear((prev) => prev - 1);
      }
    }
  };

  const dateHeader =
    month !== undefined &&
    new Date(year, month).toLocaleString("en-US", {
      month: "long",
    });

  return (
    <div className={styles.contentContainer}>
      <h3 style={{ marginBottom: "0" }}>
        {dateHeader} {year}
      </h3>
      <div className={styles.btnContainer}>
        <Button
          onClick={prevMonthHandler}
          variant="outlined"
          sx={{ marginRight: "5%" }}
        >
          Previous month
        </Button>
        <Button onClick={nextMonthHandler} variant="outlined">
          Next month
        </Button>
      </div>
      <div className={styles.calendar}>
        {dayNames}
        {days}
      </div>
      <ModalComponent
        openModalForDate={openModalForDate}
        setOpenModal={setOpenModalForDate}
      />
    </div>
  );
};
