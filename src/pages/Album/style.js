import styled from 'styled-components';
import style from '../../style/common';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
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
  .list {
    position: absolute;
    bottom: 0;
    z-index: 0;
    width: 100%;
    > div {
      overflow: visible;
    }
    .song-list-wrapper {
      padding: 20px 30px;
      background: ${style['background-color']};
    }
  }
`

export const TopDesc = styled.div`
  position: absolute;
  top:50px;
  width: 100%;
  padding: 0 20px;
  margin-bottom: 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-size: 100%;
  .img-wrapper{
    width: 120px;
    height: 120px;
    position: relative;         
    .play-count {
      position: absolute;
      right: 5px;
      top: 5px;
      font-size: ${style["font-size-s"]};
      line-height: 15px;
      color: ${style["font-color-light"]};
      .play{
        vertical-align: top;
      }
    }
    img{
      width: 120px;
      height: 120px;
      border-radius:3px;
    }
  }
  .desc-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 120px;
    padding: 0 10px;
    .title{
      max-height: 70px;
      color: ${style["font-color-light"]};
      font-weight: 700;
      line-height: 1.5;
      font-size: ${style["font-size-l"]};
    }
    .person{
      display: flex;
      .avatar{
        width: 20px;
        height: 20px;
        margin-right: 5px;
        img{
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .name {
        line-height: 20px;
        font-size: ${style["font-size-m"]};
        color: ${style["theme-color-d"]};
      }
    }
  }`

export const List = styled.div`
  position: absolute;
  bottom: 0;
  top: ${props => props.top}px;
  z-index: 0;
  width: 100%;
  .song-list-wrapper {
    padding: 20px 30px;
    background: ${style['background-color']};
  }
`

export const BgImage = styled.div`
  position: relative;
  height: 0;
  width: 100%;
  transform-origin: top;
  background: url(${props => props.background}) no-repeat;
  background-size: cover;
  padding-top: 70%;
  .filter {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(7, 17, 27, 0.5);
    z-index: -1;
  }
`

export const PlayBtnWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  width: 100%;
`

export const PlayBtn = styled.div`
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
    font-size: ${style['font-size-l']};
    margin-right: 6px;
  }
  .text {
    display: inline-block;
    vertical-align: middle;
    color: ${style['font-color']};
    font-size: ${style['font-size-s']};
  }
`

