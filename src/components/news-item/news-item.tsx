import { FC } from "react";
import { INews } from "../../servises/types/news";
import { useHistory } from "react-router-dom";
import styles from "./styles.module.css";

interface INewsItem {
  data: INews;
  number: number
}

export const NewsItem: FC<INewsItem> = ({ data, number }) => {
  const history = useHistory()
  const openNews = () => {
    history.replace({pathname: `/news/${data.id}`})
  }
  return (
    <article className={styles.item} onClick={openNews}>
      <div className={styles.containter}>
        <span className={styles.data}>{data.time}</span>
        <h3 className={styles.title}>{data.title}</h3>
        <ul className={styles.about}>
          <li>Рейтинг: {data.score}</li>
          <li>Автор: {data.by}</li>
        </ul>
      </div>
      <span className={styles.number}>{number}</span>
    </article>
  );
};
