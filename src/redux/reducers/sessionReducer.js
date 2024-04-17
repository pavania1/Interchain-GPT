import { ADD_SESSION, UPDATE_SESSION } from "../types/sessionTypes";
import { DELETE_SESSION } from "../types/sessionTypes";
import { ADD_SESSION_DATA } from "../types/sessionTypes";

const initialState = {
  sessions: [],
  sessionData: {},
};

const sessionReducer = (state = initialState, action) => {
  let sessionsCopy = JSON.parse(JSON.stringify(state.sessions));
  switch (action.type) {
    case ADD_SESSION:
      sessionsCopy.push(action.payload);
      return { ...state, sessions: sessionsCopy };
    case DELETE_SESSION:
      const idToDelete = sessionsCopy.findIndex(
        (item) => item.sessionId === action.payload
      );
      if (idToDelete > -1) {
        sessionsCopy.splice(idToDelete, 1);
        return { ...state, sessions: sessionsCopy };
      } else {
        return state;
      }
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
    case UPDATE_SESSION:
      const idToUpdate = sessionsCopy.findIndex(
        (item) => item.sessionId === action.payload.sessionId
      );
      if (idToUpdate > -1) {
        sessionsCopy[idToUpdate].title = action.payload.title;
        return { ...state, sessions: sessionsCopy };
      } else {
        return state;
      }
    default:
      return state;
  }
};

export default sessionReducer;
