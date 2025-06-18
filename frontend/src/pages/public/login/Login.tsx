import { Container, Box, Paper } from "@mui/material";
import { FormHeader } from "./components/FormHeader";
import { LoginForm } from "./components/LoginForm";
import { FormDivider } from "./components/FormDivider";
import { WalletLoginButton } from "./components/WalletLoginButton";
import { SignupLink } from "./components/SignupLink";

export function Login() {
  return (
    <Container maxWidth="sm">
      <Box mt={8} textAlign={"start"}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <FormHeader />
          <LoginForm />
          <FormDivider />
          <WalletLoginButton />
          <SignupLink />
        </Paper>
      </Box>
    </Container>
  );
}
