import { PopupWrapper, ScrollWrapper } from './style';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';

const Popup = (props) => {
  const { visable, onClose, children } = props;
  const popupWrapperRef = useRef(null);
  const popupContainerRef = useRef(null);
  const [isShow, setIsShow] = useState(false);

  const handleOnEnter = () => {
    setIsShow(true);
    if (popupContainerRef.current) {
      popupContainerRef.current.style['transform'] = `translate3d(0, 100%, 0)`;
    }
  };

  const handleOnEntering = () => {
    if (popupContainerRef.current) {
      popupContainerRef.current.style['transition'] = `all .3s`;
      popupContainerRef.current.style['transform'] = `translate3d(0, 0, 0)`;
    }
  };
  const handleOnExiting = () => {
    if (popupContainerRef.current) {
      popupContainerRef.current.style['transition'] = `all .3s`;
      popupContainerRef.current.style['transform'] = `translate3d(0, 100%, 0)`;
    }
  };

  const handleOnExited = () => {
    setIsShow(false);
  };

  const handleTest = (e) => {
    e.stopPropagation();
  }

  return (
    <CSSTransition
      in={visable}
      timeout={300}
      classNames="popup-fade"
      onEnter={handleOnEnter}
      onEntering={handleOnEntering}
      onExiting={handleOnExiting}
      onExited={handleOnExited}
    >
      <PopupWrapper 
        onClick={() => onClose(false)}
        ref={popupWrapperRef}
        style={isShow ? {display: 'block'} : {display: 'none'}}
      >
        <div className='popup__container' ref={popupContainerRef} onClick={handleTest}>
          {children}
        </div>
      </PopupWrapper>
    </CSSTransition>
  )
}

Popup.defaultProps = {
  visable: false,
  onClose: () => {}
}

Popup.propTypes = {
  visable: PropTypes.bool.isRequired,
  onClose: PropTypes.func
}

export default Popup;
