import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addTask, getTasks } from "../../slices/taskSlice";
import styles from "./Calendar.module.scss";

export const ModalComponent = ({
  openModalForDate,
  setOpenModal,
}: {
  openModalForDate: Date | undefined;
  setOpenModal: Dispatch<SetStateAction<Date | undefined>>;
}) => {
  const dispatch = useDispatch();
  const tasks = useSelector(getTasks);
  const [newTaskDesc, setNewTaskDesc] = useState<string>();
  const [currentDayTasks, setCurrentDayTasks] = useState<string[]>();

  useEffect(() => {
    if (openModalForDate) {
      const dailyTasks = tasks[openModalForDate?.toLocaleDateString()];
      if (dailyTasks) {
        setCurrentDayTasks(dailyTasks);
      } else {
        setCurrentDayTasks([]);
      }
    }
  }, [openModalForDate, tasks]);

  const addHandler = () => {
    if (openModalForDate) {
      dispatch(
        addTask({
          date: openModalForDate.toLocaleDateString(),
          taskDesc: newTaskDesc,
        })
      );
      setNewTaskDesc("");
    }
  };

  return (
    <Modal
      open={openModalForDate !== undefined}
      onClose={() => setOpenModal(undefined)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        {currentDayTasks &&
          currentDayTasks.map((current) => (
            <div key={uuidv4()}>
              <ListItem key={uuidv4()} disablePadding>
                <ListItemText id={uuidv4()} primary={current} />
              </ListItem>
              <Divider sx={{ margin: "5%" }} />
            </div>
          ))}
        <div className={styles.textField}>
          <TextField
            id="outlined-basic"
            multiline
            fullWidth
            label="Task description"
            variant="outlined"
            value={newTaskDesc}
            onChange={(e) => setNewTaskDesc(e.target.value)}
          />
          <Button onClick={addHandler} variant="text">
            Add task
          </Button>
        </div>
      </Box>
    </Modal>
  );
};
