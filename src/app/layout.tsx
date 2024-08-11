import React from "react";
import "../index.css";
import AllProviders from "../components/AllProviders";

interface LayoutProps {
  children?: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body>
        <AllProviders>{children}</AllProviders>
      </body>
    </html>
  );
}
