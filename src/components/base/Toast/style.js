import styled from 'styled-components';
import style from '../../../style/common';

export const ToastWrapper = styled.div`
  position: fixed;
  bottom: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  ${style.flexCenterCenter()};
  &.drop-enter{
    opacity: 0;
  }
  &.drop-enter-active{
    opacity: 1;
    transition: all 0.3s;
  }
  &.drop-exit-active{
    opacity: 0;
    transition: all 0.3s;
  }
  .text{
    text-align: center;
    padding: 12px;
    border-radius: 8px;
    color: ${style['font-color']};
    background-color: ${style["background-color-shadow"]};
    font-size: ${style["font-size-l"]};
  }
`
