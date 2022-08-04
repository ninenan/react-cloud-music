import { forwardRef, memo, useImperativeHandle, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { ToastWrapper } from './style';
import PropTypes from 'prop-types';

const Toast = forwardRef((props, ref) => {
  const [isShow, setIsShow] = useState(false);
  const [timer, setTimer] = useState(null);
  const { text, time } = props;

  // 提供外部组件使用的 show 方法
  useImperativeHandle(ref, () => ({
    show() {
      if (timer) {
        clearTimeout(timer);
      }

      setIsShow(true);
      setTimer(setTimeout(() => {
        setIsShow(false);
      }, time))
    }
  }))

  return (
    <CSSTransition
      in={isShow}
      timeout={time}
      classNames="drop"
      unmountOnExit
    >
      <ToastWrapper>
        <div className='text'>{text}</div>
      </ToastWrapper>
    </CSSTransition>
  )
})

Toast.defaultProps = {
  time: 500,
  text: '',
}

Toast.propTypes = {
  time: PropTypes.number,
  text: PropTypes.string.isRequired,
}

export default memo(Toast);
