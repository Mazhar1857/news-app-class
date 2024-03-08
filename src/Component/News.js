import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 20,
        category: 'health'

    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    constructor(props) {
        super(props);
        console.log('this is constructor');

        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalArticles: 0
        }
        document.title = `${this.props.category} - NewsMonkey` /*if we are using props inside the constructor of class then we have to pass props as an argument*/
    }


    async componentDidMount() {
        this.fetchMoreData();
    }


    // handleNextClick = async () => {
    //     // if (this.state.page >= Math.ceil((this.state.totalArticles / this.props.pageSize))) {

    //     // } else {
    //     //     this.setState({ loading: true });
    //     //     let newPage = this.state.page + 1;
    //     //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4b30234543c6467c9d8f9d88d796aaa1&page=${newPage}&pageSize=${this.props.pageSize}`;
    //     //     let data = await fetch(url);
    //     //     let parsedData = await data.json();
    //     //     console.log('next');
    //     //     this.setState({
    //     //         page: newPage,
    //     //         articles: parsedData.articles,
    //     //         loading: false
    //     //     });
    //     // }

    //     /*-------------------------------------------------------------------------------------- */
    //     /*The setState function is asynchronous, meaning that the state doesn't get updated immediately after calling setState. Therefore, when you log this.state.page immediately after calling setState, you might not get the updated value. In your handleNextClick and handlePrevClick methods, you are logging the this.state.page immediately after calling setState, and that's why you see unexpected results in the console. */
    //     // console.log(this.state.page)
    //     // let newPage = (this.state.page + 1);
    //     // this.setState({ page: newPage });
    //     // this.updateNews();
    //     // console.log(this.state.page)


    //     /*below is the correct way to write */
    //     this.setState((prevState) => {
    //         let newPage = prevState.page + 1;
    //         return { page: newPage };
    //     }, () => {
    //         console.log(this.state.page); // Logging the updated state
    //         this.updateNews();
    //     });

    // }

    // handlePrevClick = async () => {

    //     // if (this.state.page <= 1) {
    //     //     // Do nothing if the current page is less than or equal to 1
    //     // } else {
    //     //     this.setState({ loading: true });
    //     //     let newPage = this.state.page - 1;
    //     //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4b30234543c6467c9d8f9d88d796aaa1&page=${newPage}&pageSize=${this.props.pageSize}`;
    //     //     let data = await fetch(url);
    //     //     let parsedData = await data.json();
    //     //     console.log('prev');
    //     //     this.setState({
    //     //         page: newPage,
    //     //         articles: parsedData.articles,
    //     //         loading: false
    //     //     });
    //     // }


    //     /*-------------------------------------------------------------------------------------- */
    //     /*The setState function is asynchronous, meaning that the state doesn't get updated immediately after calling setState. Therefore, when you log this.state.page immediately after calling setState, you might not get the updated value. In your handleNextClick and handlePrevClick methods, you are logging the this.state.page immediately after calling setState, and that's why you see unexpected results in the console. */
    //     // console.log(this.state.page)
    //     // let newPage = (this.state.page - 1);
    //     // this.setState({ page: newPage });
    //     // console.log(this.state.page)
    //     // this.updateNews();

    //     /*below is the correct way to write */
    //     this.setState((prevState) => {
    //         let newPage = prevState.page - 1;
    //         return { page: newPage };
    //     }, () => {
    //         console.log(this.state.page); // Logging the updated state
    //         this.updateNews();
    //     });

    // }

    // async updateNews() {
    //     const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4b30234543c6467c9d8f9d88d796aaa1&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    //     this.setState({ loading: true });
    //     let data = await fetch(url);
    //     let parsedData = await data.json();
    //     console.log(parsedData);
    //     this.setState({
    //         articles: parsedData.articles,
    //         totalArticles: parsedData.totalResults,
    //         loading: false,
    //     });

    // }

    fetchMoreData = async () => {
        this.props.setProgress(10);
        this.setState({ page: this.state.page + 1,loading:true })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4b30234543c6467c9d8f9d88d796aaa1&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.props.setProgress(30);
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.props.setProgress(70);
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalArticles: parsedData.totalResults,
            loading:false
        });
        this.props.setProgress(100);

    }

    render() {
        console.log('render');
        return (
            <>
                <h2 className='text-center' style={{ margin: '35px 0px' }} >NewsMonkey - Top Headlines</h2>
                {this.state.loading && <div className='text-center'><div className="spinner-border m-1" role="status">
                    <span className="sr-only"></span>
                </div></div>}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length < this.state.totalArticles}
                    loader={<div className='text-center'><div className="spinner-border m-1" role="status">
                        <span className="sr-only"></span>
                    </div></div>}
                >
                    <div className="container">
                        <div className='row' >
                            {this.state.articles.map((element) => {
                                return <div className='col-md-4' key={element.url}>
                                    <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} publishedAt={element.publishedAt} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        )
    }
}

export default News
