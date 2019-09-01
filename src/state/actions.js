import { LOADING_DISABLED, LOADING_ENABLED, SET_USER, SET_FILTER } from './types';

export const disableLoading = () => ({ type: LOADING_DISABLED });
export const enableLoading = () => ({ type: LOADING_ENABLED});
export const setUser = (user) => ({ type: SET_USER, payload: user });
export const setFilter = (filter) => ({ type: SET_FILTER, payload: filter});