import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import About from '../router1/About';
import Main from './Main';
import Topic from '../router1/Topic';
import Home from './Home';
import Info from './info';
import NoMatch from './NoMatch';

export default class IRouter extends React.Component {
    
    render() {
        return (
            <Router>
                <Home>
                <Switch>
                    <Route  path="/main" render={() => 
                        <Main>
                            <Route path="/main/:mainId" component={Info} />
                        </Main> 
                    }/>
                    <Route path="/topics" component={Topic} />
                    <Route path="/about" component={About} />
                    <Route component = { NoMatch } />
                </Switch>
                </Home>
            </Router>
        )
    }
}