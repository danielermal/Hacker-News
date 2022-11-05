import { FC, useEffect } from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import back from "../../images/icons8-u-turn-to-left-50.png";
import { INews } from "../../servises/types/news";
import { Comment } from "../comment/comment";
import { useDispatch, useSelector } from "../../servises/hooks";
import {
  getCommentsFetch,
  getNewsItemFetch,
} from "../../servises/actions/actionCreators";

interface IMaterial {
  data: INews;
}

export const Material: FC<IMaterial> = ({ data }) => {
  const dispatch = useDispatch();

  const { comments, isLoading, commentsNumber } = useSelector(
    (state) => state.newsReducer
  );

  useEffect(() => {
    if (data.kids) {
      dispatch(getCommentsFetch(data.kids));
    }
  }, [data.kids]);

  const updateComments = () => {
    dispatch(getNewsItemFetch(String(data.id)));
  };

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <Link className={styles.back} to="/">
          <img src={back} alt="back" className={styles.arrow} />
          <span>Вернуться к списку новостей</span>
        </Link>
        <span className={styles.date}>{data.time}</span>
        <h2 className={styles.title}>{data.title}</h2>
        <div className={styles.text}>
          <span>Рейтинг: {data.score}</span>
          <span>Автор: {data.by}</span>
        </div>
        <a className={styles.link} href={data.url} target="blank">
          Читать новость
        </a>
        <div className={styles.comments}>
          <div className={styles.loading}>
            <span>Комментарии: {commentsNumber}</span>
            <button
              type="button"
              className={styles.update}
              onClick={updateComments}
            >
              {!isLoading ? (
                "Обновить комментарии"
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

          {data.kids &&
            comments &&
            comments.map((item, index) => (
              <div className={styles.container} key={index}>
                <Comment data={item} key={index} />
              </div>
            ))}
        </div>
      </section>
    </main>
  );
};
