import { Box, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { BaseButton } from "../../../../ui/BaseButton/BaseButton";
import { useNavigate } from "react-router";
import { useAlert } from "../../../../hooks/alert/useAlert";
import type { ApiError } from "../../../../lib/axiosInstance";
import { useCreatePortfolioMutation } from "../../../../hooks/portfolio/useCreatePortfolioMutation";

export function NewPortfolioForm() {
  const navigate = useNavigate();
  const { showSuccess, showError } = useAlert();

  const [formData, setFormData] = useState({
    name: null as string | null,
  });

  const { mutate: createPortfolio } = useCreatePortfolioMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createPortfolio(formData, {
      onSuccess: (response) => {
        showSuccess("Trade created successfully!");
        navigate(`/portfolios/${response.id}`);
      },
      onError: (e: Error) => {
        const error = e as ApiError;
        console.error("Error creating trade:", error.response);
        if (error.response?.data?.errors) {
          error.response.data.errors.forEach((err) => showError(err));
        } else {
          showError(error.response?.data?.error || "Failed to create trade");
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
          Create New Portfolio
        </Typography>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            size="small"
            value={formData.name || ""}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                name: e.target.value,
              }));
            }}
            required
            autoComplete="off"
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
              Create Portfolio
            </BaseButton>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
}
