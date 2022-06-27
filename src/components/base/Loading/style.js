import styled, { keyframes } from "styled-components";
import style from "../../../style/common";

const loading = keyframes`
  0%, 100% {
    transform: scale(0.0);
  }
  50% {
    transform: scale(1.0);
  }
`

export const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  >div {
    position: absolute;
    z-index: 1000;
    left: 0; 
    right: 0;  
    top: 0;
    bottom: 0;
    margin: auto;
    width: 50px;
    height: 50px;
    opacity: 0.6;
    border-radius: 50%;
    background-color: ${style["theme-color"]};
    animation: ${loading} 1.4s infinite ease-in;
  }
  >div:nth-child (2) {
    animation-delay: -0.7s;
  }
`
