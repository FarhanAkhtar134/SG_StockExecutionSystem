import React, { FunctionComponent } from "react";
import { Admin, Resource } from "react-admin";
import StockExecutionList from "./execution/StockExecutionList";
import StockExecutionOrderList from "./execution/StockExecutionOrderList";
import { dataProvider } from "./api/dataProvider";
import Dashboard from "./Dashboard";
import { Provider } from "react-redux";
import adminStore from "./store/adminStore";
import { createHashHistory } from "history";

// dependency injection
const authProvider = () => Promise.resolve();
const history = createHashHistory();

const store = adminStore({
  authProvider,
  dataProvider,
  history,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

interface AppProps {}

const App: FunctionComponent<AppProps> = () => (
  <Provider store={store}>
    <Admin
      title="Stock Execution"
      history={history}
      authProvider={authProvider}
      dataProvider={dataProvider}
      dashboard={(props) => (
        <Dashboard
          title="Stock Execution"
          content="Société Générale Stock Execution System"
          props={props}
        />
      )}
    >
      <Resource
        name="stocks"
        options={{ label: "Stock List" }}
        list={StockExecutionList}
      />
      <Resource
        name="orders"
        options={{ label: "Orders Basket" }}
        list={StockExecutionOrderList}
      />
    </Admin>
  </Provider>
);

export default App;
