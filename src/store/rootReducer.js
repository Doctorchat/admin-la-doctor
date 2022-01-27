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
});

export default rootReducer;
