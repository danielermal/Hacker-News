import React, { FC, useEffect, useState } from "react";
import styles from "./style.module.scss";
import { NewsItem } from "../news-item/news-item";
import { useDispatch, useSelector } from "../../servises/hooks";
import {
  fetchNews,
  updateNewsFetch,
} from "../../servises/actions/actionCreators";

export const News: FC = () => {
  const { news, idList, isLoading } = useSelector((state) => state.newsReducer);
  const [numberNews, setNumberNews] = useState(0);
  const [fetching, setFetching] = useState(true);
  const [scroll, setScroll] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const updateInterval = setInterval(() => {
      dispatch(updateNewsFetch(numberNews <= 100 ? numberNews : 100));
    }, 60000);

    return () => {
      clearInterval(updateInterval);
    };
  }, [numberNews]);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return () => document.removeEventListener("scroll", scrollHandler);
  });

  useEffect(() => {
    if (fetching && idList.length && numberNews <= 100) {
      setFetching(false);
      const newsId = idList.slice(numberNews, numberNews + 5);
      dispatch(fetchNews(newsId));
      setNumberNews((prev) => prev + 5);
    }
  }, [fetching, idList]);

  const scrollHandler = (evt: any) => {
    if (
      evt.target.documentElement.scrollHeight -
        (evt.target.documentElement.scrollTop + window.innerHeight) <
      30
    ) {
      setFetching(true);
    }
    const scrolled = window.pageYOffset;
    const coords = document.documentElement.clientHeight;
    if (scrolled > coords) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  const updateNews = () => {
    dispatch(updateNewsFetch(numberNews <= 100 ? numberNews : 100));
  };

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <div className={styles.title_container}>
          <h2 className={styles.title}>Список 100 новых новостей</h2>
          <button type="button" className={styles.update} onClick={updateNews}>
            {!isLoading ? (
              "Обновить ленту"
            ) : (
              <svg className={styles.spinner} viewBox="0 0 50 50">
                <circle
                  className={styles.path}
                  cx="25"
                  cy="25"
                  r="20"
                  fill="none"
                  strokeWidth="5"
                ></circle>
              </svg>
            )}
          </button>
        </div>
        <div className={styles.container}>
          {news.slice(0, 100).map((item, index) => {
            return <NewsItem data={item} number={index + 1} key={index} />;
          })}
          {scroll && (
            <button
              type="button"
              className={styles.goup}
              onClick={scrollTop}
            ></button>
          )}
        </div>
      </section>
    </main>
  );
};
