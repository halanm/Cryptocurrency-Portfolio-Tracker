import { Autocomplete, Box, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { BaseButton } from "../../../../ui/BaseButton/BaseButton";
import { useUser } from "../../../../hooks/user/useUserContext";
import { useEditProfileMutation } from "../../../../hooks/user/useEditProfileMutation";
import { useAlert } from "../../../../hooks/alert/useAlert";
import type { ApiError } from "../../../../lib/axiosInstance";

export function ProfileForm() {
  const { user } = useUser();

  const { showSuccess, showError } = useAlert();

  const [formData, setFormData] = useState({
    preferred_currency: user?.preferred_currency || "USD",
  });

  const { mutate: editProfile } = useEditProfileMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    editProfile(formData, {
      onSuccess: () => {
        showSuccess("Profile updated successfully!");
      },
      onError: (e: Error) => {
        const error = e as ApiError;
        console.error("Error editing profile:", error.response);
        if (error.response?.data?.errors) {
          error.response.data.errors.forEach((err) => showError(err));
        } else {
          showError(error.response?.data?.error || "Failed to update profile");
        }
      },
    });
  };

  return (
    <Grid size={12}>
      <Box
        sx={{
          backgroundColor: "var(--mui-palette-background-paper)",
          border: "1px solid var(--mui-palette-secondary-dark)",
          borderRadius: "8px",
          padding: "16px",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Edit Profile
        </Typography>
        <Box component="form" noValidate autoComplete="off">
          <Autocomplete
            options={["USD", "EUR", "JPY", "BRL"]}
            value={formData?.preferred_currency.toUpperCase() || ""}
            onChange={(_, newValue) => {
              setFormData((prev) => ({
                ...prev,
                preferred_currency: newValue ? newValue.toUpperCase() : "USD",
              }));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Preferred Currency"
                fullWidth
                margin="normal"
                size="small"
                required
                autoComplete="off"
              />
            )}
          />
          <Box>
            <BaseButton
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: "16px" }}
              onClick={handleSubmit}
            >
              Edit Profile
            </BaseButton>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
}
