import { LOADING_DISABLED, LOADING_ENABLED, SET_USER, SET_FILTER} from './types';

const initialState = {
  filter: [],
  loading: false,
  user: {},
};

export const reduce = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_DISABLED:
      return { ...state, loading: false }
    case LOADING_ENABLED:
      return { ...state, loading: true }
    case SET_FILTER:
      return { ...state, filter: action.payload.slice(0) }
    case SET_USER:
      return { ...state, user: action.payload }
    default:
      return state;
  }
}