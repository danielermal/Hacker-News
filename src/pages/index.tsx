import React, { FC } from "react";
import { Header } from "../components/header/header";
import { News } from "../components/news/news";
export const Index: FC = () => {
  return (
    <>
      <Header />
      <News />
    </>
  );
};
