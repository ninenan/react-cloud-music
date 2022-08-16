import styled, { keyframes } from 'styled-components';
import style from '../../../style/common';

export const confirmFadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

export const confirmFadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`

export const confirmZoomIn = keyframes`
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`
const confirmZoomOut = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0,5);
  }
  100% {
    transform: scale(0);
  }
`

export const ConfirmWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10010;
  background: ${style['background-color-shadow']};
  ${style.flexCenterCenter()};
  &.confirm-fade-enter-active {
    animation: ${confirmFadeIn} .3s;
    .confirm__container {
      animation: ${confirmZoomIn} .3s;
    }
  }
  &.confirm-fade-exit-active {
    animation: ${confirmFadeOut} .3s;
    .confirm__contaienr {
      animation: ${confirmZoomOut} .3s;
    }
  }
  .confirm__container {
    width: 270px;
    border-radius: 14px;
    background: ${style['highlight-background-color']};
    .text {
      padding: 19px 15px;
      line-height: 22px;
      text-align: center;
      font-size: ${style['font-size-l']};
      color: ${style['font-color-desc-v2']};
    }
    .operate {
      ${style.flexCenterCenter()};
      font-size: ${style['font-size-l']};
      .operate__btn {
        flex: 1;
        line-height: 22px;
        padding: 10px 0;
        text-align: center;
        border-top: 1px solid ${style['background-color-d']};
        &.left {
          border-right: 1px solid ${style['background-color-d']};
        }
      }
    }
  }
`
