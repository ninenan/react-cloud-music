import styled from 'styled-components';
import style from '../../style/common'

export const Top = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 10px;
  background: ${style["background-color"]};
  &>span {
    line-height: 40px;
    color: #f1f1f1;
    font-size: 20px;
    color: ${style['text-color']};
    &.iconfont {
      font-size: 25px;
    }
  }
`;

export const Tab = styled.div`
  height: 44px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: ${style['background-color']};
  a {
    flex: 1;
    padding: 2px 0;
    font-size: 14px;
    color: ${style['text-color']};
    &.active {
      span {
        padding: 10px 0;
        font-weight: 600;
        color: ${style['theme-color']};
        border-bottom: 2px solid ${style['theme-color']};
      }
    }
  }
`;

export const TabItem = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
