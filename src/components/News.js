import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'

export class News extends Component {

    constructor() {
        super();
        this.abortController = new AbortController();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    async componentDidMount() {

        const { signal } = this.abortController;
        // const apiKey = 'c8f17bd15a7d4b45be77b4d0cc0a614c';
        const apiKey = 'e4f52cf2b43f4a8d9e98d37368bd407e';

        const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}&page=1&pageSize=${this.props.pageSize}`;

        // Set the User-Agent header
        const headers = {
            'User-Agent': 'NewsMonkey/1.0',
            'Authorization': `Bearer ${apiKey}`,
        };

        this.setState({ loading: true })
        let data = await fetch(url, { signal, headers });

        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles || [],
            totalResults: parsedData.totalResults,
            loading: false
        })
    }

    handlePrevClick = async () => {
        const { signal } = this.abortController;
        // const apiKey = 'c8f17bd15a7d4b45be77b4d0cc0a614c';
        const apiKey = 'e4f52cf2b43f4a8d9e98d37368bd407e';
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;

        // Set the User-Agent header
        const headers = {
            'User-Agent': 'NewsMonkey/1.0',
            'Authorization': `Bearer ${apiKey}`,
        };

        this.setState({ loading: true });
        let data = await fetch(url, { signal, headers });
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        })

    }

    handleNextClick = async () => {

        const { signal } = this.abortController;
        // const apiKey = 'c8f17bd15a7d4b45be77b4d0cc0a614c';
        const apiKey = 'e4f52cf2b43f4a8d9e98d37368bd407e';

        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;

         // Set the User-Agent header
         const headers = {
            'User-Agent': 'NewsMonkey/1.0',
            'Authorization': `Bearer ${apiKey}`,
        };

        this.setState({ loading: true });
        let data = await fetch(url, { signal, headers });
        
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
                {this.state.loading && <Spinner />}
                {this.state.articles.length > 0 ? (
                    <div className="row">
                        {!this.state.loading && this.state.articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} />
                            </div>
                        })}
                    </div>)
                    : (<p>No articles to Display</p>)}

                <div className="container d-flex justify-content-center">

                    {/* if the page is loading i have disabled the button */}

                    <button disabled={this.state.page <= 1 || this.state.loading} type="button" className="btn btn-dark mx-3" onClick={this.handlePrevClick} style={{ width: '110px' }}> &larr; Previous</button>

                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize) || this.state.loading} type="button" className="btn btn-dark" onClick={this.handleNextClick} style={{ width: '110px' }}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News