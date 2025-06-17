import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { AppRoutes } from "./routes/AppRoutes";

import "./index.css";

import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0f5bbc",
    },
    secondary: {
      main: "#e0e0e0",
    },
    text: {
      primary: "#0d0d0d",
      secondary: "#7c7c7c",
    },
  },
  typography: {
    fontFamily: ["Inter", "Space Grotesk"].join(","),
  },
  cssVariables: true,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AppRoutes />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
