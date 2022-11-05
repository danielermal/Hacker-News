import { IComments } from "../../servises/types/news";
import React, { useState } from "react";
import { FC } from "react";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from "../../servises/hooks";
import {
  commetsNumberFetching,
  getCommentsChildrenFetch,
} from "../../servises/actions/actionCreators";

interface IComment {
  data: IComments;
}

export const Comment: FC<IComment> = ({ data }) => {
  const dispatch = useDispatch();
  const { commentsList } = useSelector((state) => state.newsReducer);
  const [showComments, setShowComments] = useState(false);

  const childrenCommits = React.useMemo(() => {
    const com = commentsList.find((item) => item.parent === data.id);
    return com;
  }, [commentsList]);

  const getComments = () => {
    dispatch(getCommentsChildrenFetch(data));
    setShowComments(false);
  };

  React.useEffect(() => {
    if (data.kids) {
      setShowComments(true);
    }
    dispatch(commetsNumberFetching());
  }, []);

  return (
    <article className={styles.comment}>
      <h4 className={styles.text}>{data.text}</h4>
      <div className={styles.box}>
        <span>Автор: {data.by}</span>
        {showComments && (
          <button
            type="button"
            onClick={getComments}
            className={styles.button}
          ></button>
        )}
      </div>
      {childrenCommits &&
        childrenCommits.comments.map((item, index) => (
          <Comment data={item} key={index} />
        ))}
    </article>
  );
};
