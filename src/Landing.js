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
        this.refreshUsersTopics = this.refreshUsersTopics.bind(this); 
    }

    componentDidMount() {
        this.refreshUsersTopics();
    }

    refreshUsersTopics() {
        fetch('http://localhost:3521/api/topics/mytrend')
            .then(res => res.json())
            .then(topics => this.setState({ topics }));
    }

    sendPost(event) {

        event.preventDefault();
        let data = {
            id: 6532,
            title: this.state.title,
            content: this.state.content,
            image: '',
            authorId: 1,
            comments: [],
            likes: 0,
            dislikes: 0,
            publishDate: new Date()
        };

        console.log(data);

        fetch('http://localhost:3521/api/topics/publish', {
            method: 'POST',
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(data)
        });

        this.refreshUsersTopics();
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
