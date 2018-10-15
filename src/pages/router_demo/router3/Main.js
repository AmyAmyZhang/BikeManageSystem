import React from 'react';
import { Link} from 'react-router-dom'; 

export default class Main extends React.Component {
    render() {
        return (
            <div>
                this is Main page.
                <br/>
                <Link to = "/main/test-id">Nested Router 1</Link>
                <br/>
                <Link to = "/main/456">Nested Router 2</Link>
                
                <hr/>
                {this.props.children}
            </div>
        );
    }
}