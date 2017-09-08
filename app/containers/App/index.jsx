import React from 'react';
import { compose, pure, withProps } from 'recompose';
import App from '../../components/App';
import AsyncRoute from '../../routing/AsyncRoute';

function NestedRoutes() {
  return (
    <div>
      <AsyncRoute
        exact
        path="/"
        requireComponent={() => {
          return import('../../containers/Mention/Main');
        }}
      />
      <AsyncRoute
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
    </div>
  );
}

export default compose(
  withProps(props => ({ children: NestedRoutes(props) })),
  pure,
)(App);
