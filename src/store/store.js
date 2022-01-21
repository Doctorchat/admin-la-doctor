import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./rootReducer";

const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 });

const storeCreation = () => {
  const configureStore = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

  if (process.env.NODE_ENV !== "production") {
    if (module.hot) {
      module.hot.accept("./rootReducer", () => {
        configureStore.replaceReducer(rootReducer);
      });
    }
  }
  return configureStore;
};

const store = storeCreation();

export default store;
