import { Alert, Snackbar } from "@mui/material";
import { useAlert } from "../hooks/alert/useAlert";

export const AlertCard = () => {
  const { alert, closeAlert } = useAlert();

  return (
    <Snackbar
      open={alert !== null}
      autoHideDuration={4000}
      onClose={closeAlert}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={closeAlert}
        severity={alert?.type}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {alert?.message}
      </Alert>
    </Snackbar>
  );
};
