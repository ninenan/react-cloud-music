import variable from './variable';

// 扩大可点击区域
const extendClick = () => {
  return `
    position: relative;
    &:before {
      content: '';
      position: absolute;
      top: -10px; bottom: -10px; left: -10px; right: -10px;
    };
  `
}

// 一行文字溢出部分用... 代替
const noWrap = () => {
  return `
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  `
}

const flexCenterCenter = () => {
  return `
    display: flex;
    justify-content: center;
    align-items: center
  `
}

const baseContainer = () => {
  return `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background: ${variable["background-color"]};
  `
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  ...variable,
  extendClick,
  noWrap,
  flexCenterCenter,
  baseContainer
}
