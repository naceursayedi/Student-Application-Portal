import React from "react";
import ReactDOM from "react-dom/client";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import rootReducer from "./reducer/RootReducer";
import thunk from "redux-thunk";

const initialState = {};
const middlewares = [thunk];
const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middlewares)
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
