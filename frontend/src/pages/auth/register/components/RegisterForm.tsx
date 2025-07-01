import { Box, TextField } from "@mui/material";
import { useState } from "react";
import { BaseButton } from "../../../../ui/BaseButton/BaseButton";
import { useAlert } from "../../../../hooks/alert/useAlert";
import type { ApiError } from "../../../../lib/axiosInstance";
import { useSignupMutation } from "../../../../hooks/auth/useSignupMutation";

export function RegisterForm() {
  const { showError } = useAlert();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { mutate: signup } = useSignupMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      showError("Passwords do not match");
      return;
    }

    signup(
      { email, password },
      {
        onSuccess: () => {
          window.location.href = "/";
        },
        onError: (e: Error) => {
          const error = e as ApiError;
          if (error.response?.data?.errors) {
            error.response.data.errors.forEach((err) => showError(err));
          } else {
            showError(error.response?.data?.error || "Signup failed");
          }
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
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
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
