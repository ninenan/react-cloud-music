import styled from "styled-components";
import style from '../../style/common';

export const List = styled.div`
  height: 30px;
  white-space: nowrap;
  display: inline-block;
  overflow: hidden;
  >span {
    display: inline-block;
  }
  >span:first-of-type {
    flex: 0 0 auto;
    padding: 5px 0;
    margin-right: 5px;
    color: grey;
    font-size: ${style["font-size-m"]};
    vertical-align: middle;
  }
`
export const ListItem = styled.span`
  padding: 5px 8px;
  border-radius: 10px;
  flex: 0 0 auto;
  font-size: ${style["font-size-m"]};
  &.active {
    border: 1px solid ${style["theme-color"]};
    color: ${style["theme-color"]};
    opacity: 0.8;
  }
`
