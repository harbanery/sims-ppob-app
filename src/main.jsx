import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import themes from "./themes.js";
import { Provider } from "react-redux";
import store from "./config/store.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ChakraProvider theme={themes}>
      <App />
    </ChakraProvider>
  </Provider>
);
