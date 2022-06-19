import { Container } from './style';
import { CSSTransition } from 'react-transition-group';
import { useState } from 'react';
import { memo } from 'react';

function Album() {
  const [isShowStatus, setIsShowStatus] = useState(true);

  return (
    <CSSTransition
      in={isShowStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
    >
      <Container>
        album
      </Container>
    </CSSTransition>
  )
}

export default memo(Album);
