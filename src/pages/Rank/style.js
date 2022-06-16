import styled from 'styled-components';
import style from "../../style/common";

export const Container = styled.div`
  position: fixed;
  top: 90px;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  .title {
    padding: 10px 20px 0;
    margin-bottom: 10px;
    font-weight: 700;
    font-size: ${style["font-size-l"]};
  }

`;
export const List = styled.ul`
  margin-top: 10px;
  flex-wrap: nowrap;
  display: flex;
  background: ${style["background-color"]};
  overflow: auto;
`

export const ListItem = styled.li`
  padding: 3px 0;
  width: 120px;
  height: 120px;
  margin-right: 10px;
  .img-wrapper {
    border-radius: 5px;
    position: relative;
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      border-radius: 3px;
    }
    .update-frequecy {
      position: absolute;
      left: 10px;
      bottom: 10px;
      font-size: ${style["font-size-ss"]};
      color: ${style["font-color-light"]};
    }
  }
`;
export const SongList = styled.ul`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px 10px;
  >li {
    font-size: ${style["font-size-s"]};
    color: grey;
  }
`;
