import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Pagination from '../tasks/pagination';
import Controls from '../tasks/controls';
import Tasks from '../tasks';
import { changePage, getTasks, setTasksUrlParam } from '../../redux/actions';
import {
  tasksErrorSelector,
  tasksLoadedSelector,
  tasksLoadingSelector,
} from '../../redux/selectors';
import Loader from '../loader';

const StartPage = ({ location, loading, loaded, error, getTasks }) => {
  const url = location.pathname;
  useEffect(() => {
    if (url && !loading && !loaded && !error) {
      getTasks();
    }
  }, [loading, loaded, error, url, getTasks]);
  return (
    <div className="mt-3">
      <Controls />
      <Tasks />
      <Pagination />
      {!loading || <Loader />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: tasksLoadingSelector(state),
  loaded: tasksLoadedSelector(state),
  error: tasksErrorSelector(state),
  location: state.router.location,
});
const mapDispatchToProps = (dispatch) => ({
  setUrlParam: (key, value) => dispatch(setTasksUrlParam(key, value)),
  getTasks: () => dispatch(getTasks()),
  changePage: (page) => dispatch(changePage(page)),
});
export default connect(mapStateToProps, mapDispatchToProps)(StartPage);
