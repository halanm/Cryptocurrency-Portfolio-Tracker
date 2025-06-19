import { AppBar, Box, Toolbar, Typography, IconButton } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";

type HeaderProps = {
  pageTitle: string;
  modalOpen: boolean;
};

export default function Header({ pageTitle, modalOpen }: HeaderProps) {
  return (
    <AppBar
      position="static"
      color="secondary"
      sx={{
        marginTop: "5px",
        width: `calc(100% - ${modalOpen ? "237px" : "87px"})`,
        marginLeft: modalOpen ? "232px" : "82px",
        borderRadius: "8px",
        boxShadow: "none",
        backgroundColor: "var(--mui-palette-background-paper)",
        border: "1px solid var(--mui-palette-secondary-dark)",
        transition:
          "width 0.2s cubic-bezier(0.4, 0, 0.6, 1), margin 0.2s cubic-bezier(0.4, 0, 0.6, 1)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6">{pageTitle}</Typography>
        <Box>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
