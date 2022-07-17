import styled, { keyframes } from 'styled-components';
import style from '../../../style/common';

const rotate = keyframes`
  0% {
    transform: rotate(0);
  }
  100% {
    transform: totate(360deg);
  }
`

export const MiniPlayerContainer = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 100;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  background-color: ${style["background-highlight-color"]};
  &.mini-player-enter {
    transform: translate3d(0, 100%, 0);
  }
  &.mini-player-enter-active {
    transform: translate3d(0, 0, 0);
    transition: all .3s;
  }
  &.mini-player-exit-active {
    transform: translate3d(0, 100%, 0);
    transition: all .3s;
  }
  .icon {
    flex: 0 0 40px;
    width: 40px;
    height: 40px;
    padding: 0 10px 0 20px;
    .imgWrapper {
      width: 100%;
      height: 100%;
      img {
        border-radius: 50%;
        &.play {
          animation: ${rotate} 10s infinite;
          &.pause {
            animation-play-state: paused;
          }
        }
      }
    }
  }
  .text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    line-height: 20px;
    overflow: hidden;
    .name {
      margin-bottom: 2px;
      font-size: ${style["font-size-m"]};
      color: ${style["font-color-desc"]};
      ${style.noWrap()}
    }
    .desc {
      font-size: ${style["font-size-s"]};
      color: ${style["font-color-desc-v2"]};
      ${style.noWrap()}
    }
  }
  .control {
    flex: 0 0 30px;
    padding: 0 10px;
    .iconfont, .icon-playlist {
      font-size: 30px;
      color: ${style["theme-color"]};
    }
    .icon-mini {
      font-size: 16px;
      position: absolute;
      left: 8px;
      top: 8px;
      &.icon-play {
        left: 9px
      }
    }
  }
`
