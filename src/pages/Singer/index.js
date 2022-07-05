import { memo, useCallback, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useNavigate } from 'react-router-dom';
import { Container } from './style';
import Header from '../../components/base/Header';

const Singer = () => {
  const [isShow, setIsShow] = useState(true);
  const navigate = useNavigate();

  const hanleExit = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleToBack = () => {
    setIsShow(false);
  };


  return (
    <CSSTransition
      in={isShow}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={hanleExit}
    >
      <Container>
        <Header title="标题" handleClick={handleToBack}/>
      </Container>
    </CSSTransition>
  )
}

export default memo(Singer);
