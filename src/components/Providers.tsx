"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

// Create a Material-UI theme
const theme = createTheme({
  palette: {
    mode: "dark", // Choose "light" or "dark"
  },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
      </AppRouterCacheProvider>
    </Provider>
  );
}
