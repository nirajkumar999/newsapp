import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  render() {
    return (
      <div className="container my-3">
        <h2>NewsMonkey - Top Headlines</h2>
        <div className="row mt-4">
        <div className="col-md-4">
        <NewsItem title="myTitle" description="myDescription" imageurl="https://images.idgesg.net/images/article/2017/08/ubuntu-100734185-large.jpg?auto=webp&quality=85,70"/>
        </div>
        <div className="col-md-4">
        <NewsItem title="myTitle" description="myDescription"/>
        </div>
        <div className="col-md-4">
        <NewsItem title="myTitle" description="myDescription"/>
        </div>
        </div>
      </div>
    );
  }
}

export default News;
