import { Grid } from "@mui/material";
import { PageContainer } from "../../../ui/PageContainer/PageContainer";
import { ProfileForm } from "./components/ProfileForm";

export default function Profile() {
  return (
    <PageContainer pageTitle="Profile">
      <Grid container spacing={1}>
        <ProfileForm />
      </Grid>
    </PageContainer>
  );
}
