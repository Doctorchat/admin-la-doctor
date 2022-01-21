import { combineReducers } from "redux";
import user from "./reducers/userReducer";
import chatsList from "./reducers/chatsListReducer";
import reviewsList from "./reducers/chatsListReducer";
import doctorsList from "./reducers/doctorsListReducer";

const rootReducer = combineReducers({
  user,
  chatsList,
  reviewsList,
  doctorsList,
});

export default rootReducer;
