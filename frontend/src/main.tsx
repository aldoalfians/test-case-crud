import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux/es/exports";
import { store } from "./app/store.ts";
import { ConfigProvider, theme } from "antd";
import type { ThemeConfig } from "antd";
import App from "./App.tsx";
import "./index.css";

const { getDesignToken } = theme;

const config: ThemeConfig = {
  token: {
    colorPrimary: "#FFABAB",
    colorBgContainer: "#fcfdff",
    colorBgBase: "#C21010",
    colorWhite: "#FFFFFF",
  },
};

const globalToken = getDesignToken(config);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={config}>
        <App />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
