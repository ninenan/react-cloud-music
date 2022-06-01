import styled from 'styled-components';
import style from '../../style/common';

export const ListWrapper = styled.div`
  max-width: 100%;
  .title {
    font-weight: 700;
    padding-left: 6px;
    font-size: 14px;
    line-height: 60px;
    text-align: center;
    color:${style['theme-color']}
  }
`;
export const List = styled.div``;

export const ListItem = styled.div`
  .img__wrapper {
    padding: 0 20px 20px 20px;
    display: flex;
    .right__container {
      flex: 1;
      display: flex;
      justify-content: center;
      flex-direction: column;
    }
    .play_count {
      font-size: ${style["font-size-s"]};
      color: ${style["font-color-desc"]};
      line-height: 15px;
      .play {
        vertical-align: top;
      }
    }
    img {
      width: 60px;
      height: 60px;
      padding-right: 20px;
    }
  }
  .desc {
    font-size: 16px;
    margin-bottom: 8px;
    text-align: left;
    line-height: 1.4;
    color: ${style["font-color-light"]};
    }
`;
