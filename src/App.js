import "./App.css";
import TodoList from "./components/TodoList";
import { TodosContext } from "./contexts/TodosContext";
import { ToastContext } from "./contexts/ToastContext";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green, purple } from "@mui/material/colors";
import MySnackBar from "./components/MySnackBar";
import { SnackbarProvider } from "notistack";
import Slide from "@mui/material/Slide";

const initialTodos = [
  {
    id: uuidv4(),
    title: "Task 1",
    details: "Details 1",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "Task 2",
    details: "Details 2",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "Task 3",
    details: "Details 3",
    isCompleted: false,
  },
];

// Edit Theme Options
const theme = createTheme({
  // palette: {
  //   primary: {
  //     main: purple[500],
  //   },
  // },
});

function App() {
  const [todos, setTodos] = useState(initialTodos);

  // Another way to use snack bar

  // const [openCloseToast, setOpenCloseToast] = useState({
  //   action: false,
  //   message: "",
  //   severity: "success", // default type
  // });

  return (
    <SnackbarProvider
      maxSnack={3} // max number of snackbars at once
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }} // bottom-right
      autoHideDuration={3000} // auto hide after 3s
      TransitionComponent={(props) => <Slide {...props} direction="right" />} // Slide up transition
    >
      <div
        className="App"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "lightGray",
        }}
      >
        {/* <MySnackBar /> */}
        {/* Another way to use snack bar */}

        <ThemeProvider theme={theme}>
          <TodosContext.Provider value={{ todos, setTodos }}>
            <TodoList />
          </TodosContext.Provider>
        </ThemeProvider>
      </div>
    </SnackbarProvider>
  );
}

export default App;
