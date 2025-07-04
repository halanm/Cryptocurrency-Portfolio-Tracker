import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import type { Portfolio } from "../../../../domain/Portfolio";

import TrendingUp from "@mui/icons-material/TrendingUp";
import TrendingDown from "@mui/icons-material/TrendingDown";
import { useUser } from "../../../../hooks/user/useUserContext";

type TokensViewProps = {
  portfolio?: Portfolio | null;
};

export function TokensView({ portfolio }: TokensViewProps) {
  const { user } = useUser();

  return portfolio ? (
    <Grid size={12}>
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
          Detailed Tokens View
        </Typography>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead
              sx={{ backgroundColor: "var(--mui-palette-secondary-main)" }}
            >
              <TableRow>
                <TableCell>Token</TableCell>
                <TableCell>Current Price</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Invested Amount</TableCell>
                <TableCell>Current Value</TableCell>
                <TableCell>Change (24h)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {portfolio.tokens?.map((token) => (
                <TableRow
                  key={token.symbol}
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
                          width: "32px",
                          height: "32px",
                          marginRight: "12px",
                        }}
                      />
                      <Box>
                        <Typography variant="body2" fontWeight="bold">
                          {token.symbol.toUpperCase()}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {token.name}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {token?.current_price?.toLocaleString()}{" "}
                    {user?.preferred_currency || "USD"}
                  </TableCell>
                  <TableCell>{token.quantity.toFixed(4)}</TableCell>
                  <TableCell>
                    {token?.total_invested?.toLocaleString()}{" "}
                    {user?.preferred_currency || "USD"}
                  </TableCell>
                  <TableCell>
                    {token?.current_value?.toLocaleString()}{" "}
                    {user?.preferred_currency || "USD"}
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        color:
                          token.price_change_24h > 0
                            ? "green"
                            : token.price_change_24h < 0
                            ? "red"
                            : "unset",
                      }}
                    >
                      <Typography variant="body1" sx={{ marginLeft: "8px" }}>
                        {token.price_change_24h > 0 ? "+" : ""}
                        {token.price_change_24h.toFixed(2)}%
                      </Typography>
                      {token.price_change_24h > 0 ? (
                        <TrendingUp sx={{ marginLeft: "8px" }} />
                      ) : token.price_change_24h < 0 ? (
                        <TrendingDown sx={{ marginLeft: "8px" }} />
                      ) : null}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Grid>
  ) : null;
}
