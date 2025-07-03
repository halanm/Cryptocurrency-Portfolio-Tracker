import { Box, Grid, Stack, Typography } from "@mui/material";
import type { Portfolio } from "../../../../domain/Portfolio";
import { BaseButton } from "../../../../ui/BaseButton/BaseButton";
import { useNavigate } from "react-router";
import { useUser } from "../../../../hooks/user/useUserContext";

type PortfolioSummaryProps = {
  portfolio?: Portfolio | null;
};

export function PortfolioSummary({ portfolio }: PortfolioSummaryProps) {
  const { user } = useUser();
  const navigate = useNavigate();

  return portfolio ? (
    <Grid size={8}>
      <Box
        sx={{
          backgroundColor: "var(--mui-palette-background-paper)",
          border: "1px solid var(--mui-palette-secondary-dark)",
          borderRadius: "8px",
          padding: "16px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Portfolio Summary
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <BaseButton
            color="primary"
            size="small"
            onClick={() => {
              navigate(`/trade?portfolio_id=${portfolio.id}`);
            }}
          >
            Make a new trade
          </BaseButton>
        </Box>
        <Box sx={{ marginTop: "16px" }}>
          <Typography variant="body2">Total portfolio value</Typography>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {portfolio.current_value.toLocaleString()}{" "}
            {user?.preferred_currency || "USD"}
          </Typography>
          <Typography
            variant="body2"
            color={portfolio.change_24h_percentage < 0 ? "error" : "success"}
          >
            {portfolio.change_24h_percentage > 0 ? "+" : "-"}
            {Math.abs(portfolio.change_24h_percentage).toFixed(2)}{" "}
            {user?.preferred_currency || "USD"}
          </Typography>
        </Box>
        <Box
          sx={{
            marginTop: "16px",
            padding: "16px",
            border: "1px solid var(--mui-palette-secondary-dark)",
            borderRadius: "8px",
          }}
        >
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2">Total invested</Typography>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              {portfolio.total_invested.toLocaleString()}{" "}
              {user?.preferred_currency || "USD"}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ marginTop: "8px" }}
          >
            <Typography variant="body2">Total return</Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                color:
                  portfolio.total_return >= 0 ? "success.main" : "error.main",
              }}
            >
              {portfolio.total_return >= 0 ? "+" : "-"}
              {Math.abs(portfolio.total_return).toFixed(2)}{" "}
              {user?.preferred_currency || "USD"}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ marginTop: "8px" }}
          >
            <Typography variant="body2">Total trades</Typography>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              {portfolio.total_trades}
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Grid>
  ) : null;
}
