import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {

  constructor(){
    super();
    this.state = {
      articles: [],
      loading: false
    }
  }

  async componentDidMount(){
    let url = "https://newsapi.org/v2/top-headlines?sortBy=popularity&country=in&apiKey=e4f52cf2b43f4a8d9e98d37368bd407e";
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({articles:parsedData.articles})
  }
  render() {
    return (
      <div className="container my-3">
        <h1>NewsMonkey - Top Headlines</h1>
        <div className="row mt-4">
          {this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title?element.title.slice(0,100):""}
              description={element.description?element.description.slice(0,150):""}
              imageurl={element.urlToImage}
              newsurl={element.url}/>
        </div>
        })}
        </div>
        </div>
      );
  }
}

export default News;
