import {createSelector} from "reselect";
import {tasksSelector} from "./tasks";

export const taskParamsSelector = (state) => state.task.entities;
export const taskLoadingSelector = (state) => state.task.loading;
export const taskActionSuccessSelector = (state) => state.task.actionSuccess;
export const taskErrorSelector = (state) => state.task.error;

export const editTaskIdSelector =createSelector(
  taskParamsSelector,
    (params) => params.id
)

export const taskCompleteSelector = createSelector(
  tasksSelector,
  editTaskIdSelector,
  (tasks, taskId) => {
    const task = tasks?.[taskId];
    return taskComplete(task?.status)
  }
)

export const taskComplete = status => typeof status === 'string'
  ? parseInt(status) >= 10
  : status >= 10
