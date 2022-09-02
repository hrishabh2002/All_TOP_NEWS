import React, { Component } from 'react'

export class NewsItems extends Component {
    render() {
        let {title,description,imgUrl,newsUrl,author,date,source}= this.props;
        return (
      <div className='my-3'>
        <div className="card">
        <img src= {imgUrl} alt="..."/>
             <div className="card-body">
             <h5 className="card-title">{title}<span class="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:'90%',zIndex:'1'}}>
             {source} </span> </h5>

             <p className="card-text">{description}</p>
             <p className="card-text"><small class="text-muted">By {author?author:"Unknown"} at {new Date(date).toGMTString()}</small></p>
             <a  rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
             </div>
       </div>
     </div>
        )
    }
}

export default NewsItems
