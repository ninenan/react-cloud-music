import styled from 'styled-components';
import style from '../../../style/common';

export const HeaderContainer = styled.div`
  position: fixed;
  padding: 0 10px;
  height: 40px;
  width: 100%;
  z-index: 100;
  display: flex;
  line-height: 40px;
  color: ${style["theme-color"]};
  span {
    display: flex;
    align-item: center;
  }
  .back {
    margin-right: 5px;
    font-size: 20px;
    width: 20px;
  }
  >h1 {
    font-size: ${style["font-size-l"]};
    font-weight: 700;
  }
`
