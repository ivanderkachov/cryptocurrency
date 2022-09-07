import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getCoinNews } from "../../redux/reducers/reducer";
import Newscard from "./newscard";
import "./news.css";

const News = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCoinNews("Bitcoin"));
  },[])

  const news = useSelector((store) => store.reducer.news)

  return (
    <>
    {news !== ''
      ? <div className="news">
        {Object.values(news).map((it) => {
          return (
              <Newscard news={it} />
          );
        })}

      </div>
      : <div>Loading ...</div>
      }
    </>
  );
};

export default News;
