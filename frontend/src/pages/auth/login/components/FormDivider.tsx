import { Divider, Typography } from "@mui/material";

export function FormDivider() {
  return (
    <Divider sx={{ my: 3 }}>
      <Typography
        variant="body2"
        color="textSecondary"
        sx={{ textTransform: "uppercase" }}
      >
        OR
      </Typography>
    </Divider>
  );
}
