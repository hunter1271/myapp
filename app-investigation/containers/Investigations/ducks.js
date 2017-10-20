import { createDuck } from 'redux-duck';
import { fromJS } from 'immutable';

const ducks = createDuck('Investigations');

export const INVESTIGATIONS_REQUEST = ducks.defineType(
  'INVESTIGATIONS_REQUEST',
);
export const INVESTIGATIONS_REQUEST_SUCCESS = ducks.defineType(
  'INVESTIGATIONS_REQUEST_SUCCESS',
);
export const INVESTIGATIONS_REQUEST_FAILURE = ducks.defineType(
  'INVESTIGATIONS_REQUEST_FAILURE',
);
export const SELECT_INVESTIGATION = ducks.defineType('SELECT_INVESTIGATION');

export const investigationsRequest = ducks.createAction(INVESTIGATIONS_REQUEST);
export const investigationsRequestSuccess = ducks.createAction(
  INVESTIGATIONS_REQUEST_SUCCESS,
);
export const investigationsRequestFailure = ducks.createAction(
  INVESTIGATIONS_REQUEST_FAILURE,
);
export const selectInvestigation = ducks.createAction(SELECT_INVESTIGATION);

const initialState = fromJS({
  loading: false,
  data: [],
  error: null,
  selectedInvestigation: null,
});

export default ducks.createReducer(
  {
    [INVESTIGATIONS_REQUEST]: state => state.setIn(['loading'], true),
    [INVESTIGATIONS_REQUEST_SUCCESS]: (state, { payload }) => {
      return state.setIn(['data'], fromJS(payload)).setIn(['loading'], false);
    },
    [INVESTIGATIONS_REQUEST_FAILURE]: (state, { payload }) =>
      state.setIn(['error'], payload).setIn(['loading'], false),
    [SELECT_INVESTIGATION]: (state, { payload }) =>
      state.setIn(['selectedInvestigation'], payload),
  },
  initialState,
);