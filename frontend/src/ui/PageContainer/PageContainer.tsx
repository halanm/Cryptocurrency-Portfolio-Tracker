import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { Box } from "@mui/material";

type PageContainerProps = {
  pageTitle: string;
  children?: React.ReactNode;
};

export function PageContainer({ pageTitle, children }: PageContainerProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        padding: 0,
        margin: 0,
        overflow: "hidden",
      }}
    >
      <Sidebar
        currentPage={pageTitle}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <Header pageTitle={pageTitle} modalOpen={sidebarOpen} />
      <Box
        sx={{
          flexGrow: 1,
          marginLeft: sidebarOpen ? "240px" : "95px",
          marginTop: "5px",
          padding: "20px",
          borderRadius: "8px",
          overflowY: "auto",
          transition:
            "width 0.2s cubic-bezier(0.4, 0, 0.6, 1), margin 0.2s cubic-bezier(0.4, 0, 0.6, 1)",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
