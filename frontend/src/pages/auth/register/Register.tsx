import { Container, Box, Paper } from "@mui/material";
import { FormHeader } from "./components/FormHeader";
import { RegisterForm } from "./components/RegisterForm";
import { SignupLink } from "./components/SignupLink";

export function Register() {
  return (
    <Container maxWidth="sm">
      <Box mt={8} textAlign={"start"}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <FormHeader />
          <RegisterForm />
          <SignupLink />
        </Paper>
      </Box>
    </Container>
  );
}
