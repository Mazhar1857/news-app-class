import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl, author, publishedAt } = this.props;
        return (
            <div className='my-3'>
                <div className="card" >
                    <img src={!imageUrl ? 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/breaking-news-channel-thumbnail-vedio-design-template-741cc0f63c645c19d2b9694d19098560_screen.jpg?ts=1675440650' : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-body-secondary">By {author} on {new Date(publishedAt).toGMTString()}</small></p>
                        <a href={newsUrl} target='_blank' rel="noopener noreferrer" className="btn btn-primary btn-sm">Read more</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
