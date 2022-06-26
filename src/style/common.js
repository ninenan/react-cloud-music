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

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  ...variable,
  extendClick,
  noWrap,
  flexCenterCenter
}
