import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { SocketProvider } from "./contexts/SocketProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <SocketProvider>
    <div className="font-mono">
      <App />
    </div>
  </SocketProvider>
);
