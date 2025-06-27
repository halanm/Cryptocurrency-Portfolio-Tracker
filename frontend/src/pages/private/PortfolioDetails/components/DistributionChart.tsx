import { Box, Grid, Typography } from "@mui/material";
import type { Portfolio } from "../../../../domain/Portfolio";

import { PieChart } from "@mui/x-charts/PieChart";

type DistributionChartProps = {
  portfolio?: Portfolio | null;
};

export function DistributionChart({ portfolio }: DistributionChartProps) {
  const tokensData =
    portfolio?.tokens?.map((token) => ({
      id: token.symbol,
      value: token.current_value,
      label: `${token.name} (${token.symbol})`,
    })) || [];
  return portfolio ? (
    <Grid size={4}>
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
          Portfolio distribution
        </Typography>
        <PieChart
          series={[
            {
              data: tokensData,
              innerRadius: 50,
              startAngle: -45,
            },
          ]}
          width={214}
          height={214}
          hideLegend
        />
      </Box>
    </Grid>
  ) : null;
}
