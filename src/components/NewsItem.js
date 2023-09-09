import React, { Component } from "react";
import default_image from "../default_image.png"

export class NewsItem extends Component {
  render() {
    let {title,description,imageUrl,newsUrl, author, date, source} = this.props;
    return (
      <div className="my-3">
      <div className="card">
      <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{fontSize: '15px', left:'50%', zIndex:'1'}}> {source}</span>
        <img src={!imageUrl?default_image:imageUrl} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text" style={{ fontWeight: 'bold', fontSize: '17px' }}><small className="text-info">By : {!author?"Unknown author":author} on {!date?"(Date : Unavailable)": new Date(date).toLocaleString()}</small></p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More...</a>
          </div>
      </div>
      </div>
    )
  }
}

export default NewsItem;
