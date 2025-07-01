import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { mainnet, base } from "wagmi/chains";
import { AlertProvider } from "../providers/AlertProvider";
import { UserProvider } from "../providers/UserProvider";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTheme, ThemeProvider } from "@mui/material";
import { WalletAuthProvider } from "../providers/WalletAuthProvider";

export function Providers({ children }: { children: React.ReactNode }) {
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

  return (
    <AlertProvider>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <WalletAuthProvider>
            <RainbowKitProvider modalSize="compact">
              <ThemeProvider theme={theme}>
                <UserProvider>{children}</UserProvider>
              </ThemeProvider>
            </RainbowKitProvider>
          </WalletAuthProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </AlertProvider>
  );
}
