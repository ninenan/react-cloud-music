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
  &.exit {
    transform: rotateZ(0deg) translate3d(0, 0, 0);
  }
  &.exit-active {
    transition: transform .3s;
    transform: rotateZ(30deg) translate3d(100%, 0, 0);
  }
`
