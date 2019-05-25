import React, { Component } from 'react';
import API from '../helpers/ApiHelper';
import { InputForm, ButtonForm } from './FormComponents';
import Loading from './Loading';
import PubSub from 'pubsub-js';

export class WritingTopicBox extends Component {
    
    constructor() {
        super();
        this.state = {
            title: '',
            content: '',
            image: '',
            posting: false,
            warningMessage: '',
            toxicityAlerts: []
        };
        this.sendPost = this.sendPost.bind(this);
        this.setTitle = this.setTitle.bind(this);
        this.setContent = this.setContent.bind(this);
        this.setImage = this.setImage.bind(this);
        this.cleanUpFields = this.cleanUpFields.bind(this);
    }

    cleanUpFields() {
        this.setState({
            title: '',
            content: '',
            image: '',
            posting: false,
            warningMessage: '',
            toxicityAlerts: []
        });
    }

    sendPost(event) {

        event.preventDefault();

        if (!this.state.title || !this.state.content || !this.state.image) {
            this.setState({
                warningMessage: 'Please fill all the fields'
            })
            return;
        }

        let data = {
            title: this.state.title,
            content: this.state.content,
            image: this.state.image
        };

        this.setState({
            posting: true
        });

        API.post('/topics/publish', data)
            .then(res => {
                if(res.data !== 'OK') {
                    console.log(res.data);
                    let arr = [
                        {
                            type: 'title',
                            message: res.data.title
                        },
                        {
                            type: 'content',
                            message: res.data.content
                        }
                    ]
                    this.setState({
                        toxicityAlerts: arr,
                        posting: false
                    });
                } else {
                    this.cleanUpFields();
                    PubSub.publish('new-topic-posted');
                }
            });
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
            <div className="new-topic">
                <div className="warning-space">
                    <span>{ this.state.warningMessage }</span>
                </div>
                <div className="toxicity-warning-space">
                    <ul>
                        {
                            this.state.toxicityAlerts.map(alert =>
                                <li key={alert.type}>{alert.message}</li>
                            )
                        }
                    </ul>
                </div>
                <form method="POST" className="new-topic__form" onSubmit={this.sendPost}>
                    <InputForm 
                        type="text"
                        value={this.state.title}
                        onChange={this.setTitle}
                        placeholder="What is the title of your topic?"
                        disabled={this.state.posting}
                        required
                    />
                    <InputForm 
                        type="text" 
                        value={this.state.content} 
                        onChange={this.setContent} 
                        placeholder="Write the content of it"
                        disabled={this.state.posting}
                        required
                    />
                    <InputForm 
                        type="text" 
                        value={this.state.image} 
                        onChange={this.setImage}
                        placeholder="Do you have something to illustrate?"
                        disabled={this.state.posting}
                        required
                    />
                    <div className="event-fieldset">
                        <ButtonForm 
                            type="submit" 
                            name="Create topic"
                            category="primary"
                            disabled={this.state.posting}
                        />
                        <Loading condition={this.state.posting} />
                    </div>
                </form>
            </div>
        );
    }
}

export default class Topic extends Component {

    render() {
        const Tag = this.props.element || 'div';
        return (
            <Tag className="topic">
                <div className="topic__meta">
                    <div className="topic-meta-publisher">
                        <div className="topic-meta-publisher-pic">
                            <img src="https://picsum.photos/65" alt="Rodrigo Maia"/>
                        </div>
                        <div className="topic-meta-publisher-info">
                            <a className="name" href="">{this.props.content.authorUsername}</a>
                            {/*<div className="macro-report">
                                <span>14 posts</span>
                                <div className="dot"></div>
                                <span>15k segui.</span>
                            </div>*/}
                        </div> 
                    </div>
                    <div className="topic-meta-rate">

                    </div>
                </div>
                <div className="topic__content">
                    <div className="topic-content-header">
                        <h4 className="title">{this.props.content.title}</h4>
                        <span className="date">
                        {
                                `${this.props.content.publishDate.day}/${this.props.content.publishDate.month}/${this.props.content.publishDate.year}`
                        }
                        </span>
                    </div>
                    <div className="topic-content-body">
                        <p>{this.props.content.content}</p>
                    </div>
                    <div className="topic-content-top-comment"></div>
                </div>
            </Tag>
        );
    }
}