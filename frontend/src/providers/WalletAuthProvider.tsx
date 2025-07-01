import {
  createAuthenticationAdapter,
  RainbowKitAuthenticationProvider,
} from "@rainbow-me/rainbowkit";
import { createSiweMessage } from "viem/siwe";
import { api } from "../lib/axiosInstance";
import { AuthService } from "../services/authService";

export function WalletAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const authenticationAdapter = createAuthenticationAdapter({
    getNonce: async () => {
      const response = await api.get("/auth/nonce");
      return await response.data;
    },

    createMessage: ({ nonce, address, chainId }) => {
      return createSiweMessage({
        domain: window.location.host,
        address,
        statement: "Sign in with Ethereum to the app.",
        uri: window.location.origin,
        version: "1",
        chainId,
        nonce,
      });
    },

    verify: async ({ message, signature }) => {
      const res = await api.post("http://localhost:3000/auth/verify", {
        message,
        signature,
      });

      if (res.status !== 200 && res.status !== 201) {
        return false;
      }

      const { token, refresh_token } = res.data;
      AuthService.setTokens(token, refresh_token);
      window.location.href = "/";

      return true;
    },

    signOut: async () => {
      AuthService.clearTokens();
    },
  });

  return (
    <RainbowKitAuthenticationProvider
      adapter={authenticationAdapter}
      status={"unauthenticated"}
    >
      {children}
    </RainbowKitAuthenticationProvider>
  );
}
