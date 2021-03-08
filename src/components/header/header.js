import React from 'react';
import { connect } from 'react-redux';
import { logoutAction } from '../../redux/actions';
import { tokenSelector, authUserNameSelector } from '../../redux/selectors';
import { Link } from 'react-router-dom';
import { TASKS_URL } from '../../redux/constants';

const Header = ({ hasToken, logoutAction, username, location }) => {
  const handleLogout = () => logoutAction();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to={TASKS_URL} className="text-decoration-none">
          <div className="navbar-brand">
            <img src="/logo192.png" width="32" alt="..." />{' '}
            <span className="mx-1">React App</span>
          </div>
        </Link>
        <div className="navbar-text d-flex flex-row flex-wrap align-items-center">
          {{ username } ? <div className="me-2">{username}</div> : ''}
          {hasToken ? (
            <button
              className="btn btn-outline-secondary"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <Link to={{ pathname: '/login', state: { from: location } }}>
              <button className="btn btn-outline-secondary">Login</button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
const mapStateToProps = (state, props) => ({
  hasToken: !!tokenSelector(state),
  username: props.hasToken ? authUserNameSelector(state) : '',
  location: state.router.location,
});
const mapDispatchToProps = (dispatch) => ({
  logoutAction: () => dispatch(logoutAction()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
