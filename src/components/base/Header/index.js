import React from 'react';
import { HeaderContainer } from './style';
import PropTypes from 'prop-types';

const Header = React.forwardRef((props, ref) => {
  const { handleClick, title } = props;

  return (
    <HeaderContainer>
      <span onClick={handleClick}>
        <i className="iconfont back">&#xe655;</i>
        <h1>{title}</h1>
      </span>
    </HeaderContainer>
  )
})

Header.defaultProps = {
  handleClick: () => {},
  title: "标题"
}

Header.propTypes = {
  handleClick: PropTypes.func,
  title: PropTypes.string
}

export default React.memo(Header);
