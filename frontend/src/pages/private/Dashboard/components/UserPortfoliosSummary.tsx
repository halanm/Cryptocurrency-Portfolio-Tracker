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
import { useGetUserPortfolios } from "../../../../hooks/user/useGetUserPortfolios";

import TrendingUp from "@mui/icons-material/TrendingUp";
import TrendingDown from "@mui/icons-material/TrendingDown";

export function UserPortfoliosSummary() {
  const { data: userPortfolios } = useGetUserPortfolios();
  return (
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
          Your Portfolios
        </Typography>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead
              sx={{ backgroundColor: "var(--mui-palette-secondary-main)" }}
            >
              <TableRow>
                <TableCell>Portfolio</TableCell>
                <TableCell>Total Invested</TableCell>
                <TableCell>Current Value</TableCell>
                <TableCell>Total Return</TableCell>
                <TableCell>Change (24h)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userPortfolios?.map((portfolio) => (
                <TableRow key={portfolio.id}>
                  <TableCell>{portfolio.name}</TableCell>
                  <TableCell>${portfolio.total_invested.toFixed(2)}</TableCell>
                  <TableCell>${portfolio.current_value.toFixed(2)}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        color:
                          portfolio.total_return > 0
                            ? "green"
                            : portfolio.total_return < 0
                            ? "red"
                            : "unset",
                      }}
                    >
                      <Typography variant="body1" sx={{ marginLeft: "8px" }}>
                        {portfolio.total_return > 0 ? "+" : ""}$
                        {portfolio.total_return.toFixed(2)}
                      </Typography>
                      {portfolio.total_return > 0 ? (
                        <TrendingUp sx={{ marginLeft: "8px" }} />
                      ) : portfolio.total_return < 0 ? (
                        <TrendingDown sx={{ marginLeft: "8px" }} />
                      ) : null}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        color:
                          portfolio.change_24h_percentage > 0
                            ? "green"
                            : portfolio.change_24h_percentage < 0
                            ? "red"
                            : "unset",
                      }}
                    >
                      <Typography variant="body1" sx={{ marginLeft: "8px" }}>
                        {portfolio.change_24h_percentage > 0 ? "+" : ""}
                        {portfolio.change_24h_percentage.toFixed(2)}%
                      </Typography>
                      {portfolio.change_24h_percentage > 0 ? (
                        <TrendingUp sx={{ marginLeft: "8px" }} />
                      ) : portfolio.change_24h_percentage < 0 ? (
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
  );
}
