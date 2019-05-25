import React, { Component } from 'react';
import { InputForm, ButtonForm } from './FormComponents';
import API, { login, isAuthenticated, logout } from '../helpers/ApiHelper';
import PubSub from 'pubsub-js';

export default class ProfileBox extends Component {

    constructor() {
        super();

        this.state = {
            username: '',
            name: '',
            email: '',
            password: '',
            signingup: false,
            messageFeedback: '',
            isLoggedIn: isAuthenticated(),
            loggedUserInfo: {}
        };

        API.get('/loggeduserinfo')
            .then(res => {
                this.setState({
                    loggedUserInfo: res.data.user
                });
            });

        this.outsideView = this.outsideView.bind(this);
        this.insideView = this.insideView.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.handleSingout = this.handleSingout.bind(this);
        this.setUsername = this.setUsername.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.setName = this.setName.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.getSignUpForm = this.getSignUpForm.bind(this);
        this.goSignUp = this.goSignUp.bind(this);
        this.goLogin = this.goLogin.bind(this);
        this.cleanUpFields = this.cleanUpFields.bind(this);
    }

    handleSingout() {
        logout();
        PubSub.publish('user-session-changed', { logged: false });
        this.setState({
            isLoggedIn: isAuthenticated()
        });
    }

    handleLogin = async (e) => {
        e.preventDefault();

        let data = {
            username: this.state.username,
            password: this.state.password
        };

        const response = await API.post('/user/login', data);
        login(response.data['x-access-token']);
        PubSub.publish('user-session-changed', { logged: true });
        this.cleanUpFields();
        this.setState({
            isLoggedIn: isAuthenticated()
        });
    }

    handleSignUp(e) {
        e.preventDefault();

        let data = {
            name: this.state.name,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        };

        API.post('/users/signup', data)
            .then(()=> {
                this.handleLogin(e);
            });
    }

    cleanUpFields() {
        this.setState({
            username: '',
            name: '',
            email: '',
            password: '',
            signingup: false,
            messageFeedback: ''
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
                <form method="POST" className="form" onSubmit={this.handleSignUp}>
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
            <div className="profile-box-logged">
                <div className="profile-box-logged__basic-info">
                    <div className="profile-pic">
                        <img src="https://picsum.photos/100" />
                    </div>
                    <div className="profile-username">
                        <h3>{ this.state.loggedUserInfo.username }</h3>
                    </div>
                    <div className="profile-info">
                        <ul>
                            <li>{this.state.loggedUserInfo.email}</li>
                            <li>{this.state.loggedUserInfo.name}</li>
                        </ul>
                    </div>
                </div>
                <div className="profile-box-logged__actions">
                    <ButtonForm
                        name="Logout"
                        action={this.handleSingout}
                    />
                </div>
            </div>
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