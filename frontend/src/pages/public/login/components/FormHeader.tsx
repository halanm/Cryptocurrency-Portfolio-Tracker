import { Box, Typography } from "@mui/material";

export function FormHeader() {
  return (
    <Box mb={2}>
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        Welcome back! Please enter your details.
      </Typography>
    </Box>
  );
}
