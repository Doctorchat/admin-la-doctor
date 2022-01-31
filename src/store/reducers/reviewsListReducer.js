import {
  REVIEWS_LIST_GET,
  CLEAN_ON_UNMOUNT_TRUE,
  CLEAN_ON_UNMOUNT_FALSE,
  REVIEWS_LIST_CLEAN,
  UPDATE_REVIEW,
} from "../actionTypes";

const initialState = {
  payload: {},
  cleanOnUnmount: true,
};

const reviewsList = (state = initialState, action = {}) => {
  switch (action.type) {
    case REVIEWS_LIST_GET: {
      return { ...state, payload: action.payload };
    }
    case UPDATE_REVIEW: {
      const newState = { ...state };
      const updatedReview = action.payload;
      const updatedReviewIndex = state.payload.data.findIndex((r) => r.id === updatedReview.id);

      if (updatedReviewIndex !== -1) {
        newState.payload.data[updatedReviewIndex] = updatedReview;
      }

      return newState;
    }
    case REVIEWS_LIST_CLEAN:
      return initialState;
    case CLEAN_ON_UNMOUNT_TRUE:
      return {
        ...state,
        cleanOnUnmount: true,
      };
    case CLEAN_ON_UNMOUNT_FALSE:
      return {
        ...state,
        cleanOnUnmount: false,
      };
    default:
      return state;
  }
};

export default reviewsList;
