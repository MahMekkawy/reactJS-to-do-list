import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import ToggleButton, { toggleButtonClasses } from "@mui/material/ToggleButton";
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from "@mui/material/ToggleButtonGroup";
import { styled } from "@mui/material/styles";
import Todo from "./Todo";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { useSnackbar } from "notistack";

// Hooks
import { useState, useEffect, useMemo } from "react";
import { useTodos } from "../contexts/TodosContext";
import { ToastContext } from "../contexts/ToastContext";

// Delete Dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { type } from "@testing-library/user-event/dist/type";

// Toggle Buttons
const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  gap: "1rem",
  [`& .${toggleButtonGroupClasses.firstButton}, & .${toggleButtonGroupClasses.middleButton}`]:
    {
      borderTopRightRadius: (theme.vars || theme).shape.borderRadius,
      borderBottomRightRadius: (theme.vars || theme).shape.borderRadius,
    },
  [`& .${toggleButtonGroupClasses.lastButton}, & .${toggleButtonGroupClasses.middleButton}`]:
    {
      borderTopLeftRadius: (theme.vars || theme).shape.borderRadius,
      borderBottomLeftRadius: (theme.vars || theme).shape.borderRadius,
      borderLeft: `1px solid ${(theme.vars || theme).palette.divider}`,
    },
  [`& .${toggleButtonGroupClasses.lastButton}.${toggleButtonClasses.disabled}, & .${toggleButtonGroupClasses.middleButton}.${toggleButtonClasses.disabled}`]:
    {
      borderLeft: `1px solid ${
        (theme.vars || theme).palette.action.disabledBackground
      }`,
    },
}));

export default function TodoList() {
  const [titleInput, setTitleInput] = useState("");

  // const { setOpenCloseToast } = useContext(ToastContext);

  const [displayedTasksType, setDisplayedTasksType] = useState("all");

  const { enqueueSnackbar } = useSnackbar();

  const { todos, dispatch } = useTodos();

  // Toggle Buttons

  // const handleAlignment = (event, newAlignment) => {
  //   setAlignment(newAlignment);
  // };

  // Start Add Button
  function handleAddButtom() {
    dispatch({ type: "add", paylod: { title: titleInput } });

    setTitleInput("");

    enqueueSnackbar("New task added successfully ✨", { variant: "success" });

    // setOpenCloseToast({
    //   action: true,
    //   message: "New task added successfully ✨",
    //   severity: "success",
    // });
  }

  // End Add Button

  // Get Tasks From Local Storage
  useEffect(() => {
    dispatch({ type: "storage" });
  }, []);

  // ====== Delete Dialog ======
  const [handleDeleteDialog, setHandleDeleteDialog] = useState(false);
  const [targetedTodo, settargetedTodo] = useState({});

  function handleDeleteClick(t) {
    settargetedTodo(t);
    setHandleDeleteDialog(true);
  }

  function handleDeleteDialogClose() {
    setHandleDeleteDialog(false);
  }

  function handleDelete() {
    dispatch({ type: "delete", paylod: targetedTodo });

    setHandleDeleteDialog(false);

    enqueueSnackbar("Task deleted ❌", { variant: "error" });

    // setOpenCloseToast({
    //   action: true,
    //   message: "Task deleted ❌",
    //   severity: "error",
    // });
  }
  // ====== Delete Dialog ======

  // ====== Update Dialog ======

  const [handleUpdateDialog, setHandleUpdateDialog] = useState(false);

  function handleUpdateClick(t) {
    settargetedTodo(t);
    setHandleUpdateDialog(true);
  }

  function handleUpdateDialogClose() {
    setHandleUpdateDialog(false);
  }

  function handleUpdate() {
    dispatch({ type: "update", paylod: targetedTodo });

    setHandleUpdateDialog(false);
    enqueueSnackbar("Task updated ✏️", { variant: "info" });

    // setOpenCloseToast({
    //   action: true,
    //   message: "Task updated ✏️",
    //   severity: "info",
    // });
  }

  // ====== Update Dialog ======

  // ====== Tasks Filteration ======
  let tasksToDisplay = todos;

  const completedTasks = useMemo(() => {
    return todos.filter((t) => {
      return t.isCompleted;
    });
  }, [todos]);

  const notCompletedTasks = useMemo(() => {
    return todos.filter((t) => {
      return !t.isCompleted;
    });
  }, [todos]);

  if (displayedTasksType == "completed") {
    tasksToDisplay = completedTasks;
  } else if (displayedTasksType == "not-started") {
    tasksToDisplay = notCompletedTasks;
  } else {
    tasksToDisplay = todos;
  }

  function changeDisplayedTasksType(e) {
    setDisplayedTasksType(e.target.value);
  }

  const todosJSX = tasksToDisplay.map((t) => {
    return (
      <Todo
        key={t.id}
        todo={t}
        openDeleteDialog={handleDeleteClick}
        openUpdateDialog={handleUpdateClick}
      />
    );
  });

  // ====== Tasks Filteration ======

  return (
    <>
      {/* Delete Dialog */}
      <Dialog
        open={handleDeleteDialog}
        onClose={handleDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are You Sure You Want To Delete This Task?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This Action Can Not Be Canceld!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* Delete Dialog */}

      {/* Update Dialog */}
      <Dialog
        open={handleUpdateDialog}
        onClose={handleUpdateDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Set Task New Title And Details:"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Title"
            fullWidth
            variant="standard"
            value={targetedTodo.title}
            onChange={(e) => {
              settargetedTodo({
                ...targetedTodo,
                title: e.target.value,
              });
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Details"
            fullWidth
            variant="standard"
            value={targetedTodo.details}
            onChange={(e) => {
              settargetedTodo({
                ...targetedTodo,
                details: e.target.value,
              });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateDialogClose}>Cancel</Button>
          <Button onClick={handleUpdate} autoFocus>
            Update
          </Button>
        </DialogActions>
      </Dialog>
      {/* Update Dialog */}

      <Container maxWidth="md">
        <Card sx={{ minWidth: 275, maxHeight: "90vh", overflowY: "scroll" }}>
          <CardContent>
            <StyledToggleButtonGroup
              color="primary"
              value={displayedTasksType}
              exclusive
              onChange={changeDisplayedTasksType}
              aria-label="text alignment"
            >
              <ToggleButton value="all" aria-label="left aligned">
                All
              </ToggleButton>
              <ToggleButton value="not-started" aria-label="centered">
                Not Started
              </ToggleButton>
              <ToggleButton value="in-progress" aria-label="right aligned">
                In Progress
              </ToggleButton>
              <ToggleButton value="completed" aria-label="justified">
                Completed
              </ToggleButton>
            </StyledToggleButtonGroup>

            {todosJSX}

            {/* Add new Task */}

            <Grid container spacing={2} style={{ marginTop: "15px" }}>
              <Grid size={4}>
                <Button
                  variant="contained"
                  style={{ width: "100%", height: "100%" }}
                  onClick={handleAddButtom}
                  disabled={titleInput.length == 0}
                >
                  Add
                </Button>
              </Grid>
              <Grid size={8}>
                <TextField
                  id="outlined-basic"
                  label="New Task"
                  variant="outlined"
                  style={{ width: "100%" }}
                  value={titleInput}
                  onChange={(e) => {
                    setTitleInput(e.target.value);
                  }}
                />
              </Grid>
            </Grid>

            {/* Add new Task */}
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
