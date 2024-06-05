import {
  ADD_SESSION,
  CONNECT_WALLET,
  DISCONNECT_WALLET,
} from '../types/sessionTypes';
import { DELETE_SESSION } from '../types/sessionTypes';
import { ADD_SESSION_DATA } from '../types/sessionTypes';
import { UPDATE_SESSION } from '../types/sessionTypes';

export const addSession = data => dispatch => {
  return dispatch({
    type: ADD_SESSION,
    payload: data,
  });
};

export const deleteSession = sessionId => dispatch => {
  return dispatch({
    type: DELETE_SESSION,
    payload: sessionId,
  });
};

export const addSessionData = data => dispatch => {
  return dispatch({
    type: ADD_SESSION_DATA,
    payload: data,
  });
};

export const updateSession = (sessionId, title) => dispatch => {
  return dispatch({
    type: UPDATE_SESSION,
    payload: { sessionId, title },
  });
};

export const setWallet = data => dispatch => {
  return dispatch({
    type: CONNECT_WALLET,
    payload: data,
  });
};

export const disconnectWallet = data => dispatch => {
  return dispatch({
    type: DISCONNECT_WALLET,
    payload: {},
  });
};
