import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Topic from './components/Topic';

class Landing extends Component {

    constructor() {
        super();
        this.state = {
            title: '',
            content: '',
            topics: []
        };
        this.sendPost = this.sendPost.bind(this);
        this.setTitle = this.setTitle.bind(this);
        this.setContent = this.setContent.bind(this); 
    }

    componentDidMount() {
        this.setState({
            // Fez o AJAX e o resultado vira isso
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

    sendPost(event) {
        event.preventDefault();
        let data = {
            id: 6532,
            title: this.state.title,
            content: this.state.content
        };

        console.log(data);

        //Atualizando DOM
        fetch('http://localhost:3521/api/publish', {
            method: 'POST',
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(data)
        })
            .then(res => {
                console.log(res);
            });

        this.setState({
            topics: this.state.topics.concat(data)
        });
    }

    setTitle(event) {
        this.setState({
            title: event.target.value
        });
    }

    setContent(event) {
        this.setState({
            content: event.target.value
        });
    }

    render() {
        return (
            <div className="landing">
                <Navbar />
                <div>
                    <form method="POST" onSubmit={this.sendPost}>
                        <input type="text" value={this.state.title} onChange={this.setTitle} />
                        <input type="text" value={this.state.content} onChange={this.setContent} />
                        <input type="submit" value="Enviar" />
                    </form>
                </div>
                <article className="landing__topics">
                    <ul className="topics-list">
                    {
                        this.state.topics.map(topic => (
                            <Topic element="li" content={topic} key={topic.id} />
                        ))
                    }
                    </ul>
                </article>
            </div>
        );
    }
}

export default Landing;
