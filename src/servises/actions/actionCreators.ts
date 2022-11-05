import { getTime, checkResponse } from "./../../components/utils/constants";
import { IComments, INews } from "./../types/news";
import { newsSlice } from "./../reducers/newsSlice";
import { AppDispatch, RootState } from "../store";

export const fetchId = () => (dispatch: AppDispatch) => {
  dispatch(newsSlice.actions.newsFetching());
  fetch("https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty")
    .then((data) => data.json())
    .then((newsId: number[]) => {
      dispatch(newsSlice.actions.idFetching(newsId.slice(0, 100)));
    })
    .catch((err) => dispatch(newsSlice.actions.newsFetchingError(err.message)));
};

export const fetchNews = (newsId: number[]) => (dispatch: AppDispatch) => {
  dispatch(newsSlice.actions.newsFetching());
  newsId.forEach((id) => {
    fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
      .then(checkResponse)
      .then((news) => {
        const time = getTime(news.time);
        news.time = time;
        dispatch(newsSlice.actions.newsFetchingSuccess(news));
      })
      .catch((err) =>
        dispatch(newsSlice.actions.newsFetchingError(err.message))
      );
  });
};

export const updateNewsFetch =
  (n: number) => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(newsSlice.actions.newsFetching());
    const { idList } = getState().newsReducer;
    const arr = idList.slice(0, n);
    const series = async () => {
      let results: INews[] = [];
      for (let i = 0; i < arr.length; i++) {
        const response = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${arr[i]}.json?print=pretty`
        );
        const news = await response.json();
        const time = getTime(news.time);
        news.time = time;
        await results.push(news);
      }
      return results;
    };
    const res = await series();
    dispatch(newsSlice.actions.updateNews(res));
  };

export const getNewsItemFetch = (id: string) => (dispatch: AppDispatch) => {
  dispatch(newsSlice.actions.newsFetching());
  fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
    .then(checkResponse)
    .then((news) => {
      const time = getTime(news.time);
      news.time = time;
      dispatch(newsSlice.actions.newsItemFetching(news));
    })
    .catch((err) => {
      dispatch(newsSlice.actions.newsFetchingError(err.message));
    });
};

export const getCommentsFetch =
  (comments: number[]) => async (dispatch: AppDispatch) => {
    dispatch(newsSlice.actions.newsFetching());
    const series = async () => {
      let results: IComments[] = [];
      for (let i = 0; i < comments.length; i++) {
        try {
          const response = await fetch(
            `https://hacker-news.firebaseio.com/v0/item/${comments[i]}.json?print=pretty`
          );
          if (!response.ok) throw new Error(response.statusText);
          const comment = await response.json();
          const time = getTime(comment.time);
          comment.time = time;
          await results.push(comment);
        } catch (err) {
          console.log(err);
        }
      }
      return results;
    };
    const res = await series();

    dispatch(newsSlice.actions.commentsFetching(res));
  };

export const getCommentsChildrenFetch =
  (comment: IComments) => async (dispatch: AppDispatch) => {
    dispatch(newsSlice.actions.newsFetching());
    const series = async () => {
      let results: IComments[] = [];
      for (let i = 0; i < comment.kids.length; i++) {
        try {
          const response = await fetch(
            `https://hacker-news.firebaseio.com/v0/item/${comment.kids[i]}.json?print=pretty`
          );
          if (!response.ok) throw new Error(response.statusText);
          const newComment = await response.json();
          const time = getTime(newComment.time);
          newComment.time = time;
          await results.push(newComment);
        } catch (err) {
          console.log(err);
        }
      }
      return results;
    };
    const res = await series();

    const commentsList = { parent: comment.id, comments: res };

    dispatch(newsSlice.actions.commentsChildrenFetching(commentsList));
  };

export const commetsNumberFetching = () => (dispatch: AppDispatch) => {
  dispatch(newsSlice.actions.commentsNumber());
};

export const clearComments = () => (dispatch: AppDispatch) => {
  dispatch(newsSlice.actions.clearComments());
};
