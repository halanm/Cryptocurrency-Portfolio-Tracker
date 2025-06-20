import { ConnectButton } from "@rainbow-me/rainbowkit";

import WalletIcon from "@mui/icons-material/Wallet";
import { BaseButton } from "../../../../ui/BaseButton/BaseButton";

export const WalletLoginButton = () => {
  return (
    <ConnectButton.Custom>
      {({ openConnectModal, mounted }) => {
        return (
          <BaseButton
            disabled={!mounted}
            onClick={openConnectModal}
            variant="contained"
            color="secondary"
            fullWidth
            startIcon={<WalletIcon />}
          >
            Login with Wallet
          </BaseButton>
        );
      }}
    </ConnectButton.Custom>
  );
};
