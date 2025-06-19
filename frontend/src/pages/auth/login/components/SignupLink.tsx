import { Link, Typography } from "@mui/material";

export const SignupLink = () => {
  return (
    <Typography variant="body2" align="center" sx={{ mt: 4 }}>
      Don't have an account?{" "}
      <Link href="/signup" variant="body2" color="primary" underline="none">
        Sign Up
      </Link>
    </Typography>
  );
};
