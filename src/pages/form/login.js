import React from 'react';
import { Card, Form, Input, Button, message, Icon, Checkbox } from 'antd';

const  FormItem = Form.Item;

class FormLogin extends React.Component {
 
    handleSubmit = () => {
        let userinfo = this.props.form.getFieldsValue();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                message.success(`${userinfo.userName} Congratulations, you are logged in`);
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Card title="Horizontal Login Form">
                    <Form layout="inline">
                        <FormItem>
                            <Input placeholder="Username"/>
                        </FormItem>
                        <FormItem>
                            <Input placeholder="Password" />
                        </FormItem>
                        <FormItem>
                            <Button type="primary">Login</Button>
                        </FormItem>
                    </Form>
                </Card>

                <Card title="Login Form" style={{marginTop: 10 }}>
                    <Form style={{width: 300}}>
                        <FormItem>
                            {
                                getFieldDecorator('userName', {
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Username can\'t be empty'
                                        },
                                        {
                                            min: 5,
                                            max: 12,
                                            message: ' The length should be 5 - 12'
                                        },
                                        {
                                            pattern: new RegExp('^\\w+$', 'g'),
                                            message: 'Usename must be letters or numbers'  
                                        }
                                        
                                    ]
                                })(
                                    <Input prefix={<Icon type="user"></Icon>} placeholder="Username" />
                                )
                            }
                            
                        </FormItem>
                        <FormItem>
                        {
                                getFieldDecorator('userPwd', {
                                    initialValue: '',
                                    rules: []
                                })(
                                    <Input prefix={<Icon type="lock"></Icon>} placeholder="Password" />
                                )
                            }
                            
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('remember', {
                                    valuePropName: 'checked' ,
                                    initialValue: true,  
                                })(
                                    <Checkbox>Remember password</Checkbox>
                                )
                            }  
                            <a href="#" style={{float: 'right'}}>Forgot password</a>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" onClick={this.handleSubmit}>Login</Button>
                        </FormItem>
                    </Form>
                </Card>

            </div>
        )
    }
}

export default Form.create()(FormLogin);
