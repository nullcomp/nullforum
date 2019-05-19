import React, { Component } from 'react';
import API from '../helpers/ApiHelper';

export class WritingTopicBox extends Component {
    
    constructor() {
        super();
        this.state = {
            title: '',
            content: '',
            image: ''
        };
        this.sendPost = this.sendPost.bind(this);
        this.setTitle = this.setTitle.bind(this);
        this.setContent = this.setContent.bind(this);
        this.setImage = this.setImage.bind(this);
    }

    sendPost(event) {

        event.preventDefault();
        let data = {
            title: this.state.title,
            content: this.state.content,
            image: this.state.image
        };

        console.log(data);

        API.post('/topics/publish', data);
    }

    setTitle(event) {
        this.setState({
            title: event.target.value
        });
    }

    setImage(event) {
        this.setState({
            image: event.target.value
        });
    }

    setContent(event) {
        this.setState({
            content: event.target.value
        });
    }

    render() {
        return (
            <form method="POST" onSubmit={this.sendPost}>
                <input type="text" value={this.state.title} onChange={this.setTitle} />
                <input type="text" value={this.state.content} onChange={this.setContent} />
                <input type="text" value={this.state.image} onChange={this.setImage} />
                <input type="submit" value="Enviar" />
            </form>
        );
    }
}

export default class Topic extends Component {

    render() {
        const Tag = this.props.element || 'div';
        return (
            <Tag>
                <div className="topic">
                    <div className="topic__meta">
                        <div className="topic-meta-publisher">
                            <div className="topic-meta-publisher-pic">
                                <img src="https://picsum.photos/65" alt="Rodrigo Maia"/>
                            </div>
                            <div className="topic-meta-publisher-info">
                                <a className="name" href="">Rodrigo Maia</a>
                                <div className="macro-report">
                                    <span>14 posts</span>
                                    <div className="dot"></div>
                                    <span>15k segui.</span>
                                </div>
                            </div> 
                        </div>
                        <div className="topic-meta-rate">

                        </div>
                    </div>
                    <div className="topic__content">
                        <div className="topic-content-header">
                            <h4 className="title">{this.props.content.title}</h4>
                            <span className="date">4 hours ago</span>
                        </div>
                        <div className="topic-content-body">
                            <p>{this.props.content.content}</p>
                        </div>
                        <div className="topic-content-top-comment"></div>
                    </div>
                </div>
            </Tag>
        );
    }
}