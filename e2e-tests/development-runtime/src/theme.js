import red from "@mui/material/colors/red";
import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: `#556cd6`,
    },
    secondary: {
      main: `#19857b`,
    },
    error: {
      main: red.A400,
    },
    background: {
      default: `#fff`,
    },
  },
});

export default theme;
