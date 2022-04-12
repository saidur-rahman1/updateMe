import { createTheme } from "@material-ui/core/styles";

export const theme = createTheme({
  typography: {
    fontFamily: '"Roboto"',
    fontSize: 12,
    h1: {
      // could customize the h1 variant as well
    }
  },
  palette: {
    primary: { main: "#6481ee" },
    secondary: { main: "#FFFFFF" }
  },
});
