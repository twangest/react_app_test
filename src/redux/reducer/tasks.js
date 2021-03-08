import {
  FAILURE,
  PARAM,
  REQUEST,
  SET,
  EDIT,
  ADD,
  SUCCESS,
  TASK,
  TASKS,
  TASKS_URL,
} from '../constants';
import { produce } from 'immer';

const tasksInitialState = {
  entities: {},
  totalTaskCount: 0,
  url: {
    pathname: '/',
    search: {
      page: 0,
      sort_field: '',
      sort_direction: '',
    },
  },
  loading: false,
  loaded: false,
  error: null,
};

const tasks = (state = tasksInitialState, action) => {
  const { type } = action;
  switch (type) {
    case '@@router/LOCATION_CHANGE':
      return produce(state, (draft) => {
        if (action.payload.location.pathname === TASKS_URL) {
          draft.loaded = false;
        }
      });

    case TASKS_URL + PARAM + SET:
      const { type, ...params } = action;
      return produce(state, (draft) => {
        draft.loaded = false;
        Object.entries(params).forEach(([key, value]) => {
          draft.url.search[key] = value;
        });
      });

    case TASKS + REQUEST:
      return { ...state, loading: true, loaded: false, error: null };

    case TASKS + SUCCESS:
      const {
        tasks = [],
        total_task_count: totalTaskCount = 0,
      } = action.message;
      return produce(state, (draft) => {
        draft.loading = false;
        draft.loaded = true;
        draft.entities = tasks;
        draft.totalTaskCount = totalTaskCount;
      });

    case TASKS + FAILURE:
      return { ...state, loading: false, error: action.error };

    case TASK + EDIT + SUCCESS:
    case TASK + ADD + SUCCESS:
      return { ...state, loaded: false };
    default:
      return state;
  }
};

export default tasks;
