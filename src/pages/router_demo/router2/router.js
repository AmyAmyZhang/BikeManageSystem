import React from 'react';
import {HashRouter as Router, Route, Link, Switch} from 'react-router-dom';
import About from '../router1/About';
import Main from './Main';
import Topic from '../router1/Topic';
import Home from './Home'

export default class IRouter extends React.Component {
    
    render() {
        return (
            <Router>
                <Home>
                    <Route  path="/main" render={() => 
                        <Main>
                            <Route path="/main/a" component={About} />
                        </Main> 
                    }/>
                    <Route path="/topics" component={Topic} />
                    <Route path="/about" component={About} />
                </Home>
            </Router>
        )
    }
}