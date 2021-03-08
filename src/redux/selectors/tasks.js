import { createSelector } from 'reselect';
import { MAX_PAGES, PAGE_SIZE } from '../constants';

export const tasksSelector = (state) => state.tasks.entities;
export const totalTasksSelector = (state) => state.tasks.totalTaskCount;
export const tasksCountSelector = createSelector(
  tasksSelector,
  (tasks) => Object.keys(tasks).length
);

export const tasksPageSelector = (state) => {
  return state.router.location.query.page;
};
export const tasksSortFieldSelector = (state) =>
  state.tasks.url.search.sort_field;
export const tasksSortDirectionSelector = (state) =>
  state.tasks.url.search.sort_direction;
export const tasksPathNameSelector = (state) => state.tasks.url.pathname;
export const tasksLoadingSelector = (state) => state.tasks.loading;
export const tasksLoadedSelector = (state) => state.tasks.loaded;
export const tasksErrorSelector = (state) => state.tasks.error;

export const tasksUrlSelector = (state) => {
  const { pathname = '/', search = '' } = state.router.location;
  return pathname + search;
};

export const pagesCountSelector = createSelector(
  totalTasksSelector,
  (totalTasks = 0) => {
    return Math.ceil(totalTasks / PAGE_SIZE);
  }
);
export const pagesSelector = createSelector(
  pagesCountSelector,
  tasksPageSelector,
  (pagesCount, currentPage) => {
    const arr = [];
    const middle = Math.ceil(MAX_PAGES / 2);
    const startPage =
      MAX_PAGES < pagesCount
        ? currentPage - middle > 0
          ? currentPage - middle
          : 1
        : 1;
    const endPage =
      MAX_PAGES < pagesCount
        ? startPage + MAX_PAGES > pagesCount
          ? pagesCount
          : startPage + MAX_PAGES
        : pagesCount;

    for (let i = startPage; i <= endPage; i++) {
      arr.push(i);
    }
    return arr;
  }
);

export const taskSelector = createSelector(
  tasksSelector,
  (_, { id }) => parseInt(id) || id,
  (tasks, taskId) => tasks.find((task) => task.id === taskId)
);
