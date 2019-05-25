import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
                    onChange={this.props.onChange} 
                    disabled={this.props.disabled} />
            </div>
        );
    }
}

export class ButtonForm extends Component {

    render() {
        return (
            <button
                type={this.props.type || 'submit'}
                className={`button-form ${this.props.category || ''}`}
                onClick={this.props.action}
                disabled={this.props.disabled}>
                {this.props.name}
            </button>
        );
    }
}

export class RedirectButtonForm extends Component {

    render() {
        return (
            <Link
                className={`button-form ${this.props.category || ''}`}
                to={this.props.linkTo}
                disabled={this.props.disabled}>
                {this.props.name}
            </Link>
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

// TODO: Form generator
export default class FormBox extends Component {
    render() {
        return (
            <form method="POST" onSubmit={this.props.action}>
                {
                    this.props.fields.map(field => (
                        <fieldset>
                            <label>{field.label}</label>
                            <input type="text"/>
                        </fieldset>
                    ))
                }
            </form>
        );
    }
}