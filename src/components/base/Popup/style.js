import styled from'styled-components';
import style from '../../../style/common';

export const PopupWrapper = styled.div `
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  background-color: ${style["background-color-shadow"]};
  &.popup-fade-enter {
    opacity: 0;
  }
  &.popup-fade-enter-done {
    opacity: 1;
  }
  &.popup-fade-enter-active,
  &.popup-fade-exit-active {
    opacity: 1;
    transition: all .3s;
  }
  &.popup-fade-exit {
    opacity: 0;
    transition: all .3s;
  }
  .popup__container {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    opacity: 1;
    border-radius: 10px 10px 0 0;
    background-color: ${style["highlight-background-color"]};
    transform: translate3d (0, 0, 0);
    .list-close {
      text-align: center;
      line-height: 50px;
      background: ${style["background-color"]};
      font-size: ${style["font-size-l"]};
      color: ${style["font-color-desc"]};
    }
  }
`;

export const ScrollWrapper = styled.div`
  /* height: auto; */
`;
