import React, { Component } from 'react';

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