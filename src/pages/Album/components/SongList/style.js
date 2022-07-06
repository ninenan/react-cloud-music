import styled from 'styled-components';
import style from '../../../../style/common';

export const SongList = styled.ul`
  .item {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 64px;
    font-size: ${style["font-size:m"]};
  }
  .item-num {
    width: 60px;
    line-height: 64px;
    text-align: center;
    color: ${style['theme-color']};
  }
  .content {
    flex: 1;
    line-height: 20px;
    overflow: hidden;
    .name {
      ${style.noWrap()};
      color: ${style['font-color']};
    }
    .desc {
      margin-top: 4px;
      ${style.noWrap()};
      color: ${style['font-color-desc']};
    }
  }
`
