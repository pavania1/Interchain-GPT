import { ADD_SESSION } from "../types/sessionTypes";
import { DELETE_SESSION } from "../types/sessionTypes";
import { ADD_SESSION_DATA } from "../types/sessionTypes";

export const addSession = (data) => (dispatch) => {
  return dispatch({
    type: ADD_SESSION,
    payload: data,
  });
};

export const deleteSession = () => (dispatch) => {
  return dispatch({
    type: DELETE_SESSION,
    payload: {},
  });
};

export const addSessionData = (data) => (dispatch) => {
  return dispatch({
    type: ADD_SESSION_DATA,
    payload: data,
  });
};
