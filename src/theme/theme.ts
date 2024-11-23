import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      default: "#f5f5f5", // Light gray background
      paper: "#ffffff", // White background for cards
    },
    primary: {
      main: "#d1a7e3", // Soft pink/purple accent color
    },
    text: {
      primary: "#333333", // Darker text for headings
      secondary: "#777777", // Light gray text for descriptions
    },
  },
  typography: {
    h4: {
      fontSize: "2rem",
      fontWeight: "bold",
      color: "#333333",
    },
    h6: {
      fontSize: "1.125rem",
      fontWeight: 500,
      color: "#333333",
    },
    body2: {
      fontSize: "0.875rem",
      color: "#777777",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px", // Rounded corners
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow
        },
      },
    },
  },
});

export default theme;
