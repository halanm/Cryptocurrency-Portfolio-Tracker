import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { AppRoutes } from "./routes/AppRoutes";

import "./index.css";

import { createTheme, ThemeProvider } from "@mui/material";

import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet, base } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

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
      secondary: "#696969",
    },
  },
  typography: {
    fontFamily: ["Inter", "Space Grotesk"].join(","),
  },
  cssVariables: true,
});

const config = getDefaultConfig({
  appName: import.meta.env.VITE_WALLET_CONNECT_CLOUD_PROJECT_NAME || "CPT",
  projectId: import.meta.env.VITE_WALLET_CONNECT_CLOUD_PROJECT_ID || "",
  chains: [mainnet, base],
});

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <ThemeProvider theme={theme}>
              <AppRoutes />
            </ThemeProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </BrowserRouter>
  </StrictMode>
);
