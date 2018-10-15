import React from 'react';

export default class Info extends React.Component {
    render() {
        return (
            <div>
               This is for dynamic Router function.
               The value for this router is {this.props.match.params.mainId}
            </div>
        );
    }
}