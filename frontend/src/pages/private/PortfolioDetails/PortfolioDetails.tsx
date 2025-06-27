import { Grid } from "@mui/material";
import { PageContainer } from "../../../ui/PageContainer/PageContainer";
import { useParams } from "react-router";
import { useGetPortfolioDetails } from "../../../hooks/portfolio/useGetPortfolioDetails";
import { PortfolioSummary } from "./components/PortfolioSummary";
import { DistributionChart } from "./components/DistributionChart";
import { TokensView } from "./components/TokensView";

export default function PortfolioDetails() {
  const { portfolioId } = useParams<{ portfolioId: string }>();

  const { data: portfolioDetails } = useGetPortfolioDetails({
    portfolio_id: portfolioId,
  });

  return (
    <PageContainer pageTitle="Portfolios">
      <Grid container spacing={1}>
        <PortfolioSummary portfolio={portfolioDetails} />
        <DistributionChart portfolio={portfolioDetails} />
        <TokensView portfolio={portfolioDetails} />
      </Grid>
    </PageContainer>
  );
}
