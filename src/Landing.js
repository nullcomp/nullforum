import React, { Component } from 'react';
import API, { isAuthenticated } from './helpers/ApiHelper';
import Navbar from './components/Navbar';
import Topic, { WritingTopicBox } from './components/Topic';
import ProfileBox from './components/ProfileBox';
import PubSub from 'pubsub-js';

class Landing extends Component {

    constructor() {
        super();
        this.state = {
            topics: [],
            postable: isAuthenticated()
        }
        this.refreshUsersTopics = this.refreshUsersTopics.bind(this); 
        this.getPostingForm = this.getPostingForm.bind(this); 
    }

    componentDidMount() {
        this.refreshUsersTopics();

        PubSub.subscribe('user-session-changed', (topic,status) => {
            this.setState({
                postable: status.logged
            });
        });

        PubSub.subscribe('new-topic-posted', (topic, content) => {
            this.refreshUsersTopics();
        });
    }

    refreshUsersTopics() {
        API
            .get('/topics/feed')
            .then(res => this.setState({ topics: res.data }));
    }

    getPostingForm() {
        if (this.state.postable)
            return (<WritingTopicBox />)
    }

    render() {
        return (
            <div className="landing">
                <Navbar />
                <div className="landing__content">
                    <aside>
                        <ProfileBox />
                    </aside>
                    <article className="landing__topics">
                        { this.getPostingForm() }
                        <ul className="topics-list">
                        {
                            this.state.topics.map(topic => (
                                <Topic element="li" content={topic} key={topic.id} />
                            ))
                        }
                        </ul>
                    </article>
                </div>
            </div>
        );
    }
}

export default Landing;
