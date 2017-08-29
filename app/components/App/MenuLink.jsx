import React from 'react';
import { string, number, node, any } from 'prop-types';
import { compose, pure } from 'recompose';
import { Badge } from 'antd';
import { NavLink } from 'react-router-dom';
import styles from './MenuLink.less';

MenuLink.propTypes = {
  title: string.isRequired,
  to: any.isRequired,
  badge: number,
  icon: node,
};

MenuLink.defaultProps = {
  badge: 0,
  icon: null,
};

function MenuLink ({
  title,
  to,
  badge,
  icon,
}) {
  return (
    <span>
      <NavLink to={to} activeClassName={styles.selected}>
        {icon}
        <span>{title} {badge > 0 && <Badge count={badge} />}</span>
      </NavLink>
    </span>
  );
}

export default compose(
  pure,
)(MenuLink);