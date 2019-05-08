import React, { Component } from 'react';

export class InputForm extends Component {

    render() {
        return (
            <div className={`input-form ${this.props.style}`}>
                <label htmlFor={this.props.id}>{this.props.name}</label>
                <input
                    type={this.props.type}
                    id={this.props.id}
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    onChange={this.props.onChange} />
            </div>
        );
    }
}

export class ButtonForm extends Component {

    render() {
        return (
            <button
                type={this.props.type || 'submit'}
                className={`button-form ${this.props.category || ''}`}>
                {this.props.name}
            </button>
        );
    }
}

export class DropdownForm extends Component {

    render() {
        return (
            <div>
                <span>TODO</span>
            </div>
        );
    }
}