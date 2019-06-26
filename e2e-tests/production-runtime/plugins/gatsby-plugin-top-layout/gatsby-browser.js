import React from "react";
import TopLayout from "./top-layout";

export const onClientEntry = () => {
  const head = document.head;
  const injectFirstNode = document.createComment(`mui-inject-first`);
  head.insertBefore(injectFirstNode, head.firstChild);
};

export const wrapRootElement = ({ element }) => {
  return <TopLayout>{element}</TopLayout>;
};
