import { Box, Typography } from "@mui/material";

export function FormHeader() {
  return (
    <Box mb={2}>
      <Typography variant="h5" gutterBottom>
        Register
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        Create a new account to start tracking your cryptocurrency portfolio.
      </Typography>
    </Box>
  );
}
