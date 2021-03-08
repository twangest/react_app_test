import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import {
  taskSelector,
  tokenSelector,
  taskParamsSelector,
  taskErrorSelector,
  taskLoadingSelector,
  taskCompleteSelector,
  taskActionSuccessSelector,
} from '../../../redux/selectors';
import {
  addTask,
  clearTaskParams,
  editTask,
  setTaskParam,
} from '../../../redux/actions';
import InputText from '../../form-input-text';
import TextArea from '../../text-area';
import FormSubmitButton from '../../form-submit-button';
import FormCancelButton from '../../from-cancel-button';
import FormRadioButton from '../../form-radio-button';
import ErrorMessage from '../../error-message';

const TaskForm = ({
  getTask,
  hasToken,
  taskParams,
  error,
  loading,
  taskComplete,
  actionSuccess,
  setTaskParam,
  clearTaskParams,
  addTask,
  editTask,
  location,
}) => {
  const { id } = useParams();

  const { pathname } = location;
  const isEditMode = !!pathname.includes('edit');
  const {
    username = '',
    email = '',
    text = '',
    isComplete = taskComplete,
  } = taskParams;

  const task = getTask(id);

  useEffect(() => {
    if (task && Object.keys(task).length) {
      Object.entries(task).forEach(([key, value]) => setTaskParam(key, value));
    }
  }, [task, setTaskParam]);

  useEffect(() => {
    if (!isEditMode && false) {
      clearTaskParams();
    }
  }, [pathname, clearTaskParams, isEditMode]);

  if (!hasToken && isEditMode) return <Redirect to="/login" push />;
  const handleInputChange = (param) => (e) => {
    if (param === 'isComplete') {
      setTaskParam(param, e.target.checked);
      return;
    }
    setTaskParam(param, e.target.value);
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    isEditMode ? editTask() : addTask();
  };
  if (actionSuccess)
    return (
      <div className="alert alert-success text-center p-3">{actionSuccess}</div>
    );

  return (
    <div className="card mt-3 col-lg-6 col-xxl-4 mx-auto">
      <div className="card-title">
        <div className="card-header d-flex flex-row flex-wrap align-items-center justify-content-between">
          <div>{isEditMode ? 'Редактировать задачу ' : 'Добавить задачу'}</div>
          <div>{task ? id : ''}</div>
        </div>
      </div>
      <div className="card-body">
        <form name="editTask">
          <div className="mt-1">
            <InputText
              placeholder="Имя"
              value={username}
              hidden={isEditMode}
              error={error?.username}
              disabled={loading}
              className="form-control"
              onChange={handleInputChange('username')}
            />
          </div>
          <div className="mt-1">
            <InputText
              placeholder="Email"
              type="email"
              value={email}
              hidden={isEditMode}
              error={error?.email}
              disabled={loading}
              className="form-control"
              onChange={handleInputChange('email')}
            />
          </div>
          <div className="mt-1">
            <TextArea
              placeholder="Текст"
              value={text}
              error={error?.text}
              disabled={loading}
              className="form-control"
              onChange={handleInputChange('text')}
            />
            <FormRadioButton
              id="status"
              hidden={!isEditMode}
              labelText="Выполнено"
              checked={isComplete}
              onChange={handleInputChange('isComplete')}
            />
          </div>
          {typeof error === 'string' ? <ErrorMessage error={error} /> : ''}
          <hr className="my-3" />
          <div className="d-flex w-100 align-items-center justify-content-between">
            <FormSubmitButton
              disabled={loading}
              onClick={handleSubmitClick}
              title="Сохранить"
            />
            <FormCancelButton disabled={loading} />
          </div>
        </form>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  getTask: (id) => taskSelector(state, { id }),
  taskComplete: taskCompleteSelector(state),
  hasToken: !!tokenSelector(state),
  taskParams: taskParamsSelector(state),
  error: taskErrorSelector(state),
  loading: taskLoadingSelector(state),
  actionSuccess: taskActionSuccessSelector(state),
  location: state.router.location,
});
const mapDispatchToProps = (dispatch) => ({
  setTaskParam: (key, value) => dispatch(setTaskParam(key, value)),
  addTask: () => dispatch(addTask()),
  editTask: () => dispatch(editTask()),
  clearTaskParams: () => dispatch(clearTaskParams()),
});
export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
