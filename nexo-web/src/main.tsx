import ReactDOM from "react-dom/client";

import App from "./App";

import { AuthProvider } from "./providers/AuthProvider";
import { NotificationProvider } from "./providers/NotificationProvider";

import "./styles/globals.css";
import "./styles/variables.css";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <NotificationProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </NotificationProvider>
);