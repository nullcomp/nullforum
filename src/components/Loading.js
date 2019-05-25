import React, { Component } from 'react';
import loading from '../loading.png';

export default class Loading extends Component {

    constructor() {
        super();
        this.getClassName = this.getClassName.bind(this);
    }

    getClassName() {
        let name = 'loading ';
        if(this.props.condition) {
            name += 'show';
        }
        return name;
    }

    render() {
        return (
            <img src={loading} className={this.getClassName()} />
        );
    }
}