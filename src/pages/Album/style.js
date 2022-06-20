import styled from 'styled-components';
import style from '../../style/common';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background: ${style["background-color"]};
  transform: translate3d(100%, 0, 0);
  opacity: 0;
  &.fly-appear {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  &.fly-appear-active {
    opacity: 1;
    transition: transform .3s, opacity .3s;
    transform: translate3d(0, 0, 0);
  }
  &.fly-appear-done {
    opacity: 1;
    transition: transform .3, opacity .3s;
    transform: translate3d(0, 0, 0);
  }
  &.fly-exit {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
  &.fly-exit-active {
    opacity: 0;
    transition: transform .3s, opacity .3s;
    transform: translate3d(100%, 0, 0);
  }
  &.fly-exit-done {
    opacity: 0;
    transition: transform .3s, opacity .3s;
    transform: translate3d(100%, 0, 0);
  }

`

