import { fromJS } from 'immutable';
import { createDuck } from 'redux-duck';

const ducks = createDuck('ImportantAuthors');
export const request = ducks.createAction(REQUEST);
export const REQUEST = ducks.defineType('REQUEST');
export const REQUEST_SUCCESS = ducks.defineType('REQUEST_SUCCESS');
export const REQUEST_FAILURE = ducks.defineType('REQUEST_FAILURE');

export const requestSuccess = ducks.createAction(REQUEST_SUCCESS);
export const requestFailure = ducks.createAction(REQUEST_FAILURE);

const initialState = fromJS({
  loading: false,
  data: [],
  error: null,
  record: null,
});

export default ducks.createReducer(
  {
    [REQUEST]: state => state.setIn(['loading'], true),
    [REQUEST_SUCCESS]: (state, { payload }) => {
      return state.setIn(['data'], fromJS(payload)).setIn(['loading'], false);
    },
    [REQUEST_FAILURE]: (state, { payload }) =>
      state.setIn(['error'], payload).setIn(['loading'], false),
  },
  initialState,
);
