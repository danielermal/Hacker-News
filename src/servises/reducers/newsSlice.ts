import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IComments, INews } from "../types/news";

interface INewsState {
    news: INews[];
    isLoading: boolean;
    error: string;
    idList: number[];
    newsItem: INews | null;
    comments: IComments[]
}

const initialState: INewsState = {
    news: [],
    isLoading: false,
    error: '',
    idList: [],
    newsItem: null,
    comments: []
}

export const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        idFetching(state, action: PayloadAction<number[]>) {
            state.idList = action.payload
        },
        newsFetching(state) {
            state.isLoading = true
        },
        newsFetchingSuccess(state, action: PayloadAction<INews>) {
            state.isLoading = false;
            state.news = [...state.news, action.payload]
        },
        newsFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload
        },
        updateNews(state, action: PayloadAction<INews[]>) {
            state.isLoading = false;
            state.news = action.payload
        },
        newsItemFetching(state, action: PayloadAction<INews>) {
            state.isLoading = false
            state.newsItem = action.payload
        },
        commentsFetching(state, action:PayloadAction<IComments[]>) {
            state.isLoading = false
            state.comments = action.payload
        },
        commentsChildrenFetching(state, action: PayloadAction<IComments[]>) {
            state.isLoading = false
            state.comments = action.payload
        }
    }
})

export default newsSlice.reducer;