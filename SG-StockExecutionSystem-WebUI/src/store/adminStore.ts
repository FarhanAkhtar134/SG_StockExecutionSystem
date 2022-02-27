import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from "@reduxjs/toolkit";
import { routerMiddleware, connectRouter } from "connected-react-router";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { all, fork } from "redux-saga/effects";
import { adminReducer, adminSaga, USER_LOGOUT } from "react-admin";

import stockOrderReducer from "./stockOrderSlice";

export default ({ authProvider, dataProvider, history }) => {
  const reducer = combineReducers({
    admin: adminReducer,
    router: connectRouter(history),
    // add your own reducers here
    stockOrder: stockOrderReducer,
  });
  const resettableAppReducer = (state, action) =>
    reducer(action.type !== USER_LOGOUT ? state : undefined, action);

  const saga = function* rootSaga() {
    yield all(
      [
        adminSaga(dataProvider, authProvider),
        // add your own sagas here
      ].map(fork)
    );
  };
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    resettableAppReducer,
    {
      /* set your initial state here */
    },
    composeWithDevTools(
      applyMiddleware(
        sagaMiddleware,
        routerMiddleware(history)
        // add your own middlewares here
      )
      // add your own enhancers here
    )
  );
  sagaMiddleware.run(saga);
  return store;
};
