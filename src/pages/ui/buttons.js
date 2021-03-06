import React from 'react'; 
import {Card, Button, Radio} from 'antd';
import './ui.less';

export default class Buttons extends React.Component {
    

    state = {
        loading: true,
        size: 'default'
    };

    handleCloseLoading = () => {
        this.setState({
            loading: false,
        })
    }

    handleChange = (e) => {
        this.setState({
            size: e.target.value
        })
    }
     
    render() {
        return (
            <div>
                <Card title="Basic Button" className="card-wrap">
                    <Button type="primary">Hengli</Button>
                    <Button>Hengli</Button>
                    <Button type="dashed">Hengli</Button>
                    <Button type="danger">Hengli</Button>
                    <Button disabled>Hengli</Button>
                </Card>
                <Card title="Icon Button" className="card-wrap">
                    <Button icon="plus">Create</Button>
                    <Button icon="edit">Edit</Button>
                    <Button icon="delete">Delete</Button>
                    <Button shape="circle" icon="search"></Button>
                    <Button type="primary" icon="search">Search</Button>
                    <Button type="primary" icon="download">download</Button>
                </Card>
                <Card title="Loading Button" className="card-wrap">
                    <Button type="primary" loading={this.state.loading}>Confirm</Button>
                    <Button type="primary" shape="circle" loading={this.state.loading}></Button>
                    <Button loading={this.state.loading}>Click to load</Button>
                    <Button shape="circle" loading={this.state.loading}></Button>
                    <Button type="primary" onClick={this.handleCloseLoading}>Close</Button> 
                </Card>
                <Card title="Button Group" style={{marginBottom: 10}}>
                    <Button.Group>
                        <Button type="primary" icon="left">Go back</Button>
                        <Button type="primary" icon="right">Go forward</Button>
                    </Button.Group>
                </Card>
                <Card title="Button Size" className="card-wrap">
                    <Radio.Group value={this.state.size} onChange={this.handleChange}>
                        <Radio value="small">Small</Radio>
                        <Radio value="default">Middle</Radio>
                        <Radio value="large">Large</Radio>
                    </Radio.Group>
                    <Button type="primary" size={this.state.size}>Hengli</Button>
                    <Button size={this.state.size}>Hengli</Button>
                    <Button type="dashed" size={this.state.size}>Hengli</Button>
                    <Button type="danger" size={this.state.size}>Hengli</Button>    
                </Card>
            </div>
        ); 
    }
}