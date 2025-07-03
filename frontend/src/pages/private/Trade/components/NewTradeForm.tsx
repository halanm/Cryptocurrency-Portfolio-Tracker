import { Autocomplete, Box, Grid, TextField, Typography } from "@mui/material";
import { useGetUserPortfolios } from "../../../../hooks/user/useGetUserPortfolios";
import { useState } from "react";
import { BaseButton } from "../../../../ui/BaseButton/BaseButton";
import { useCreateTradeMutation } from "../../../../hooks/portfolio/useCreateTradeMutation";
import { useNavigate } from "react-router";
import { useAlert } from "../../../../hooks/alert/useAlert";
import type { ApiError } from "../../../../lib/axiosInstance";

type NewTradeFormProps = {
  portfolio_id?: string | null;
};

export function NewTradeForm({ portfolio_id }: NewTradeFormProps) {
  const navigate = useNavigate();
  const { showSuccess, showError } = useAlert();

  const { data: userPortfolios } = useGetUserPortfolios();

  const [selectedPortfolio, setSelectedPortfolio] = useState(
    userPortfolios?.find((p) => p.id === parseInt(portfolio_id!)) || null
  );

  const [formData, setFormData] = useState({
    token_symbol: null as string | null,
    amount_invested: null as number | null,
    trade_type: null as string | null,
  });

  const { mutate: createTrade } = useCreateTradeMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createTrade(
      { portfolio_id: selectedPortfolio?.id, data: formData },
      {
        onSuccess: () => {
          showSuccess("Trade created successfully!");
          navigate(`/portfolios/${selectedPortfolio?.id}`);
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
      }
    );
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
          Create New Trade
        </Typography>
        <Box component="form" noValidate autoComplete="off">
          <Autocomplete
            options={userPortfolios || []}
            getOptionLabel={(option) => option.name}
            value={selectedPortfolio}
            onChange={(_, newValue) => {
              setSelectedPortfolio(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Portfolio"
                fullWidth
                margin="normal"
                size="small"
                required
                autoComplete="off"
              />
            )}
          />
          <Autocomplete
            options={["BTC", "ETH", "SOL", "BNB", "XRP", "DOGE"]}
            value={formData.token_symbol}
            onChange={(_, newValue) => {
              setFormData((prev) => ({
                ...prev,
                token_symbol: newValue,
              }));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Token"
                fullWidth
                margin="normal"
                size="small"
                required
                autoComplete="off"
              />
            )}
          />
          <TextField
            label="Amount Invested"
            type="number"
            fullWidth
            margin="normal"
            size="small"
            value={formData.amount_invested || ""}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                amount_invested: parseFloat(e.target.value),
              }));
            }}
            required
            autoComplete="off"
          />
          <Autocomplete
            options={["Buy", "Sell"]}
            value={formData.trade_type}
            onChange={(_, newValue) => {
              setFormData((prev) => ({
                ...prev,
                trade_type: newValue,
              }));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Trade Type"
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
              Create Trade
            </BaseButton>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
}
