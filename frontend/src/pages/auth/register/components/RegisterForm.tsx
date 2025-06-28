import { Box, TextField } from "@mui/material";
import { useState } from "react";
import { useLoginMutation } from "../../../../hooks/auth/useLoginMutation";
import { BaseButton } from "../../../../ui/BaseButton/BaseButton";

export function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: login } = useLoginMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(
      { email, password },
      {
        onSuccess: () => {
          window.location.href = "/";
        },
      }
    );
  };

  return (
    <Box onSubmit={handleSubmit} component="form" noValidate>
      <TextField
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        size="small"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        size="small"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <TextField
        label="Confirm Password"
        type="password"
        fullWidth
        margin="normal"
        size="small"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <BaseButton
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        Create Account
      </BaseButton>
    </Box>
  );
}
