import * as React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { useSnackbar } from "notistack";

// Icons
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// Hooks
import { useTodos } from "../contexts/TodosContext";

export default function Todo({ todo, openDeleteDialog, openUpdateDialog }) {
  const { todos, dispatch } = useTodos();

  // Another Way to use snack bar
  // const { setOpenCloseToast } = useContext(ToastContext);

  const { enqueueSnackbar } = useSnackbar();

  // Event Handlers
  function handleCheckButton() {
    dispatch({ type: "complete", payload: todo });

    enqueueSnackbar(
      todo.isCompleted
        ? "Task marked as incomplete"
        : "Task completed successfully 🎉",
      { variant: "success" }
    );

    // setOpenCloseToast({
    //   action: true,
    //   message: todo.isCompleted
    //     ? "Task marked as incomplete"
    //     : "Task completed successfully 🎉",
    //   severity: "success",
    // });
  }

  // Delete Button Handler
  function handleDeleteClick() {
    openDeleteDialog(todo);
  }

  // Update Button Handler
  function handleUpdateClick() {
    openUpdateDialog(todo);
  }

  // Event Handlers

  return (
    <Card
      className="todoCard"
      sx={{
        minWidth: 275,
        background: "lightblue",
        color: "white",
        marginTop: 3,
      }}
    >
      <CardContent>
        <Grid container spacing={2}>
          <Grid size={8} style={{ textAlign: "left" }}>
            <Typography
              variant="h4"
              style={{
                textDecoration: todo.isCompleted ? "line-through" : "none",
              }}
            >
              {todo.title}
            </Typography>
            <Typography variant="h6">{todo.details}</Typography>
          </Grid>
          <Grid
            size={4}
            display="flex"
            justifyContent="space-around"
            alignItems="center"
          >
            <IconButton
              className="iconButton"
              style={{
                background: todo.isCompleted ? "green" : "white",
                color: todo.isCompleted ? "white" : "green",
                border: "solid green 1px",
              }}
              onClick={handleCheckButton}
            >
              <CheckIcon />
            </IconButton>

            {/* Update Task Button */}

            <React.Fragment>
              <IconButton
                className="iconButton"
                style={{
                  background: "white",
                  color: "blue",
                  border: "solid blue 1px",
                }}
                onClick={handleUpdateClick}
              >
                <EditIcon />
              </IconButton>
            </React.Fragment>
            {/* Update Task Button */}

            {/* Delete Task Buttom */}
            <React.Fragment>
              <IconButton
                className="iconButton"
                style={{
                  background: "white",
                  color: "red",
                  border: "solid red 1px",
                }}
                onClick={handleDeleteClick}
              >
                <DeleteIcon />
              </IconButton>
            </React.Fragment>

            {/* Delete Task Buttom */}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
