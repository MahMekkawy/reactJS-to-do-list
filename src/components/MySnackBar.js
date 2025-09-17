import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import Alert from "@mui/material/Alert";
import { useContext } from "react";
import { ToastContext } from "../contexts/ToastContext";

function SlideTransition(props) {
  return <Slide {...props} direction="right" />;
}

export default function MySnackBar() {
  const { openCloseToast, setOpenCloseToast } = useContext(ToastContext);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenCloseToast({
      ...openCloseToast,
      action: false,
    });
  };

  return (
    <div>
      <Snackbar
        open={openCloseToast.action}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        slots={{ transition: SlideTransition }}
      >
        <Alert
          onClose={handleClose}
          severity={openCloseToast.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {openCloseToast.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
