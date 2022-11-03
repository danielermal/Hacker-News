import { FC, useEffect } from "react";
import { Index } from "../../pages";
import { fetchId } from "../../servises/actions/actionCreators";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import { useDispatch } from "../../servises/hooks";
import { NewsPage } from "../../pages/news-page";

export const App: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchId());
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={'/'}>
          <Index />
        </Route>
        <Route path={'/news/:id'}>
          <NewsPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
