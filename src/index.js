import React from 'react';
import ReactDOM from 'react-dom';
import './css/styles.scss';
import Landing from './Landing';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
    (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />  
            </Switch>
        </BrowserRouter>
    ), 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
