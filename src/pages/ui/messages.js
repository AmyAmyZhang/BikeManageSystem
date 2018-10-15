import React from 'react'
import { Card, Button, Message } from 'antd'
import './ui.less'

export default class Messages extends React.Component {

    showMessage = (type) => {
        Message[type]("Congratulations to you for your achivement in React")
    }
    
    render() {
        return (
            <div>
                <Card title="Message Notice" className="card-wrap">
                   <Button type="primary" onClick = {() => this.showMessage('success')}>Success</Button>
                   <Button type="primary" onClick = {() => this.showMessage('info')}>Info</Button>
                   <Button type="primary" onClick = {() => this.showMessage('error')}>Error</Button>
                   <Button type="primary" onClick = {() => this.showMessage('warning')}>Warning</Button>
                   <Button type="primary" onClick = {() => this.showMessage('loading')}>Loading</Button>
                
                </Card>
                
            </div>
        )
    }
}