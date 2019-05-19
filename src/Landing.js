import React, { Component } from 'react';
import API from './helpers/ApiHelper';
import Navbar from './components/Navbar';
import Topic, { WritingTopicBox } from './components/Topic';
import ProfileBox from './components/ProfileBox';

class Landing extends Component {

    constructor() {
        super();
        this.state = {
            topics: []
        }
        this.refreshUsersTopics = this.refreshUsersTopics.bind(this); 
    }

    componentDidMount() {
        this.refreshUsersTopics();
    }

    refreshUsersTopics() {
        API
            .get('/topics/mytrend')
            .then(res => this.setState({ topics: res.data }));
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
                        <WritingTopicBox />
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
