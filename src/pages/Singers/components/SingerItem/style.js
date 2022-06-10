import styled from "styled-components";
import style from "../../../../style/common";

export const List = styled.div`
  display: flex;
  margin: auto;
  flex-direction: column;
  overflow: hidden;
  .title {
    margin:10px 0 10px 10px;
    color: ${style["font-color-desc"]};
    font-size: ${style["font-size-s"]};
  }
`

export const ListItem = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 0 0 30px;
  &:first-child {
    padding-top: 0;
  }
  img {
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }
  .img-name {
    margin-left: 20px;
    font-size: ${style["font-size-m"]};
    color: ${style["font-color-desc"]};
    font-weight: 500;
  }
`
