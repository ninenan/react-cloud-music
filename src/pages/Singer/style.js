import styled from 'styled-components';
import style from '../../style/common';

export const Container = styled.div`
  ${style.baseContainer()};
  background-color: ${style['background-color']};
  transform-origin: right bottom;
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

export const TopContainer = styled.div`
  position: relative;
  width: 100%;
  background: url(${props => props.bgUrl});
  background-size: cover;
  .filer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(7,17,27,0.3);
  }
`

export const CollectBtnWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  width: 100%;
  z-index: 1;
`

export const CollectBtn = styled.div`
  box-sizing: border-box;
  width: 135px;
  padding: 7px 0;
  margin: 0 auto;
  text-align: center;
  border: 1px solid ${style['theme-color']};
  color: ${style['theme-color']};
  border-radius: 100px;
  cursor:pointer;
  .iconfont {
    display: inline-block;
    vertical-align: middle;
    font-size: ${style['font-size-s']};
    margin-right: 6px;
  }
  .text {
    display: inline-block;
    vertical-align: middle;
    color: ${style['font-color']};
    font-size: ${style['font-size-m']};
  }
`

export const ListContainer = styled.div`
  position: absolute;
  top: 273px;
  bottom: 0;
  width: 100%;
  .list__wrapper {
    background: ${style['background-color']};
  }
`

