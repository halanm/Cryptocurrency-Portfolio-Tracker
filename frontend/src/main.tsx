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
import { UserProvider } from "./providers/UserProvider";

const theme = createTheme({
  palette: {
    background: {
      default: "#f7f7f7",
      paper: "#ffffff",
    },
    primary: {
      main: "#0060f2",
    },
    secondary: {
      light: "#f0f0f0",
      main: "#e0e0e0",
      dark: "#c0c0c0",
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
          <RainbowKitProvider modalSize="compact">
            <ThemeProvider theme={theme}>
              <UserProvider>
                <AppRoutes />
              </UserProvider>
            </ThemeProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </BrowserRouter>
  </StrictMode>
);
