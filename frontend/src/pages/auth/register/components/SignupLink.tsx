import { Link, Typography } from "@mui/material";

export const SignupLink = () => {
  return (
    <Typography variant="body2" align="center" sx={{ mt: 4 }}>
      Already have an account?{" "}
      <Link href="/login" variant="body2" color="primary" underline="none">
        Login
      </Link>
    </Typography>
  );
};
