import { Button } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import WalletIcon from "@mui/icons-material/Wallet";

export const WalletLoginButton = () => {
  return (
    <ConnectButton.Custom>
      {({ openConnectModal, mounted }) => {
        return (
          <Button
            disabled={!mounted}
            onClick={openConnectModal}
            variant="contained"
            color="secondary"
            fullWidth
            startIcon={<WalletIcon />}
          >
            Login with Wallet
          </Button>
        );
      }}
    </ConnectButton.Custom>
  );
};
