import React, { Component } from 'react';

export default class Topic extends Component {
    

    render() {
        const Tag = this.props.element || 'div';
        return (
            <Tag className="nullfo-topic-item">
                <h4>{this.props.content.title}</h4>
                <p>{this.props.content.content}</p>
            </Tag>
        );
    }
}