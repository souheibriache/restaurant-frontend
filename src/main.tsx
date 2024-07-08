import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "./components/ui/sonner";
import AuthProvider from "./modules/auth/AuthProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        {/* <AuthProviderWithNavigate> */}
        <AuthProvider>
          <AppRoutes />
          <Toaster visibleToasts={1} position="top-right" richColors />
        </AuthProvider>
        {/* </AuthProviderWithNavigate> */}
      </QueryClientProvider>
    </Router>
  </React.StrictMode>
);
