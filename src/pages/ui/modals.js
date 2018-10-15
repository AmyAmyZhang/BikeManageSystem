import React from 'react'
import { Card, Button, Modal } from 'antd'
import './ui.less'

export default class Modals extends React.Component {

    state = {
        showModal1: false,
        showModal2: false,
        showModal3: false,
        showModal4: false
    }

    handleOpen = (type) => {
        this.setState({ 
            [type]: true
        }) 
    }

    handleConfirm = (type) => {
        Modal[type]({
            title: 'Confirm?',
            content: 'Are you sure you are familiar with React?',
            onOk() {
                console.log('OK')
            },
            onCancel() {
                console.log('Cancel')
            }
        })
    }


    render() {
        return (
            <div>
                <Card title="Basic Modal" className="card-wrap">
                    <Button type="primary" onClick={() => this.handleOpen('showModal1')}>Open Modal</Button>
                    <Button type="primary" onClick={() => this.handleOpen('showModal2')}>Open Modal with customized footer</Button>
                    <Button type="primary" onClick={() => this.handleOpen('showModal3')}>Display a modal dialog at 20px to Top</Button>
                    <Button type="primary" onClick={() => this.handleOpen('showModal4')}>Vertically centered modal dialog</Button>
                </Card>
                <Card title="Message" className="card-wrap">
                    <Button type="primary" onClick={() => this.handleConfirm('confirm')}>Confirm</Button>
                    <Button type="primary" onClick={() => this.handleConfirm('info')}>Info</Button>
                    <Button type="primary" onClick={() => this.handleConfirm('success')}>Success</Button>
                    <Button type="primary" onClick={() => this.handleConfirm('warning')}>Warning</Button>
                </Card>
                <Modal 
                    title="React"
                    visible={this.state.showModal1}
                    okText="confirm"
                    canceltext="cancel"
                    onCancel={() => {
                        this.setState({
                            showModal1: false
                        })
                    }} 
                >
                    <p>Welcome to the modal page</p>
                </Modal>
                <Modal 
                    title="React"
                    visible={this.state.showModal2}
                    okText="confirm"
                    canceltext="cancel"
                    onCancel={() => {
                        this.setState({
                            showModal2: false
                        })
                    }} 
                >
                    <p>Welcome to the modal page to learn open modal with customized footer</p>
                </Modal>
                <Modal 
                    title="React"
                    style={{top: 20}} 
                    visible={this.state.showModal3}
                    okText="confirm"
                    canceltext="cancel"
                    onCancel={() => {
                        this.setState({
                            showModal3: false
                        })
                    }} 
                >
                    <p>Welcome to the modal page to learn Display a modal dialog at 20px to Top</p>
                </Modal>

                <Modal 
                    title="React"
                    wrapClassName="vertical-center-modal"
                    visible={this.state.showModal4}
                    okText="confirm"
                    canceltext="cancel"
                    onCancel={() => {
                        this.setState({
                            showModal4: false
                        })
                    }} 
                >
                    <p>Welcome to the modal page to learn Display a modal dialog at 20px to Top</p>
                </Modal>
            </div>
        )
    }
}