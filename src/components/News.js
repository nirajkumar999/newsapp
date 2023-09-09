import React, { Component } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

const apiKey = 'c8f17bd15a7d4b45be77b4d0cc0a614c';
// const apiKey = 'e4f52cf2b43f4a8d9e98d37368bd407e';

function getCategoryIcon(category) {
    switch (category) {
        case 'general':
            return 'fa-globe';
        case 'entertainment':
            return 'fa-film';
        case 'business':
            return 'fa-briefcase';
        case 'sports':
            return 'fa-futbol';
        case 'science':
            return 'fa-flask';
        case 'technology':
            return 'fa-laptop';
        case 'health':
            return 'fa-heartbeat';
        default:
            return ''; // Return an empty string for unknown categories
    }
}


export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 9,
        category: 'general',
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }


    constructor() {
        super();
        this.abortController = new AbortController();
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            currentDate: new Date()
        }
    }

    async componentDidMount() {

        const { signal } = this.abortController;

        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${apiKey}&page=1&pageSize=${this.props.pageSize}`;

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
            articles: parsedData.articles || [],
            totalResults: parsedData.totalResults,
            loading: false,
        });

        this.intervalId = setInterval(() => {
            this.setState({ currentDate: new Date() });
        }, 1000);
    }

    componentWillUnmount() {
        // Clear the interval when the component is unmounted to prevent memory leaks
        clearInterval(this.intervalId);
    }

    handlePrevClick = async () => {
        const { signal } = this.abortController;
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${apiKey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;

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

        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;

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
                <h1 className='text-center' style={{ margin: '35px 0px' }}>
                    NewsMonkey - Top Headlines - {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)}
                    <i className={`fas ${getCategoryIcon(this.props.category)}`} style={{ marginLeft: '12px', fontSize: '50px' }}></i>
                </h1>
                <div className="text-center">
                    <p style={{ fontWeight: 'bold', fontSize: '22px' }}>
                        <i className="fas fa-calendar-alt" style={{ marginRight: '8px', fontSize: '30px'}}></i>
                        {this.state.currentDate.toLocaleString()}
                    </p>
                </div>
                {this.state.loading && <Spinner />}
                {this.state.articles.length > 0 ? (
                    <div className="row">
                        {!this.state.loading && this.state.articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} />
                            </div>
                        })}
                    </div>)
                    : (<h3>Please Wait ... </h3>)}

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