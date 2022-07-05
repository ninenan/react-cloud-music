import styled from 'styled-components';
import style from '../../style/common';

export const Container = styled.div`
  ${style.baseContainer()};
  &.fly-appear {
    transform-origin: right bottom;
    opacity: 0;
    transform: rotateZ(30deg) translate3d(100%, 0, 0);
  }
   &.fly-appear-active, &.fly-appear-done {
    opacity: 1;
    transition: transform .3s, opacity .3s;
    transform: rotateZ(0deg) translate3d(0, 0, 0);
  }
  &.fly-exit {
    opacity: 0;
    transition: transform .3s, opacity .3s;
    transform: rotateZ(0deg) translate3d(0, 0, 0);
  }
  &.fly-exit-active, &.fly-exit-done {
    opacity: 0;
    transition: transform .3s, opacity .3s;
    transform: rotateZ(30deg) translate3d(0, 0, 0);
  }
`
