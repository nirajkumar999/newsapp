import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'

export class News extends Component {

    constructor(){
        super();
        this.state = {
            articles: [],
            loading: false,
            page:1
        }
    }

    async componentDidMount(){ 
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=e4f52cf2b43f4a8d9e98d37368bd407e&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData); 
        this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false})
    }

     handlePrevClick = async ()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=e4f52cf2b43f4a8d9e98d37368bd407e&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        })

    }
    
     handleNextClick = async ()=>{
            let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=e4f52cf2b43f4a8d9e98d37368bd407e&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({loading:true});
            let data = await fetch(url);
            let parsedData = await data.json() 
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading: false
            })
    }

    render() { 
        return (
            <div className="container my-3">
                <h1 className='text-center'>NewsMonkey - Top Headlines</h1>
                {this.state.loading && <Spinner/>} 
                <div className="row"> 
                {!this.state.loading && this.state.articles.map((element)=>{
                    return <div className="col-md-4" key={element.url}>
                        <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url}/>
                    </div> 
                })} 
                </div> 
                <div className="container d-flex justify-content-center">
                <button disabled={this.state.page<=1} type="button" className="btn btn-dark mx-3" onClick={this.handlePrevClick} style={{ width: '110px'}}> &larr; Previous</button>
                <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick} style={{ width: '110px' }}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News