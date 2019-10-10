import React from "react";
import ReactDOM from "react-dom";
import { combineReducers, createStore } from "redux";
import App from "../../app/App";
import { Provider } from "react-redux";
import { boardReducer } from "../../app/reducers/board-reducer";

const allReducers = combineReducers({
    board: boardReducer,
  });

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
