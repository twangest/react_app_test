import {
  LOGIN, LOGOUT,
  USERNAME, PASSWORD, SET,
  ACTION, REQUEST, FAILURE, SUCCESS,
} from "../constants";

import {ajaxPost} from "../utils";
import {responseFailure} from "./index";

export const loginAction = ({username, password}) => async (dispatch) => {
  dispatch({type: LOGIN + ACTION + REQUEST})
  try {
    const response = await ajaxPost('/login', {username, password})
    const {status, message} = response;
    switch (status) {
      case 'ok':
        const {token} = message
        dispatch({type: LOGIN + ACTION + SUCCESS, token})
        break;
      case 'error':
        dispatch(responseFailure(LOGIN + ACTION + FAILURE, message));
        break;
      default:
        dispatch(responseFailure(LOGIN + ACTION + FAILURE));
        break;
    }
  } catch (e) {
    dispatch(responseFailure(LOGIN + ACTION + FAILURE));
  }
}

export const logoutAction = () => (dispatch) => {
  dispatch({type: LOGOUT + ACTION});
}

export const setUserName = (username) => ({type: USERNAME + SET, username});
export const setPassword = (password) => ({type: PASSWORD + SET, password});
