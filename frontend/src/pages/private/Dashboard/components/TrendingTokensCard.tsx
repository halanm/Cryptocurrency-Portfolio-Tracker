import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useGetTrendingTokens } from "../../../../hooks/token/useGetTrendingTokens";

import TrendingUp from "@mui/icons-material/TrendingUp";
import TrendingDown from "@mui/icons-material/TrendingDown";
import { useUser } from "../../../../hooks/user/useUserContext";

export function TrendingTokensCard() {
  const { user } = useUser();
  const { data: trendingTokens } = useGetTrendingTokens();

  return (
    <Box
      sx={{
        backgroundColor: "var(--mui-palette-background-paper)",
        border: "1px solid var(--mui-palette-secondary-dark)",
        borderRadius: "8px",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          padding: "16px",
        }}
      >
        Trending Tokens
      </Typography>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead
            sx={{ backgroundColor: "var(--mui-palette-secondary-main)" }}
          >
            <TableRow>
              <TableCell>Pairs</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Change</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trendingTokens?.map((token) => (
              <TableRow
                key={token.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={token.image}
                      alt={token.name}
                      style={{
                        width: "24px",
                        height: "24px",
                        marginRight: "8px",
                      }}
                    />
                    <Typography variant="body1" textTransform={"uppercase"}>
                      {token.symbol} 🔥
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  {token.current_price} {user?.preferred_currency || "USD"}
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color:
                        token.price_change_percentage_24h_in_currency > 0
                          ? "green"
                          : "red",
                    }}
                  >
                    <Typography variant="body1" sx={{ marginLeft: "8px" }}>
                      {token.price_change_percentage_24h_in_currency > 0
                        ? "+"
                        : ""}
                      {token.price_change_percentage_24h_in_currency.toFixed(3)}
                      %
                    </Typography>
                    {token.price_change_percentage_24h_in_currency > 0 ? (
                      <TrendingUp sx={{ marginLeft: "8px" }} />
                    ) : (
                      <TrendingDown sx={{ marginLeft: "8px" }} />
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
