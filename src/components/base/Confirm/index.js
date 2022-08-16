import { ConfirmWrapper } from './style'
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { forwardRef, memo, useState, useImperativeHandle } from 'react';

const Confirm = forwardRef((props, ref) => {
  const [visable, setVisable] = useState(false);
  const { text, cancelBtnText, confirmBtnText, onConfirm, onCancel } = props;

  const handleCancel = () => {
    onCancel();
    setVisable(false);
  }

  const handleConfirm = () => {
    onConfirm();
    setVisable(false);
  }

  useImperativeHandle(ref, () => ({
    show() {
      setVisable(true);
    }
  }))

  return (
    <CSSTransition
      appear={visable}
      timeout={300}
      classNames="confirm-fade"
      in={visable}
    >
      <ConfirmWrapper style={{ display: visable ? 'flex' : 'none' }} onClick={e => e.stopPropagation()}>
        <div className='confirm__container'>
          <p className='text'>{text}</p>
          <div className='operate'>
            <div className='operate__btn left' onClick={handleCancel}>{cancelBtnText}</div>
            <div className='operate__btn' onClick={handleConfirm}>{confirmBtnText}</div>
          </div>
        </div>
      </ConfirmWrapper>
    </CSSTransition>
  )
})

Confirm.defaultProps = {
  onCancel: () => { },
  onConfirm: () => { },
  text: '我是内容',
  cancelBtnText: '取消',
  confirmBtnText: '确定',
}

Confirm.propTypes = {
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  text: PropTypes.string.isRequired,
  cancelBtnText: PropTypes.string,
  confirmBtnText: PropTypes.string,
}



export default memo(Confirm);
