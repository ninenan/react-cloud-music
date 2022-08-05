import styled from 'styled-components';

export const Content = styled.div`
  position: fixed;
  top: 90px;
  bottom: ${props => props.bottom};
  width: 100%;
  overflow: hidden;
`
