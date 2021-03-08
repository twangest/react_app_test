import React from 'react';
import { connect } from 'react-redux';
import {
  tasksCountSelector,
  tasksErrorSelector,
  tasksLoadingSelector,
  tasksSelector,
} from '../../redux/selectors';
import Task from './task';
import ErrorMessage from '../error-message';

const Tasks = ({ tasks, error, tasksCount, loading }) => {
  if (error)
    return (
      <ErrorMessage error={error} className="alert alert-danger p-2 my-3" />
    );
  if (!tasksCount && !loading)
    return <div className="alert p-2 mt-3 text-center">Задач не найдено</div>;
  return (
    <ul className="list-group mt-2">
      {Object.values(tasks).map((item) => {
        return <Task key={item.id} {...item} />;
      })}
    </ul>
  );
};
const mapStateToProps = (state) => ({
  tasks: tasksSelector(state),
  tasksCount: tasksCountSelector(state),
  loading: tasksLoadingSelector(state),
  error: tasksErrorSelector(state),
});
export default connect(mapStateToProps)(Tasks);
