import React from 'react';
import { compose, pure } from 'recompose';
import { Jumbotron, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

Main.propTypes = {};

Main.defaultProps = {};

function Main() {
  return (
    <Jumbotron>
      <h1 className="display-3">Hello, world!</h1>
      <p className="lead">
        This is a simple hero unit, a simple Jumbotron-style component for
        calling extra attention to featured content or information.
      </p>
      <hr className="my-2" />
      <p>
        It uses utility classes for typgraphy and spacing to space content out
        within the larger container.
      </p>
      <p className="lead">
        <Button color="primary">Learn More</Button>
        <Link to="/about" className="btn btn-link">
          About
        </Link>
      </p>
    </Jumbotron>
  );
}

export default compose(pure)(Main);