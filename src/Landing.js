import React, { Component } from 'react';
import logo from './logo.svg';

class Landing extends Component {

    constructor() {
        super();
        this.state = {
            topics: []
        };
    }

    componentDidMount() {
        this.setState({
            topics: [
                {
                    id: 1532,
                    title: 'Estreia de Vingadores Ultimato',
                    content: 'Essa quinta dia 25 é a estreia do mais aguardado filme de 2019, porém um dia antes, na quarta, é a pre-estreia, entao vai ter um monte de boboes que vao dar spoiler do filme',
                    publishdate: new Date(),
                    likes: 580000,
                    dislikes: 265623,
                    comments: [
                        {
                            id: 51132,
                            content: 'KKK é memo né, vamo quebrar eles na porrada talkei?',
                            publishdate: new Date(),
                            likes: 25,
                            dislikes: 3513
                        }
                    ]
                }
            ]
        });
    }

    render() {
        return (
            <div className="landing">
                <header className="nullfo-header">
                    <div className="nullfo-header__logo">
                        <img src={logo} alt="logo" />
                    </div>
                    <div className="nullfo-header__search">
                        <input placeholder="Busca insana"/>
                    </div>
                </header>
                <article className="landing__topics">
                    <ul className="topics-list">
                    {
                        this.state.topics.map(topic => (
                            <li key={topic.id} className="nullfo-topic-item">
                                <h4>{topic.title}</h4>
                                <p>{topic.content}</p>
                            </li>
                        ))
                    }
                    </ul>
                </article>
            </div>
        );
    }
}

export default Landing;
