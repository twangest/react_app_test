import {CHANGE_PAGE, FAILURE, PARAM, REQUEST, SET, SUCCESS, TASKS, TASKS_URL} from "../constants";
import {fetchGet} from "../utils/api";

export const changePage = (page) => ({
  type: CHANGE_PAGE,
  page
})

export const setTasksUrlParam = (key, value) => ({
  type: TASKS_URL + PARAM + SET,
  [key]: value
})

const tasksFailure = (message="Что-то пошло не так") => ({type: TASKS + FAILURE, error: message})

const defaultQueryParams = {page: 1, sort_field: 'id', sort_direction: 'asc'}

export const getTasks = () => async (dispatch, getState) => {
  const state = getState()

  const {pathname, query: locationQuery} = state.router.location;
  const query = { ...defaultQueryParams, ...locationQuery}

  dispatch({type: TASKS + REQUEST})
  try {
    const response = await fetchGet(pathname, query)
    const {status, message} = response;
    switch (status) {
      case 'ok':
        dispatch({type: TASKS + SUCCESS, message})
        break;
      case 'error':
        dispatch(tasksFailure(message));
        break;
      default:
        dispatch(tasksFailure());
        break;
    }
  }
  catch (e) {
    dispatch(tasksFailure());
  }
}

