import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../components/header/header";
import { Material } from "../components/material/material";
import { getNewsItemFetch } from "../servises/actions/actionCreators";
import { useDispatch, useSelector } from "../servises/hooks";

export const NewsPage = () => {
  const { id } = useParams<{ id?: string }>();
  const dispatch = useDispatch();
  const { newsItem } = useSelector((state) => state.newsReducer);

  useEffect(() => {
    if (id) {
      dispatch(getNewsItemFetch(id));
    }
  }, [id]);

  return (
    <>
      <Header />
      {newsItem && <Material data={newsItem} />}
    </>
  );
};
