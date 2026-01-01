import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css"; // Changed from index.css to match your App.css file
import App from "./App"; // Removed .js extension

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
