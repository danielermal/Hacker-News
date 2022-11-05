import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IComments, ICommentsArr, INews } from "../types/news";

interface INewsState {
  news: INews[];
  isLoading: boolean;
  error: string;
  idList: number[];
  newsItem: INews | null;
  comments: IComments[] | null;
  commentsList: ICommentsArr[];
  commentsNumber: number;
}

const initialState: INewsState = {
  news: [],
  isLoading: false,
  error: "",
  idList: [],
  newsItem: null,
  comments: null,
  commentsList: [],
  commentsNumber: 0,
};

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    idFetching(state, action: PayloadAction<number[]>) {
      state.idList = action.payload;
    },
    newsFetching(state) {
      state.isLoading = true;
    },
    newsFetchingSuccess(state, action: PayloadAction<INews>) {
      state.isLoading = false;
      state.news = [...state.news, action.payload];
    },
    newsFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateNews(state, action: PayloadAction<INews[]>) {
      state.isLoading = false;
      state.news = action.payload;
    },
    newsItemFetching(state, action: PayloadAction<INews>) {
      state.isLoading = false;
      state.newsItem = action.payload;
    },
    commentsFetching(state, action: PayloadAction<IComments[]>) {
      state.isLoading = false;
      state.comments = action.payload;
    },
    commentsChildrenFetching(state, action: PayloadAction<ICommentsArr>) {
      state.isLoading = false;
      state.commentsList = [...state.commentsList, action.payload];
    },
    commentsNumber(state) {
      state.commentsNumber = state.commentsNumber + 1;
    },
    clearComments(state) {
      state.commentsNumber = 0;
      state.comments = null;
      state.newsItem = null;
    },
  },
});

export default newsSlice.reducer;
