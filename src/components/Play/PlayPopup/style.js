import styled from 'styled-components';
import style from '../../../style/common';

export const ListHeader = styled.div`
  position: relative;
  padding: 20px 30px 10px 20px;
  .title {
    display: flex;
    align-items: center;
    > div {
      display: flex;
      align-items: center;
      flex: 1;
      font-size: ${style['font-size-m']};
      color: ${style['font-color-desc']}
    }
  }
  .iconfont {
    font-size: ${style['font-size-ll']};
    color: ${style['theme-color']};
  }
  .text {
    margin-left: 10px;
  }
  .clear {
    font-size: ${style['font-size-l']};
  }
`
export const ListContent = styled.div`
  .item {
    display: flex;
    align-items: center;
    height: 40px;
    padding: 0 30px 0 20px;
    .current {
      flex: 0 0 20px;
      width: 20px;
      font-size: ${style["font-size-s"]};
      color: ${style["theme-color"]};
    }
    .text {
      flex: 1;
      ${style.noWrap()}
      font-size: ${style["font-size-m"]};
      color: ${style["font-color-desc-v2"]};
      .icon-favorite {
        color: ${style["theme-color"]};
      }
    }
    .like {
      ${style.extendClick()}
      margin-right: 15px;
      font-size: ${style["font-size-m"]};
      color: ${style["theme-color"]};
    }
    .delete {
      ${style.extendClick()}
      font-size: ${style["font-size-s"]};
      color: ${style["theme-color"]};
    }
  }
`
