import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { Provider } from "react-redux";
import {store} from "../provider/store/store.js"
import { ThemeContextProvider, useTheme } from "./others/theme/themeContext.jsx";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { darkTheme, lightTheme } from "./others/theme/muiTheme.js";
import { CssBaseline } from "@mui/material";
import App from "../app/App.jsx"

function RootApp() {
  const { darkMode } = useTheme(); 
  return (
    <ThemeProvider theme={darkMode === "dark" ? darkTheme : lightTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
}

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StyledEngineProvider>
      <ThemeContextProvider>
        <RootApp />
      </ThemeContextProvider>
    </StyledEngineProvider>
  </Provider>
);
