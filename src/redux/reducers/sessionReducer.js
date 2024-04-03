import { ADD_SESSION } from "../types/sessionTypes";
import { DELETE_SESSION } from "../types/sessionTypes";
import { ADD_SESSION_DATA } from "../types/sessionTypes";

const initialState = {
  session: [],
  sessionData: {},
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SESSION:
      const sessionsCopy = Object.assign([], state.session);
      sessionsCopy.push(action.payload);
      return { ...state, session: sessionsCopy };
    case DELETE_SESSION:
      return { ...state, session: action.payload };
    case ADD_SESSION_DATA:
      return { ...state, sessionData: action.payload };
    default:
      return { ...state };
  }
};

export default sessionReducer;
