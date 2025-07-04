import { Grid } from "@mui/material";
import { PageContainer } from "../../../ui/PageContainer/PageContainer";
import { NewPortfolioForm } from "./components/NewPortfolioForm";

export default function NewPortfolio() {
  return (
    <PageContainer pageTitle="New Portfolio">
      <Grid container spacing={1}>
        <NewPortfolioForm />
      </Grid>
    </PageContainer>
  );
}
