import {
  Box,
  Card,
  CardActions,
  CardContent,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { useGetTokensData } from "../../../../hooks/token/useGetTokensData";
import { BaseButton } from "../../../../ui/BaseButton/BaseButton";
import { useUser } from "../../../../hooks/user/useUserContext";

export function FixedTokenCards() {
  const { user } = useUser();
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
                  {coin.current_price.toLocaleString()}{" "}
                  {user?.preferred_currency || "USD"}
                </Typography>
                <Typography
                  variant="body2"
                  color={coin.price_change_24h < 0 ? "error" : "success"}
                >
                  {coin.price_change_24h > 0 ? "+" : "-"}
                  {Math.abs(coin.price_change_24h).toLocaleString()}{" "}
                  {user?.preferred_currency || "USD"}
                </Typography>
              </Box>
            </CardContent>
            <CardActions>
              <Link
                href={`https://www.coingecko.com/en/coins/${coin.id}`}
                target="_blank"
                sx={{ textDecoration: "none", width: "100%" }}
              >
                <BaseButton color="secondary" size="small" fullWidth>
                  Open chart
                </BaseButton>
              </Link>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
