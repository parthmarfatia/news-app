import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./index.css";
import { ContextProvider } from "./Context";
ReactDOM.createRoot(document.getElementById("root")).render(
  <ContextProvider>
    <App />
  </ContextProvider>
);
