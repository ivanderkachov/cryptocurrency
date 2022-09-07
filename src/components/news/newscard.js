import React from "react";
import dateFormat from "dateformat";

import './newscard.css'

const Newscard = ({ news }) => {
  const name = news.name
  const description = news.description
  const company = news.company[0].name
  const newsImg = news.newsImg?.thumbnail?.contentUrl
  const companyImg = news.company[0].image?.thumbnail?.contentUrl
  const date = dateFormat(news.date, "m/d/yy, h:MM TT");
  return (
    <a href={news.url} className="newscard" target="_blank">
      <div className="newscard__header">
        <h1>{name}</h1>
        <img className="newscard__header_img" src={newsImg} alt="" />
      </div>
      <div className="newscard__description">{description}</div>
      <div className="newscard__bottom">
        <img className="newscard__bottom_img" src={companyImg} alt="" />
        <h3>{company}</h3>
      </div>
      <div className="newscard__bottom_date">{date}</div>
    </a>
  );
}

export default Newscard