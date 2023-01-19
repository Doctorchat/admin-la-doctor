import { combineReducers } from "redux";
import user from "./reducers/userReducer";
import doctorsList from "./reducers/doctorsListReducer";
import spinnerIndicator from "./reducers/spinnerIndicatorReducer";
import bootstrap from "./reducers/bootstrapReducer";
import usersList from "./reducers/usersListReducer";
import requestsCount from "./reducers/requestsCountReducer";
import transactionsList from "./reducers/transactionsListReducer";
import chatsList from "./reducers/chatsListReducer";
import reviewsList from "./reducers/reviewsListReducer";
import promocodesList from "./reducers/promocodesReducer";
import logsList from "./reducers/logsReducer";
import supportList from "./reducers/supportListReducer";
import withdrawal from "./reducers/withdrawalReducer";

const rootReducer = combineReducers({
  user,
  chatsList,
  reviewsList,
  doctorsList,
  spinnerIndicator,
  bootstrap,
  usersList,
  requestsCount,
  transactionsList,
  promocodesList,
  logsList,
  supportList,
  withdrawal,
});

export default rootReducer;
