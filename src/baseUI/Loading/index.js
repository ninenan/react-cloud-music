import React from "react";
import { LoadingWrapper } from "./style";

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ children }) => {
  return (
    <LoadingWrapper>
      <div></div>
      <div></div>
    </LoadingWrapper>
  )
}
