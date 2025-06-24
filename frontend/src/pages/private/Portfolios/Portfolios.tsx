import { Grid } from "@mui/material";
import { PageContainer } from "../../../ui/PageContainer/PageContainer";
import { PortfoliosList } from "./components/PortfoliosList";

export default function Portfolios() {
  return (
    <PageContainer pageTitle="Portfolios">
      <Grid container spacing={1}>
        <PortfoliosList />
      </Grid>
    </PageContainer>
  );
}
