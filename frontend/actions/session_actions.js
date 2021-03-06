import { postUser, postSession, deleteSession } from "../util/session_util";

export const RECEIVE_ALL_USERS = "RECEIVE_ALL_USERS";
export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

const receiveCurrentUser = user => ({
  type: RECEIVE_CURRENT_USER,
  user
});

const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER
});

const receiveErrors = errors => ({
  // errors is an array
  type: RECEIVE_SESSION_ERRORS,
  errors
});

// const receiveAllUsers = (users) => ({
//     type: RECEIVE_ALL_USERS,
//     users
// })

export const clearErrors = () => ({
  type: CLEAR_ERRORS
});

export const createUser = formUser => dispatch =>
  postUser(formUser).then(
    user => dispatch(receiveCurrentUser(user)),
    err => dispatch(receiveErrors(err.responseJSON))
  );

export const login = formUser => dispatch =>
  postSession(formUser).then(
    user => dispatch(receiveCurrentUser(user)),
    err => dispatch(receiveErrors(err.responseJSON))
  );

export const logout = () => dispatch =>
  deleteSession().then(() => dispatch(logoutCurrentUser()));
