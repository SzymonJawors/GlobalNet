import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { plPL } from "@clerk/localizations";
import moment from "moment/dist/moment.js";
import "moment/dist/locale/pl.js";

moment.locale("pl");
console.log(moment.locale())

const PUBLISHABLE_KEY = import.meta.env
  .VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} localization={plPL}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ClerkProvider>
);
