import React from 'react';
import { object } from 'prop-types';
import { compose, pure, withProps, getContext } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { Route, Switch, Redirect } from 'react-router-dom';
import AsyncRoute from '../../../base/routing/AsyncRoute';
import injectReducer from '../../../base/utils/injectReducer';
import injectSaga from '../../../base/utils/injectSaga';
import App from '../../components/App';
import Main from '../Main/MainConnected';
import About from '../About/AboutConnected';
import SignIn from '../SignIn/SignInConnected';
import SignUp from '../SignUp/SignUpConnected';
import Layout from '../Layout/LayoutConnected';
import Profile from '../Profile/ProfileConnected';
import JobForm from '../JobForm/JobFormConnected';

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = {};

export default compose(
  getContext({
    store: object,
  }),
  withProps(({ store }) => ({
    children: getChildren(store),
  })),
  pure,
)(App);

function getChildren(store) {
  return (
    <Switch>
      <Route exact path="/signin" component={SignIn} />

      <Redirect from="/404" to="/signin" />
      <Route>
        <Layout>
          <Switch>
            <AsyncRoute
              exact
              path="/"
              requireComponent={() =>
                Promise.all([import('../Main/MainConnected')]).then(([component]) => {
                    return component;
                  })
              }
            />
            <Route exact path="/about" component={About} />
            <Route exact path="/signup" component={SignUp} />
            <Route strict path="/profile" component={Profile} />
            <Route strict path="/addjob" component={JobForm} />
          </Switch>
        </Layout>
      </Route>
    </Switch>
  );
}
