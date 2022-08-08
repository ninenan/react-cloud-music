import { PopupWrapper, ScrollWrapper } from './style';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import { useRef } from 'react';

const Popup = (props) => {
  const { visable, onClose } = props;
  const popupWrapperRef = useRef(null);
  const popupContainerRef = useRef(null);

  const handleOnEnter = () => {};
  const handleOnEntering = () => {};
  const handleOnExiting = () => {};
  const handleOnexited = () => {};

  return (
    <CSSTransition
      in={visable}
      timeout={300}
      classNames="popup-fade"
      onEnter={handleOnEnter}
      onEntering={handleOnEntering}
      onExiting={handleOnExiting}
      onExited={handleOnexited}
    >
      <PopupWrapper 
        onClick={() => onClose(false)}
        ref={popupWrapperRef}
        style={visable ? {display: 'block'} : {display: 'none'}}
      >
        <div className='popup__container' ref={popupContainerRef}>
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
