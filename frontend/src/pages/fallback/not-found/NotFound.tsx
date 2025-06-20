import { Box, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { BaseButton } from "../../../ui/BaseButton/BaseButton";

export function NotFound() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="90vh"
        textAlign="center"
      >
        <ErrorOutlineIcon
          sx={{ fontSize: 120, color: "text.secondary", mb: 2 }}
        />
        <Typography variant="h1" component="h1" gutterBottom>
          404
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </Typography>
        <BaseButton
          variant="contained"
          color="primary"
          size="large"
          onClick={handleGoHome}
          sx={{ mt: 2 }}
        >
          Go to Home
        </BaseButton>
      </Box>
    </Container>
  );
}
