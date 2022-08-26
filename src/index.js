import React from "react";
import ReactDOM from "react-dom";
import ReduxToastr from "react-redux-toastr";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {ConnectedRouter} from "connected-react-router";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { history, persistor, store } from "./redux/store";
import "@emotion/styled"
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import "./assets/sass/bootstrap.css";
import "./assets/sass/style.scss";
import 'antd/dist/antd.css'

ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter  history={history}>
          <React.Fragment>
            <App />
            <ReduxToastr timeOut={3000} transitionIn="fadeIn" transitionOut="fadeOut"/>
          </React.Fragment>
        </ConnectedRouter>
      </PersistGate>
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
