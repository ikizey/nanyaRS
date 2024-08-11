import { AppProps } from "next/app";
import React from "react";
import AllProviders from "../components/AllProviders";
import "../index.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <AllProviders>
        <Component {...pageProps} />
      </AllProviders>
    </React.StrictMode>
  );
}

export default MyApp;
