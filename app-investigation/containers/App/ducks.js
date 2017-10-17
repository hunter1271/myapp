import { fromJS } from 'immutable';
import { createDuck } from 'redux-duck';

const ducks = createDuck('App');

export const MENU_COLLAPSE = ducks.defineType('MENU_COLLAPSE');
export const MENU_EXPAND = ducks.defineType('MENU_EXPAND');

export const CHANGE_EXPANDED_MENU_ITEMS = ducks.defineType(
  'CHANGE_EXPANDED_MENU_ITEMS',
);
export const CHANGE_SELECTED_MENU_ITEM = ducks.defineType(
  'CHANGE_SELECTED_MENU_ITEM',
);
export const USER_DATA_REQUEST = ducks.defineType('USER_DATA_REQUEST');
export const USER_DATA_SUCCESS = ducks.defineType('USER_DATA_SUCCESS');
export const USER_DATA_FAILURE = ducks.defineType('USER_DATA_FAILURE');

export const menuCollapse = ducks.createAction(MENU_COLLAPSE);
export const menuExpand = ducks.createAction(MENU_EXPAND);

export const changeExpandedMenuItems = ducks.createAction(
  CHANGE_EXPANDED_MENU_ITEMS,
);
export const changeSelectedMenuItem = ducks.createAction(
  CHANGE_SELECTED_MENU_ITEM,
);

export const userDataRequest = ducks.createAction(USER_DATA_REQUEST);
export const userDataSuccess = ducks.createAction(USER_DATA_SUCCESS);
export const userDataFailure = ducks.createAction(USER_DATA_FAILURE);

const initialState = fromJS({
  userData: null,
  token: null,

  loadingMenuItems: false,
  isMenuCollapsed: false,
  expandedMenuItems: [],
  selectedMenuItem: null,

  permissions: {
    authorized: false,

    usersView: true,
    usersEdit: true,

    userRolesView: true,
    userRolesEdit: true,
  },
});

export default ducks.createReducer(
  {
    [MENU_COLLAPSE]: state => state.set('isMenuCollapsed', false),
    [MENU_EXPAND]: state => state.set('isMenuCollapsed', true),

    [CHANGE_EXPANDED_MENU_ITEMS]: (state, { payload }) =>
      state.set('expandedMenuItems', fromJS(payload)),
    [CHANGE_SELECTED_MENU_ITEM]: (state, { payload }) =>
      state.set('selectedMenuItem', payload),

    [USER_DATA_SUCCESS]: (state, { payload }) =>
      state.set('userData', Map(payload.userData)).set('token', payload.token),
  },
  initialState,
);