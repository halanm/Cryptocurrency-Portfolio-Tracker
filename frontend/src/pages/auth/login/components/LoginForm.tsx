import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useLoginMutation } from "../../../../hooks/auth/useLoginMutation";

export function LoginForm() {
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
      <Typography variant="body2" align="right" sx={{ mt: 2 }}>
        <Link
          href="/forgot-password"
          variant="body2"
          color="primary"
          underline="none"
        >
          I forgot my password
        </Link>
      </Typography>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        Login
      </Button>
    </Box>
  );
}
