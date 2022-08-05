import styled from 'styled-components';
import style from "../../style/common";

export const Container = styled.div`
  position: fixed;
  top: 90px;
  bottom: ${props => props.bottom};
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
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

export const GlobalList = styled.ul`
  margin: 10px 20px 0;
  display: flex;
  flex-wrap: wrap;
`

export const GlobalListItem = styled.li`
  width: 50%;
  padding-bottom: 10px;
  .item__container {
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .update-frequency {
      position: absolute;
      bottom: 10px;
      left: 10px;
      font-size: ${style["font-size-ss"]};
    }
  }
  
`
