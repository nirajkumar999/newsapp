import React, { Component } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUp } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';


const apiKey = 'c8f17bd15a7d4b45be77b4d0cc0a614c';
//const apiKey = 'e4f52cf2b43f4a8d9e98d37368bd407e';
//const apiKey = 'e42188c058484d74b08bd58fed2bde25';

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

const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
};

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


    constructor(props) {
        super(props); // to use props inside our constructor, we need to pass props as an argument
        this.abortController = new AbortController();
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0,
            currentDate: new Date()
        }
        document.title = `${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} - NewsMonkey`
    }

    scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth" // For smooth scrolling
        });
    };

    async updateNews() {

        const { signal } = this.abortController;
        // Set the User-Agent header
        const headers = {
            'User-Agent': 'NewsMonkey/1.0',
            'Authorization': `Bearer ${apiKey}`,
        };

        this.props.setProgress(10);

        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

        this.setState({ loading: true })

        let data = await fetch(url, { signal, headers });

        this.props.setProgress(30);

        let parsedData = await data.json();

        this.props.setProgress(70);

        console.log(parsedData);
        this.setState({
            articles: parsedData.articles || [],
            totalResults: parsedData.totalResults,
            loading: false,
        });
        this.props.setProgress(100);


    }

    componentDidMount() {
        this.updateNews();
        this.intervalId = setInterval(() => {
            this.setState({ currentDate: new Date() });
        }, 1000);
    }

    componentWillUnmount() {
        // Clear the interval when the component is unmounted to prevent memory leaks
        clearInterval(this.intervalId);
    }

    fetchMoreData = async () => {

        this.setState({ page: this.state.page + 1 })

        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;

        this.setState({ loading: true })
        let data = await fetch(url);

        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false
        });
    };

    render() {
        const dateStr = this.state.currentDate.toLocaleString('en-IN', dateOptions);

        return (


            <>
                    <h1 className='text-center' style={{ margin: '35px 0px' }}>
                        NewsMonkey - Top Headlines - {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)}
                        <i className={`fas ${getCategoryIcon(this.props.category)}`} style={{ marginLeft: '12px', fontSize: '50px' }}></i>
                    </h1>

                    <div className="text-center">
                        <p style={{ fontWeight: 'bold', fontSize: '22px' }}>
                            <i className="fas fa-calendar-alt" style={{ marginRight: '8px', fontSize: '30px' }}></i>
                            {dateStr.replace('IST', '(IST)')}
                        </p>
                    </div>

                    {this.state.loading && <Spinner />}

                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        //use < instead of !==
                        hasMore={this.state.articles.length < this.state.totalResults}
                        loader={this.state.loading && <Spinner />}
                    >
                        <div className="container">

                            <div className="row">
                                {this.state.articles.map((element, index) => {
                                    return <div className="col-md-4" key={index}>
                                        <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                    </div>
                                })}
                            </div>
                        </div>
                    </InfiniteScroll>


                {this.state.loading === false && this.state.articles.length >= this.state.totalResults && (
                    <div className="text-center">
                        <Button variant="primary" onClick={this.scrollToTop}>
                            Back To Top &nbsp;<FontAwesomeIcon icon={faCircleUp} beat size="xl" />
                        </Button>
                    </div>
                )}
            </>
        )
    }
}

export default News