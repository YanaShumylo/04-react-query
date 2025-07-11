import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App/App";
import "modern-normalize";
import { Toaster } from "react-hot-toast";
import "./index.css";

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <>
      <App />
      <Toaster position="top-right" />
    </>
  </React.StrictMode>
);
