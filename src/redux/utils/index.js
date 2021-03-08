import qs from "qs";

export * from './api';

export const arrToMap = (arr) =>
  arr.reduce((acc, item) => ({ ...acc, [item.id]: item }), {});


export const setQueryToLocation =(location, param = {}) => {
  const {pathname='/', search=''} = location
  const searchQuery = qs.stringify({...qs.parse(search.slice(1)), ...param})
  return searchQuery.length ? `${pathname}?${searchQuery}` : pathname
}
