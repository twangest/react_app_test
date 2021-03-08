import {
  ADD,
  EDIT,
  SET,
  REQUEST,
  SUCCESS,
  FAILURE,
  PARAM,
  PARAMS,
  RESET,
  TASK,
  SHOW,
  NOTIFICATION_SHOW_TIMEOUT,
  HIDE,
  NOTIFICATION,
} from '../constants';
import { taskParamsSelector, tokenSelector } from '../selectors';
import { taskSelector } from '../selectors';
import { ajaxPost } from '../utils';
import { responseFailure } from './index';
import history from '../../history';

export const setTaskParam = (key, value) => ({
  type: TASK + PARAM + SET,
  key,
  value,
});

export const taskCreateSuccess = (message) => ({
  type: TASK + ADD + SUCCESS,
  message,
});

export const taskEditSuccess = (message) => ({
  type: TASK + EDIT + SUCCESS,
  message,
});

export const taskFailure = (message) =>
  responseFailure(TASK + FAILURE, message);

export const addTask = () => async (dispatch, getState) => {
  const state = getState();
  const { pathname } = state.router.location;

  dispatch({ type: TASK + REQUEST });
  const formData = taskParamsSelector(state);
  const { username = '', email = '', text = '' } = formData;

  try {
    const response = await ajaxPost(pathname, { username, email, text });
    const { status = 'error', message } = response;
    switch (status) {
      case 'ok':
        dispatch(taskEditSuccess(message));
        dispatch(showNotification('Задача успешно добавлена'));
        break;
      case 'error':
        dispatch(responseFailure(TASK + FAILURE, message));
        break;
      default:
        dispatch(responseFailure(TASK + FAILURE));
        break;
    }
  } catch (e) {
    dispatch(responseFailure(TASK + FAILURE));
  }
};

const adminEditedStatuses = [1, 11];

export const editTask = () => async (dispatch, getState) => {
  const state = getState();
  const formData = taskParamsSelector(state);
  const { isComplete, text, id } = formData;
  const task = taskSelector(state, { id });
  const textEdited = task && task.text !== text ? 1 : 0;
  const isAdminEdited =
    adminEditedStatuses.includes(task.status) || textEdited ? 1 : 0;
  const taskStatus = isComplete ? 10 + isAdminEdited : 0 + isAdminEdited;

  const { pathname } = state.router.location;
  const token = tokenSelector(state);

  dispatch({ type: TASK + REQUEST });
  try {
    const response = await ajaxPost(pathname, {
      text,
      status: taskStatus,
      token,
    });

    const { status = 'error', message } = response;
    switch (status) {
      case 'ok':
        dispatch(taskEditSuccess(message));
        dispatch(showNotification('Успешно записали данные'));
        break;
      case 'error':
        dispatch(taskFailure(message));
        break;
      default:
        dispatch(taskFailure);
        break;
    }
  } catch (e) {
    dispatch(taskFailure);
  }
};

export const showNotification = (message) => async (dispatch, getState) => {
  dispatch({ type: NOTIFICATION + SHOW, message });
  setTimeout(() => {
    dispatch({ type: NOTIFICATION + HIDE, message });
    history.goBack();
  }, NOTIFICATION_SHOW_TIMEOUT);
};

export const clearTaskParams = () => ({
  type: TASK + PARAMS + RESET,
});
