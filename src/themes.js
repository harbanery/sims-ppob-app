import { extendTheme } from "@chakra-ui/react";

const fonts = {
  CustomSansSerif: `'Inter', system-ui, 'Avenir', Helvetica, Arial, sans-serif`,
};

const styles = {
  global: {
    "input::-ms-reveal, input::-ms-clear": {
      display: "none",
    },
  },
};

const themes = extendTheme({ fonts, styles });

export default themes;
