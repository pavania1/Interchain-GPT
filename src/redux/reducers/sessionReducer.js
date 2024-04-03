import { ADD_SESSION } from "../types/sessionTypes";
import { DELETE_SESSION } from "../types/sessionTypes";
import { ADD_SESSION_DATA } from "../types/sessionTypes";

const initialState = {
  sessions: [],
  sessionData: {},
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SESSION:
      const sessionsCopy = Object.assign([], state.sessions);
      sessionsCopy.push(action.payload);
      return { ...state, sessions: sessionsCopy };
    case DELETE_SESSION:
      return { ...state, sessions: action.payload };
    case ADD_SESSION_DATA:
      const latestSessionId =
        state.sessions[state.sessions.length - 1].sessionId;

      let sessionData = Object.assign({}, state.sessionData);
      if (sessionData[latestSessionId]) {
        const currentSessionArray = Object.assign(
          [],
          sessionData[latestSessionId]
        );
        currentSessionArray.push(action.payload);
        sessionData[latestSessionId] = currentSessionArray;
      } else {
        sessionData[latestSessionId] = [action.payload];
      }
      return { ...state, sessionData };
    default:
      return state;
  }
};

export default sessionReducer;
