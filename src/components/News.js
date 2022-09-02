import React, { Component } from 'react'
import NewsItems from './NewsItems'
import PropTypes from 'prop-types';
// import InfiniteScroll from "react-infinite-scroll-components";

export class News extends Component {
   static defaultProps={
       country:"in",
       pageSize:8,
       category:"general"
   }
   static propTypes= {
       country:PropTypes.string,
       pageSize:PropTypes.number,
       category:PropTypes.string

   }
   capitaliseFirstLetter=(string)=>{
       return string.charAt(0).toUpperCase()+string.slice(1)
   }
    constructor(props){
        super(props);
        this.state={
           articles:[],
           loading: false,
           page:1,
           totalResults:0
       }
       document.title=`${this.capitaliseFirstLetter(this.props.category)}-NewsMonkey`;
    }
    async updateNews(){
        const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=659a0231369049de951e8bdbdc7c33c5&page=${this.state.page}&pageSize=${this.props.pageSize}`
        let data= await fetch(url);
        let parseddata=await data.json();
        this.setState({articles:parseddata.articles,totalresults:parseddata.totalResults})
    }
     async componentDidMount(){
       this.updateNews();
    }
    handlePre=async()=>{
       
        this.setState({page:this.state.page-1})
        this.updateNews();
    }
   handleNex=async()=>{
       if(this.state.page+1>Math.ceil(this.state.totalResults/this.state.pageSize)){

       }
       else{
       
        this.setState({page:this.state.page+1})
        this.updateNews();
     } 
    }
    render() {

        return (
            <div className='container my-3' >
                <h1 className="text-center">NewsMonkey-Top {this.capitaliseFirstLetter(this.props.category)} Headlines</h1>
                {/* <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<h4>Loading...</h4>}
         > */}
                <div className="row">
                {this.state.articles.map((element)=>{
                    return  <div className="col-md-4" key={element.url}>
                    <NewsItems  title={element.title?element.title:""} description={element.description?element.description:""} imgUrl= {element.urlToImage?element.urlToImage:"https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/A5IEFCDWEQI6ZITNDQQ4C2Y4SM.jpg&w=1440"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} /> 
                    </div>
                })}  
                </div>
                {/* </InfiniteScroll> */}

                <div className="conatainer d-flex justify-content-between">
                <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePre}>&larr;Previous</button>
                <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/20)} type="button" className="btn btn-dark" onClick={this.handleNex}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News;
