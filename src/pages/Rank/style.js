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
    font-weight: 700;
    font-size: ${style["font-size-l"]};
  }

`;
export const List = styled.ul`
  margin-top: 10px;
  overflow: auto;
`

export const ListItem = styled.li`
  margin: 0 20px;
  padding-top: 20px;
  display: flex;
  &:first-child { 
    padding-top: 0;
  }
  img {
    width: 100px;
    height: 100px;
  }
`;
export const SongList = styled.ul`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px 10px;
  background-color: ${style["background-highlight-color"]};
  >li {
    font-size: ${style["font-size-s"]};
    color: #ffffff;
  }
`;
