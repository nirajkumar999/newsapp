import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let {title,description,imageurl,newsurl} = this.props;
    return (
      <div className="my-3">
      <div className="card" style={{width: "18rem"}}>
        <img src={!imageurl?"https://images.idgesg.net/images/article/2017/08/ubuntu-100734185-large.jpg?auto=webp&quality=85,70":imageurl} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <a href={newsurl} target="_blank" className="btn btn-sm btn-primary">Read More...</a>
          </div>
      </div>
      </div>
    )
  }
}

export default NewsItem;
