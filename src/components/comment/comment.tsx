import { IComments } from "../../servises/types/news";
import React from "react";
import { FC, ReactNode, useEffect } from "react";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "../../servises/hooks";
import { getCommentsChildrenFetch } from "../../servises/actions/actionCreators";

interface IComment {
  data: IComments;
}

export const Comment: FC<IComment> = ({ data }) => {
  const dispatch = useDispatch();

  const { comments } = useSelector((state) => state.newsReducer);
  
  const childrenCommits = React.useMemo(() => {
        const com = comments.find(item => item.id === data.id)
        if (com?.children) {
            return com
        }
  }, [comments])

  const getComments = () => {
    dispatch(getCommentsChildrenFetch(data));
  };

  return (
    <article className={styles.comment}>
      <h4 className={styles.text}>{data.text}</h4>
      <div className={styles.box}>
        <span>Автор: {data.by}</span>
        {data.kids && (
          <button
            type="button"
            onClick={getComments}
            className={styles.button}
          ></button>
        )}
      </div>
      {childrenCommits && 123}
    </article>
  );
};
