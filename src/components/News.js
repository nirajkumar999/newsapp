import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketball, faBriefcase, faCircleUp, faFilm, faFlaskVial, faGlobe, faHeartPulse, faLaptopCode } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';


//const apiKey = 'c8f17bd15a7d4b45be77b4d0cc0a614c';
//const apiKey = 'e4f52cf2b43f4a8d9e98d37368bd407e';
const apiKey = 'e42188c058484d74b08bd58fed2bde25';

const getCategoryIcon = (category) => {
    switch (category) {
        case 'general':
            return faGlobe;
        case 'entertainment':
            return faFilm;
        case 'business':
            return faBriefcase;
        case 'sports':
            return faBasketball;
        case 'science':
            return faFlaskVial;
        case 'technology':
            return faLaptopCode;
        case 'health':
            return faHeartPulse;
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

const News = (props) => {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [abortController, setAbortController] = useState (new AbortController());
    // document.title = `${props.category.charAt(0).toUpperCase() + props.category.slice(1)} - NewsMonkey`

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth" // For smooth scrolling
        });
    };

    const updateNews = async () => {

        const { signal } = abortController;
        // Set the User-Agent header
        const headers = {
            'User-Agent': 'NewsMonkey/1.0',
            'Authorization': `Bearer ${apiKey}`,
        };

        props.setProgress(10);

        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${apiKey}&page=${page}&pageSize=${props.pageSize}`;

        setLoading(true);

        let data = await fetch(url, { signal, headers });

        props.setProgress(30);

        let parsedData = await data.json();

        props.setProgress(70);

        console.log(parsedData);

        setArticles(parsedData.articles || []);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);


    }

    useEffect(() => {
        updateNews();
        const intervalId = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);
        return () => {
            clearInterval(intervalId);
          };
    }, []);

    const fetchMoreData = async () => {

        setPage(page + 1);

        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;

        setLoading(true);
        let data = await fetch(url);

        let parsedData = await data.json();
        console.log(parsedData);
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
        setLoading(false);
    };
    const dateStr = currentDate.toLocaleString('en-IN', dateOptions);

    return (


        <>
            <h1 className='text-center' style={{ margin: '35px 0px' }}>
                NewsMonkey - Top Headlines - {props.category.charAt(0).toUpperCase() + props.category.slice(1)}&nbsp;&nbsp;
                <FontAwesomeIcon icon={getCategoryIcon(props.category)} beatFade size='2xl' />

            </h1>

            <div className="text-center">
                <p style={{ fontWeight: 'bold', fontSize: '22px' }}>
                    <i className="fas fa-calendar-alt" style={{ marginRight: '8px', fontSize: '30px' }}></i>
                    {dateStr.replace('IST', '(IST)')}
                </p>
            </div>

            {loading && <Spinner />}

            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                //use < instead of !==
                hasMore={articles.length < totalResults}
                loader={loading && <Spinner />}
            >
                <div className="container">

                    <div className="row">
                        {articles.map((element, index) => {
                            return <div className="col-md-4" key={index}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>


            {loading === false && articles.length >= totalResults && (
                <div className="text-center">
                    <Button variant="primary" onClick={scrollToTop}>
                        Back To Top &nbsp;<FontAwesomeIcon icon={faCircleUp} beat size="xl" />
                    </Button>
                </div>
            )}
        </>
    )
}

News.defaultProps = {
    country: 'in',
    pageSize: 9,
    category: 'general',
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News