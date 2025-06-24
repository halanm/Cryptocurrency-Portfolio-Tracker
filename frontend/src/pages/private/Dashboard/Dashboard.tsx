import { Grid } from "@mui/material";
import { PageContainer } from "../../../ui/PageContainer/PageContainer";
import { TrendingTokensCard } from "./components/TrendingTokensCard";
import { FixedTokenCards } from "./components/FixedTokenCards";
import { UserPortfoliosSummary } from "./components/UserPortfoliosSummary";

export default function Dashboard() {
  return (
    <PageContainer pageTitle="Dashboard">
      <Grid container spacing={1}>
        <Grid size={{ md: 5, xl: 4 }}>
          <TrendingTokensCard />
        </Grid>
        <Grid size={{ md: 7, xl: 8 }} container spacing={2} direction="column">
          <Grid>
            <FixedTokenCards />
          </Grid>
          <Grid>
            <UserPortfoliosSummary />
          </Grid>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
