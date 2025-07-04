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
import { BaseButton } from "../../../../ui/BaseButton/BaseButton";
import { useNavigate } from "react-router";
import { useUser } from "../../../../hooks/user/useUserContext";

export function PortfoliosList() {
  const { user } = useUser();
  const { data: userPortfolios } = useGetUserPortfolios();

  const navigate = useNavigate();

  return (
    <Grid size={12}>
      <Box
        sx={{
          backgroundColor: "var(--mui-palette-background-paper)",
          border: "1px solid var(--mui-palette-secondary-dark)",
          borderRadius: "8px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", padding: "16px" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Your Portfolios
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <BaseButton
            color="primary"
            size="small"
            onClick={() => {
              navigate(`/new-portfolio`);
            }}
          >
            Create New Portfolio
          </BaseButton>
        </Box>
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
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userPortfolios?.map((portfolio) => (
                <TableRow key={portfolio.id}>
                  <TableCell>{portfolio.name}</TableCell>
                  <TableCell>
                    {portfolio.total_invested.toFixed(2)}{" "}
                    {user?.preferred_currency || "USD"}
                  </TableCell>
                  <TableCell>
                    {portfolio.current_value.toFixed(2)}{" "}
                    {user?.preferred_currency || "USD"}
                  </TableCell>
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
                        {portfolio.total_return > 0 ? "+" : "-"}
                        {Math.abs(portfolio.total_return).toFixed(2)}{" "}
                        {user?.preferred_currency || "USD"}
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
                  <TableCell sx={{ width: "150px" }}>
                    <BaseButton
                      size="small"
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        navigate(`/portfolios/${portfolio.id}`);
                      }}
                      sx={{
                        minWidth: "0",
                        padding: "8px 16px",
                        textTransform: "none",
                      }}
                    >
                      Go to Portfolio
                    </BaseButton>
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
