import { PopupWrapper, ScrollWrapper } from './style';

const Popup = (props) => {
  return (
    <PopupWrapper>
      <div className='popup__container'>
        <ScrollWrapper></ScrollWrapper>
      </div>
    </PopupWrapper>
  )
}

export default Popup;
