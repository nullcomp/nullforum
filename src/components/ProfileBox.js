import React, { Component } from 'react';
import { InputForm, ButtonForm } from './FormComponents';
import API, { login } from '../helpers/ApiHelper';

export default class ProfileBox extends Component {

    constructor() {
        super();

        this.state = {
            username: '',
            name: '',
            email: '',
            password: '',
            signingup: false,
            isLoggedIn: false,
            messageFeedback: ''
        };

        this.outsideView = this.outsideView.bind(this);
        this.insideView = this.insideView.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.signUp = this.signUp.bind(this);
        this.setUsername = this.setUsername.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.setName = this.setName.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.getSignUpForm = this.getSignUpForm.bind(this);
        this.goSignUp = this.goSignUp.bind(this);
        this.goLogin = this.goLogin.bind(this);
    }

    handleLogin = async (e) => {
        e.preventDefault();

        let data = {
            username: this.state.username,
            password: this.state.password
        };

        const response = await API.post('/user/login', data);
        login(response.data['x-access-token']);
/*
        fetch(`${API.url}user/login`, {
            method: 'POST',
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(data)
        })
            .then(res => {
                if(res.ok) {
                    this.setState({
                        isLoggedIn: true
                    });
                } else {
                    this.setState({
                        messageFeedback: 'Usuário ou senha inválida'
                    });
                }
                this.forceUpdate();
            });*/
    }

    signUp(e) {
        e.preventDefault();

        let data = {
            name: this.state.name,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        };

        fetch(`${API.url}users/signup`, {
            method: 'POST',
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(data)
        })
            .then(()=> {
                this.setState({
                    signingup: false
                });
                this.login(e);
            });
    }

    setUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    setPassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    setName(e) {
        this.setState({
            name: e.target.value
        });
    }

    setEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    goSignUp() {
        this.setState({
            signingup: true
        });
    }

    goLogin() {
        this.setState({
            signingup: false
        });
    }

    getSignUpForm() {
        return (
            <div className="profile-box__wrapper">
                <div className="title">
                    <h4>Hey, come on and join this great community</h4>
                </div>
                <form method="POST" className="form" onSubmit={this.signUp}>
                    <InputForm
                        value={this.state.name}
                        onChange={this.setName}
                        placeholder="Your full name"
                    />
                    <InputForm
                        value={this.state.username}
                        onChange={this.setUsername}
                        placeholder="Your username"
                    />
                    <InputForm
                        value={this.state.email}
                        onChange={this.setEmail}
                        placeholder="Your email"
                    />
                    <InputForm
                        value={this.state.password}
                        onChange={this.setPassword}
                        placeholder="Your password"
                        type="password"
                    />
                    <div className="form-buttons">
                        <ButtonForm
                            name="I have an account"
                            type="button"
                            action={ this.goLogin }
                        />
                        <ButtonForm
                            name="Make me part of this"
                            category="primary"
                        />
                    </div>
                </form>
            </div>
        );
    }

    getLoginForm() {
        return (
            <div className="profile-box__wrapper">
                <div className="title">
                    <h4>Hello there! Come on in :D</h4>
                </div>
                <form method="POST" className="form" onSubmit={this.handleLogin}>
                    <InputForm
                        value={this.state.username}
                        onChange={this.setUsername}
                        placeholder="Your username"
                    />
                    <InputForm
                        value={this.state.password}
                        onChange={this.setPassword}
                        type="password"
                        placeholder="Your password"
                    />
                    <div className="form-buttons">
                        <ButtonForm
                            name="I want to sign up!"
                            type="button"
                            category="primary"
                            action={this.goSignUp}
                        />
                        <ButtonForm
                            name="Let's go"
                        />
                    </div>
                </form>
            </div>
        );
    }

    outsideView() {
        if (this.state.signingup) {
            return this.getSignUpForm();
        } else {
            return this.getLoginForm();
        }
    }

    insideView() {
        return (
            <span>I'm in</span>
        );
    }

    render() {
        return (
            <div className="profile-box">
                <span>{ this.state.messageFeedback }</span>
              {
                this.state.isLoggedIn ? this.insideView() : this.outsideView()
              }
            </div>
        );
    }
}