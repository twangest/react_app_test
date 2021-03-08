import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  authErrorSelector,
  authLoadingSelector,
  authPasswordSelector,
  authUserNameSelector,
  tokenSelector,
} from '../../redux/selectors';
import { loginAction, setPassword, setUserName } from '../../redux/actions';
import history from '../../history';
import InputText from '../form-input-text';
import ErrorMessage from '../error-message';
import FormSubmitButton from '../form-submit-button';
import FormCancelButton from '../from-cancel-button/from-cancel-button';

const Login = ({
  hasToken,
  login,
  password,
  error,
  loading,
  loginAction,
  changeLogin,
  changePassword,
}) => {
  const handleSubmitClick = (e) => {
    e.preventDefault();
    loginAction(login, password);
  };
  if (hasToken) {
    if (history.length <= 2) return <Redirect to="/" />;
    history.goBack();
  }
  return (
    <div className="card mt-3 col-md-6 col-xl-4 mx-auto">
      <div className="card-header text-center">
        <div className="card-title">Добро пожаловать</div>
      </div>
      <div className="card-body">
        <form name="login" className="">
          <div className="">
            <InputText
              className={`form-control`}
              disabled={loading}
              placeholder="Логин"
              value={login}
              error={error?.username}
              onChange={(e) => changeLogin(e.target.value)}
            />
          </div>

          <div className="mt-2">
            <InputText
              className={`form-control`}
              disabled={loading}
              type="password"
              placeholder="Пароль"
              value={password}
              error={error?.password}
              onChange={(e) => changePassword(e.target.value)}
            />
          </div>
          {loading ? (
            <div className="p-1 mt-1 alert-warning">проверяем данные...</div>
          ) : (
            ''
          )}
          {typeof error === 'string' ? <ErrorMessage error={error} /> : ''}
          <hr className="my-3" />
          <div className="d-flex w-100 align-items-center justify-content-between">
            <FormSubmitButton
              disabled={loading}
              title="Отправить"
              onClick={handleSubmitClick}
            />
            <FormCancelButton disabled={loading} />
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  hasToken: !!tokenSelector(state),
  login: authUserNameSelector(state),
  password: authPasswordSelector(state),
  loading: authLoadingSelector(state),
  error: authErrorSelector(state),
});
const mapDispatchToProps = (dispatch) => ({
  loginAction: (login, password) =>
    dispatch(loginAction({ username: login, password })),
  changeLogin: (login) => dispatch(setUserName(login)),
  changePassword: (password) => dispatch(setPassword(password)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
