import cart from "../../assets/cartIcon.png";
import { useTheme } from "../../app/others/theme/themeContext.jsx";
import { AppProvider, DashboardLayout, PageContainer } from "@toolpad/core";
import { Box, Typography, Button, OutlinedInput } from "@mui/material";
import { darkTheme, lightTheme } from "../../app/others/theme/muiTheme.js";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LayersIcon from "@mui/icons-material/Layers";
import LogoutIcon from "@mui/icons-material/Logout";
import BarChartIcon from "@mui/icons-material/BarChart";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";
import image from "../../assets/logo22.svg";

const NAVIGATION = [
  { kind: "header", title: "Main" },
  { segment: "dashboard", title: "Dashboard", icon: <DashboardIcon /> },
  { segment: "dashboard/orders", title: "Orders", icon: <ShoppingCartIcon /> },
  { segment: "dashboard/products", title: "Products", icon: <LayersIcon /> },
  { segment: "dashboard/others", title: "Other", icon: <BarChartIcon /> },
];

export default function Dashboard() {
  const { toggleTheme, darkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const demoWindow = typeof window !== "undefined" ? window : undefined;

  useEffect(() => {
    const token = localStorage.getItem("admin");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const router = {
    pathname: location.pathname,
    searchParams: new URLSearchParams(location.search),
    navigate,
  };

  return (
    <AppProvider
      branding={{
        title: "",
        logo: (
          <img
            width={125}
            src={image}
            style={{
              filter: darkMode === "dark" ? "invert(1)" : "none",
            }}
          />
        ),
      }}
      navigation={NAVIGATION}
      router={router}
      theme={darkMode === "dark" ? darkTheme : lightTheme}
      window={demoWindow}
    >
      <DashboardLayout
        slots={{
          toolbarActions: () => (
            <Box className="cursor-pointer" onClick={toggleTheme}>
              {darkMode === "light" ? (
                <Moon className="text-blue-500" />
              ) : (
                <Sun className="text-[#3ca7ff]" />
              )}
            </Box>
          ),
          sidebarFooter: () => (
            <Box sx={{ p: 2 }}>
              <Button
                fullWidth
                color="error"
                variant="outlined"
                startIcon={<LogoutIcon />}
                onClick={() => {
                  localStorage.removeItem("admin");
                  window.location = "/";
                }}
              >
                Logout
              </Button>
            </Box>
          ),
        }}
      >
        <PageContainer
          slots={{
            header: () => (
              <Box>
                {NAVIGATION.map((el) => {
                  if (`/${el.segment}` === location.pathname) {
                    return (
                      <Typography
                        key={el.segment}
                        className="font-black font-sans"
                        variant="h4"
                      >
                        Page of {el.title}
                      </Typography>
                    );
                  }
                })}
              </Box>
            ),
          }}
        >
          <Box
            sx={{
              backdropFilter: "blur(12px)",
              backgroundColor: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.7)"
                  : "rgba(255, 255, 255, 0.7)",
              p: 4,
              borderRadius: 4,
              boxShadow: 6,
              transition: "all 0.3s ease",
              minHeight: "80vh",
              display: "flex",
              flexDirection: "column",
              gap: 2,
              animation: "fadein 0.4s ease-in-out",
              "@keyframes fadein": {
                from: { opacity: 0, transform: "translateY(10px)" },
                to: { opacity: 1, transform: "translateY(0px)" },
              },
            }}
          >
            <Outlet />
          </Box>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
