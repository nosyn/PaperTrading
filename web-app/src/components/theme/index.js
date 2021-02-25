// React
import React from "react";
import PropTypes from "prop-types";

// Material UI
import { ThemeProvider } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";

// Colors
import { green, lightGreen, blue, lightBlue } from "@material-ui/core/colors";
const Themer = ({ children }) => {
  const themePreference = "light";

  // Lowest Values Possible w/ current fontSize
  const toolbarHeights = {
    mobile: 35,
    tabletDesktop: 35,
    default: 35,
  };

  let theme = createMuiTheme({
    palette: {
      type: themePreference,
      primary: {
        main: lightGreen[500],
        darker: green[500],
      },
      secondary: {
        main: lightBlue[500],
        darker: blue[500],
      },
      colors: {
        white: "#FFFFF0",
      },
    },
  });

  theme = {
    ...theme,
    mixins: {
      ...theme.mixins,
      toolbar: {
        minHeight: toolbarHeights.default,
        [`${theme.breakpoints.up("xs")} and (orientation: landscape)`]: {
          minHeight: toolbarHeights.mobile,
        },
        [theme.breakpoints.up("sm")]: {
          minHeight: theme.tabletDesktop,
        },
      },
    },
  };
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

Themer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Themer;
