aimport {
  ACTION, EDIT,
  FAILURE,
  LOGIN,
  LOGOUT,
  PASSWORD,
  REQUEST,
  SET,
  SUCCESS, TASK,
  USERNAME
} from "../constants";

const authInitialState = {
  username: '',
  password: '',
  loading: false,
  error: null,
}
const auth = (state = authInitialState, action) => {
  const {type} = action;

  switch (type) {

    case LOGIN + ACTION + REQUEST:
      return {...state, error: null, loading: true }

    case LOGIN + ACTION + SUCCESS:
      const {token} = action
      localStorage.setItem('token', token);
      return {...state, loading: false, password: ''  }

    case LOGIN + ACTION + FAILURE:
      const {error} = action
      return {...state, loading: false, password: '', error }

    case LOGOUT + ACTION:

      localStorage.removeItem('token');
      return {...state, login: ""}

    case USERNAME + SET:
      const userError = state.error?.username;
      if (userError) {
        const newError = {...state.error};
        delete newError.username
        return {...state, username: action.username, error: {...newError}}
      }
      return  {...state, username: action.username}

    case PASSWORD + SET:
      const passwordError = state.error?.password;
      if (passwordError) {
        const newError = {...state.error};
        delete newError.password
        return {...state, password: action.password, error: {...newError}}
      }
      return  {...state, password: action.password}

    case TASK + EDIT + FAILURE:
      if (action?.error?.token) {
        return {...state, token: null}
      }
      return state
    default:
      return state;
  }
}
export default auth;
