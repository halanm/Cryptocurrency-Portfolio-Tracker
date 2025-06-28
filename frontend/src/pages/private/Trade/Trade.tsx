import { Grid } from "@mui/material";
import { PageContainer } from "../../../ui/PageContainer/PageContainer";
import { useLocation } from "react-router";
import { NewTradeForm } from "./components/NewTradeForm";
import React from "react";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function Trade() {
  const query = useQuery();

  return (
    <PageContainer pageTitle="New Trade">
      <Grid container spacing={1}>
        <NewTradeForm portfolio_id={query.get("portfolio_id")} />
      </Grid>
    </PageContainer>
  );
}
