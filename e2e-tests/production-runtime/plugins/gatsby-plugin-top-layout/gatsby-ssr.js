import React from "react";
import TopLayout from "./top-layout";

export const wrapRootElement = ({ element }) => {
  return <TopLayout>{element}</TopLayout>;
};
