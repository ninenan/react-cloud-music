import { Container } from './style';
import { CSSTransition } from 'react-transition-group';
import { useState } from 'react';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom'
import Header from '../../components/base/Header';

function Album(props) {
  const [isShowStatus, setIsShowStatus] = useState(true);
  const navigate = useNavigate();

  const handleGoBack = () => {
    setIsShowStatus(false);
  }

  const toBack = () => {
    navigate(-1);
  }

  return (
    <CSSTransition
      in={isShowStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={toBack}
    >
      <Container>
        <Header title="返回" handleClick={handleGoBack}/>
      </Container>
    </CSSTransition>
  )
}

export default memo(Album);
