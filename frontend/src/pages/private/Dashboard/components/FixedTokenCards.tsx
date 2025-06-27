import {
  Box,
  Card,
  CardActions,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useGetTokensData } from "../../../../hooks/token/useGetTokensData";
import { BaseButton } from "../../../../ui/BaseButton/BaseButton";

export function FixedTokenCards() {
  const { data: trendingCoins } = useGetTokensData({ tokens: "btc,eth,usdt" });

  return (
    <Grid size={12} container spacing={2}>
      {trendingCoins?.map((coin) => (
        <Grid key={coin.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <Card
            sx={{
              backgroundColor: "var(--mui-palette-background-paper)",
              border: "1px solid var(--mui-palette-secondary-dark)",
              borderRadius: "8px",
              boxShadow: "none",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <img
                  src={coin.image}
                  alt={coin.name}
                  style={{ width: "30px", height: "30px", marginRight: "8px" }}
                />
                <Stack direction="column">
                  <Typography variant="body1" component="div" fontWeight="bold">
                    {coin.symbol.toUpperCase()}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {coin.name}
                  </Typography>
                </Stack>
              </Box>
              <Box textAlign={"right"}>
                <Typography variant="h6" component="div">
                  ${coin.current_price.toLocaleString()}
                </Typography>
                <Typography
                  variant="body2"
                  color={coin.price_change_24h < 0 ? "error" : "success"}
                >
                  {coin.price_change_24h > 0 ? "+" : "-"}$
                  {Math.abs(coin.price_change_24h).toFixed(2)}
                </Typography>
              </Box>
            </CardContent>
            <CardActions>
              <BaseButton
                color="secondary"
                size="small"
                fullWidth
                href={`https://www.coingecko.com/en/coins/${coin.id}`}
              >
                Open chart
              </BaseButton>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
