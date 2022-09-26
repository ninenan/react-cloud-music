import { useState, useEffect } from 'rect';
import { CSSTransition } from 'react-transition-group';
import { Container } from './style';

export default function Search(props) {
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    setIsShow(true);
  }, [])

  return (
    <CSSTransition
      in={isShow}
      timeout={300}
      appear={true}
      classNames="fly"
      unmountOnExit
      onExit={() => props.history.toBack()}
    >
      <Container>
        <div onClick={() => setIsShow(false)}>返回</div>
      </Container>
    </CSSTransition>
  )
};

