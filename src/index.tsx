import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./i18n/i18n";
import App from "./App";
import "./index.css";
import store from "./redux/store";
import reportWebVitals from "./reportWebVitals";
import "../src/styles/loading.scss";
import "../src/styles/button.scss";
import "../src/styles/datepicker.scss";
import "../src/styles/styles.scss";
import "../src/styles/table.scss";
import "../src/styles/notification.scss";
import "../src/styles/modalConfirm.scss";
import "../src/styles/modalCustom.scss";
import { ConfigProvider } from "antd";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            borderRadius: 2,
            colorText: "#001529",
          },
          components: {
            Table: {
              rowHoverBg: "#d8d7d7",
              headerBg: "#d8d7d7",
              // borderColor: "black",
            },
          },
        }}
      >
        <App />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
