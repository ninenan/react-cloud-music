import styled from 'styled-components';
import style from '../../style/common';

export const Container = styled.div`
  postition: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  overflow: hidden;
  background: ${style['background-color-d']};
  transform-origin: right bottom;
`
