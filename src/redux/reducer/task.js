import {
  TASK,
  PARAM,
  SET, PARAMS, RESET, EDIT, REQUEST, SUCCESS, FAILURE, ADD, NOTIFICATION, SHOW, HIDE,
} from "../constants";
import {taskComplete} from "../selectors";
import produce from "immer";

const taskInitialState = {
  entities: {
    id: '',
    username: '',
    email: '',
    text: null,
    status: 0,
    isComplete: false
  },
  loading: false,
  actionSuccess: false,
  error: null,
}
const task = (state = taskInitialState, action) => {
  const {type} = action;

  switch (type) {

    case TASK + PARAM + SET:
      const {key, value} = action
      switch (key) {
        case 'status':
          return produce(state, draft => {
            draft.entities.status = value;
            draft.entities.isComplete = taskComplete(value);
          })
        default:
          return produce(state, draft => {
            draft.actionSuccess = false;
            draft.error = null;
            draft.entities[key] = value;
          })
      }

    case TASK + PARAMS + RESET:
      return {...taskInitialState}

    case TASK + REQUEST:
      return {...state, error: null, loading: true}

    case TASK + ADD + SUCCESS:
      return produce(state, draft => {
        draft.loading = false;
        draft.entities = {...action.message}
      })

    case TASK + EDIT + SUCCESS:
      return {...state, ...action.task, loading: false}

    case TASK + FAILURE:
      return produce(state, draft => {
        draft.loading = false;
        draft.error = action.error;
      })

    case NOTIFICATION + SHOW:
      return produce(state, draft => {
        draft.actionSuccess = action.message
      })

    case NOTIFICATION + HIDE:
      return produce(state, draft => {
        draft.actionSuccess = null
      })

    default:
      return state;
  }
}
export default task;
