import React from 'react';
import { object } from 'prop-types';
import { compose, pure, withProps, getContext, lifecycle } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import App from '../../components/App';
import AsyncRoute from '../../routing/AsyncRoute';
import withAsyncDependencies from '../../utils/withAsyncDependencies';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import {
  menuItemsSelector,
  expandedMenuItemsSelector,
  selectedMenuItemSelector,
} from './selectors';
import { changeExpandedMenuItems } from './ducks';
import cookie from '../../services/cookie';


function NestedRoutes() {
  return (
    <Switch>
      <AsyncRoute
        exact
        path="/"
        requireComponent={() => {
          return import('../../containers/Mention');
        }}
      />
      <AsyncRoute
        exact
        path="/users"
        requireComponent={() => {
          return import('../../containers/Users');
        }}
      />
      <AsyncRoute
        path="/thematics"
        requireComponent={() => {
          return import('../../containers/Thematics');
        }}
      />
      <AsyncRoute
        exact
        path="/user_roles"
        requireComponent={() => {
          return import('../../containers/UserRoles');
        }}
      />
      <AsyncRoute
        exact
        path="/priority_coefficients"
        requireComponent={() => {
          return import('../../containers/PriorityCoefficients');
        }}
      />
      <AsyncRoute
        exact
        path="/important_authors"
        requireComponent={() => {
          return import('../../containers/ImportantAuthors');
        }}
      />
      <Route
        component={() => (
          <span>
            404: Страница не найдена. Нам очень жаль. Выберите другой пункт в
            меню.
          </span>
        )}
      />
    </Switch>
  );
}

const mapStateToProps = createStructuredSelector({
  menuItems: menuItemsSelector,
  expandedMenuItems: expandedMenuItemsSelector,
  selectedMenuItem: selectedMenuItemSelector,
});

const mapDispatchToProps = {
  onChangeExpandedMenuItems: changeExpandedMenuItems,
};

export default compose(
  withProps(props => ({
    children: NestedRoutes(props),
    isAuthorized: !!cookie.get('Authorization'),
  })),
  getContext({
    store: object,
  }),
  withAsyncDependencies(({ store }) =>
    Promise.all([
      import('./ducks'),
      import('./sagas'),
    ]).then(([reducer, saga]) => {
      injectReducer(store, 'app', reducer);
      injectSaga(store, saga);
      store.dispatch(reducer.menuItemsRequest());
    }),
  ),
  lifecycle({
    componentWillMount() {
      if (!cookie.get('Authorization')) {
        console.log('INTRUDER');
        window.location = '/auth';
      }
    },
  }),
  connect(mapStateToProps, mapDispatchToProps),
  pure,
)(App);
