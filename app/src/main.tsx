import "./index.css";
import React from "react";
import App from "./App.tsx";
import ReactDOM from "react-dom/client";
import ReactQueryClientProvider from "./components/provider/ReactQueryClientProvider.tsx";
import UserContextProvider from "./components/provider/UserContextProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReactQueryClientProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </ReactQueryClientProvider>
  </React.StrictMode>
);
