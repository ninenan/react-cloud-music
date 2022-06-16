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

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  'theme-color': '#40a9ff',
  'theme-color-shadow': 'rgba (212, 68, 57, .5)',
  'font-color-light': '#f1f1f1',
  'font-color-desc': 'rgba(255, 255, 255, 0.3)',
  'font-color-desc-v2': '#bba8a8',// 略淡
  'font-size-ss': '10px',
  'font-size-s': '12px',
  'font-size-m': '14px',
  'font-size-l': '16px',
  'font-size-ll': '18px',
  "border-color": '#e4e4e4',
  'background-color': '#222',
  'background-highlight-color': '#333',
  'background-color-shadow': 'rgba (0, 0, 0, 0.3)',
  "text-color": 'rgba(255, 255, 255, 0.5)',
  'highlight-background-color': '#333',
  extendClick,
  noWrap
}
