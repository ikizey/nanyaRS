import { ReactNode } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "../context/ThemeContext";
import { store } from "../store/index.ts";

export default function AllProviders({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );
}
