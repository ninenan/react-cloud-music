import { PopupWrapper, ScrollWrapper } from './style';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import { useRef } from 'react';

const Popup = (props) => {
  const { visable, onClose } = props;
  const popupWrapperRef = useRef(null);
  const popupContainerRef = useRef(null);

  const handleOnEnter = () => {
    // if (popupContainerRef.current) {
    //   popupContainerRef.current.style['transform'] = `translate3d(0, 100%, 0)`;
    // }
  };

  const handleOnEntering = () => {
    // if (popupContainerRef.current) {
    //   popupContainerRef.current.style['transition'] = `all .3s`;
    //   popupContainerRef.current.style['transform'] = `translate3d(0, 0, 0)`;
    // }
  };
  const handleOnExiting = () => {
    // if (popupWrapperRef.current) {
    //   popupWrapperRef.current.style['transition'] = `all .3s`;
    //   // popupContainerRef.current.style['transform'] = `translate3d(0, 100%, 0)`;
    // }
  };

  const handleOnExited = () => {
    if (popupWrapperRef.current) {
      // popupContainerRef.current.style['transform'] = `translate3d(0, 100%, 0)`;
    }
    popupContainerRef.current.style['transition'] = `all .3s`;
    popupContainerRef.current.style['transform'] = `translate3d(0, 100%, 0)`;
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
        style={visable ? {display: 'block'} : {display: 'none'}}
      >
        <div className='popup__container' ref={popupContainerRef} onClick={handleTest}>
          <ScrollWrapper></ScrollWrapper>
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
