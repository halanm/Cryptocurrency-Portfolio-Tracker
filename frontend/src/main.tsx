import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { AppRoutes } from "./routes/AppRoutes";

import "./index.css";

import "@rainbow-me/rainbowkit/styles.css";
import { Providers } from "./components/Providers";
import { AlertCard } from "./components/AlertCard";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Providers>
        <AppRoutes />
        <AlertCard />
      </Providers>
    </BrowserRouter>
  </StrictMode>
);
