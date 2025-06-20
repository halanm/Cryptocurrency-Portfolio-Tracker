import { Box, Drawer, Divider } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import ViewSidebarIcon from "@mui/icons-material/ViewSidebarRounded";

import logoIcon from "../../../assets/logo-icon.png";
import logoText from "../../../assets/logo-text.png";

import HomeIcon from "@mui/icons-material/Home";
import { BaseButton } from "../../BaseButton/BaseButton";

const navItems = [{ label: "Dashboard", icon: <HomeIcon /> }];

type SidebarProps = {
  currentPage: string;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

export default function Sidebar({
  currentPage,
  sidebarOpen,
  setSidebarOpen,
}: SidebarProps) {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      slotProps={{
        paper: {
          sx: {
            overflow: "hidden",
            paddingInline: "5px",
            width: sidebarOpen ? "210px" : "60px",
            height: "calc(100% - 12px)",
            marginTop: "5px",
            marginLeft: "5px",
            borderRadius: "8px",
            backgroundColor: "var(--mui-palette-background-paper)",
            border: "1px solid var(--mui-palette-secondary-dark)",
            transition:
              "width 0.2s cubic-bezier(0.4, 0, 0.6, 1), margin 0.2s cubic-bezier(0.4, 0, 0.6, 1)",
          },
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          p: 1,
          justifyContent: sidebarOpen ? "flex-start" : "center",
          marginTop: "10px",
        }}
      >
        <img
          src={logoText}
          alt="Logo"
          style={{
            width: "128px",
            height: "auto",
            marginBottom: "10px",
            display: sidebarOpen ? "block" : "none",
          }}
        />
        <img
          src={logoIcon}
          alt="Logo"
          style={{
            width: "40px",
            height: "auto",
            borderRadius: "8px",
            marginBottom: "10px",
            display: sidebarOpen ? "none" : "block",
          }}
        />
      </Box>
      <Box
        gap={1}
        display="flex"
        flexDirection="column"
        sx={{
          alignItems: "center",
        }}
      >
        {navItems.map(({ label, icon }) => (
          <SideBarButton
            key={label}
            expanded={sidebarOpen}
            text={label}
            icon={icon}
            active={label === currentPage}
            onClick={() => console.log(`${label} clicked`)}
          />
        ))}
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Box
        pb={2}
        gap={1}
        display="flex"
        flexDirection="column"
        sx={{
          alignItems: "center",
        }}
      >
        <SideBarButton
          expanded={sidebarOpen}
          text="Collapse Sidebar"
          icon={<ViewSidebarIcon />}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        />
        <Divider
          sx={{
            width: "100%",
            backgroundColor: "var(--mui-palette-secondary-main)",
            marginY: "5px",
          }}
        />
        <SideBarButton
          expanded={sidebarOpen}
          text="Log out"
          icon={<LogoutIcon />}
        />
      </Box>
    </Drawer>
  );
}

type SidebarButtonProps = {
  expanded: boolean;
  text: string;
  icon: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
};

function SideBarButton({
  expanded,
  text,
  icon,
  active,
  onClick,
}: SidebarButtonProps) {
  return (
    <BaseButton
      color="secondary"
      variant="contained"
      sx={{
        padding: 1,
        width: expanded ? "100%" : "fit-content",
        minWidth: "0",
        display: "flex",
        gap: expanded ? 1 : 0,
        justifyContent: expanded ? "flex-start" : "center",
        textWrap: "nowrap",
        boxShadow: "none",
        color: active ? "#fff" : "var(--mui-palette-text-primary)",
        backgroundColor: active
          ? "var(--mui-palette-primary-main)"
          : "var(--mui-palette-background-paper)",
        borderRadius: "8px",
        border: active ? "1px solid var(--mui-palette-primary-light)" : "none",
        "&:hover": {
          backgroundColor: active
            ? "var(--mui-palette-primary-dark)"
            : "var(--mui-palette-primary-main)",
          color: "#fff",
        },
      }}
      onClick={onClick}
    >
      {icon}
      {expanded ? text : ""}
    </BaseButton>
  );
}
