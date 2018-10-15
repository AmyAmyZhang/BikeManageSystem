import React from 'react';
import { Card, Form, Button, Input, Checkbox, Radio,
         Select, Switch, DatePicker, TimePicker, Upload, Icon, message , InputNumber} 
from 'antd';
import moment from 'moment';

const FormItem = Form.Item; 
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TextArea = Input.TextArea;

class FormRegister extends React.Component {

    state = {
        
    }

    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
      }

    handleChange = (info) => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          this.getBase64(info.file.originFileObj, imageUrl => this.setState({
            userImg: imageUrl,
            loading: false,
          }));
        }
      }

      handleSubmit = () => {
          let userInfo = this.props.form.getFieldsValue();
          console.log(JSON.stringify(userInfo));
          message.success(`${userInfo.userName} Congratulations to you.`)
      }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: 24,
                sm: 4
            },
            wrapperCol: {
                xs: 24,
                sm: 12
            }
        }

        const rowObject = {
            minRows:4, maxRows: 6 
        }

        const offsetLayout = {
            wrapperCol: {
                xs: 24,
                sm: {
                    span: 12,
                    offset: 4
                }
            }
        }
        
        return (
            <div>
                <Card title="Register Form">
                    <Form layout="horizontal">
                        <FormItem label="Username" {...formItemLayout} >
                        {
                                getFieldDecorator('userName', {
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Username can\'t be empty'
                                        },  
                                    ]
                                })(
                                    <Input prefix={<Icon type="user"></Icon>} placeholder="Username" />
                                )
                            }
                        </FormItem>
                        <FormItem label="Password" {...formItemLayout}>
                        {
                                getFieldDecorator('Password', {
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Password can\'t be empty'
                                        },  
                                    ]
                                })(
                                    <Input type="password" prefix={<Icon type="user"></Icon>} placeholder="Password" />
                                )
                            }
                        </FormItem>
                        <FormItem label="Gender" {...formItemLayout} >
                        {
                                getFieldDecorator('gender', {
                                    initialValue: '',
                    
                                })(
                                   
                                    <RadioGroup>
                                        <Radio value="1">Male</Radio>
                                        <Radio value="2">Female</Radio>
                                    </RadioGroup>
                                )
                            }
                        </FormItem>
                        <FormItem label="Age" {...formItemLayout} >
                        {
                                getFieldDecorator('Age', {
                                    initialValue: 18,
                    
                                })(
                                   <InputNumber></InputNumber>
                                )
                            }
                        </FormItem>
                        <FormItem label="Current Status" {...formItemLayout} >
                        {
                                getFieldDecorator('state', {
                                    initialValue: '2',
                    
                                })(
                                   <Select>
                                       <Option value="1">Bachelor</Option>
                                       <Option value="2">UI developer</Option>
                                       <Option value="3">Master</Option>
                                       <Option value="4">Java Developer</Option>
                                   </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label="Hobby" {...formItemLayout}>
                            {
                                getFieldDecorator('hobby', {
                                    initialValue: ['1','6'],
                    
                                })(
                                   <Select mode="multiple">
                                       <Option value="1">Swimming</Option>
                                       <Option value="2">Playing basketball</Option>
                                       <Option value="3">Climbing mountains</Option>
                                       <Option value="4">Singing</Option>
                                       <Option value="5">Running</Option>
                                       <Option value="6">Listening music</Option>
                                       <Option value="7">Reading</Option>
                                       <Option value="8">Travelling</Option>
                                   </Select>
                                )
                            }

                        </FormItem>
                        <FormItem label="Marital status" {...formItemLayout}>
                            {
                                getFieldDecorator('isMarried', {
                                    valuePropName: 'checked',
                                    initialValue: true
                                })(
                                  <Switch/>
                                )
                            }
                        </FormItem>
                        <FormItem label="Birthday" {...formItemLayout}>
                            {
                                getFieldDecorator('birthday', {
                                    initialValue: moment('2018-08-12 12:00:59')
                                })(
                                  <DatePicker 
                                      showTime
                                      format="YYYY-MM-DD HH:mm:ss"
                                  />
                                )
                            }
                        </FormItem>
                        <FormItem label="Address" {...formItemLayout}>
                            {
                                getFieldDecorator('address', {
                                    initialValue: 'Metuchen 24 Bridge st'
                                })(
                                    <TextArea 
                                        autosize={rowObject}
                                        
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem label="Schedule" {...formItemLayout}>
                            {
                                getFieldDecorator('time', {
                                    initialValue: ''
                                })(
                                    <TimePicker />
                                )
                            }
                        </FormItem>
                        <FormItem label="Address" {...formItemLayout}>
                            {
                                getFieldDecorator('address', {
                                    initialValue: 'Metuchen 24 Bridge st'
                                })(
                                    <TextArea 
                                        autosize={rowObject}
                                        
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem label="Image" {...formItemLayout}>
                            {
                                getFieldDecorator('userImg', {
                                    initialValue: ''
                                })(
                                    <Upload 

                                        listType="picture-card"  
                                        showUploadList={false}
                                        action="//jsonplaceholder.typicode.com/posts/"
                                        onChange={this.handleChange}
                                    >
                                    {this.state.userImg? <img src={this.state.userImg}/> : <Icon type="plus" />}
                                    </Upload>
                                )
                            }
                        </FormItem>
                        <FormItem {...offsetLayout} >
                            {
                                getFieldDecorator('protocol')(
                                    <Checkbox>
                                        I have read the <a href="#" >Hengli protocol</a>.
                                    </Checkbox>
                                )
                            } 
                        </FormItem>
                        <FormItem {...offsetLayout} >
                            <Button type="primary" onClick={this.handleSubmit}>Register</Button>
                        </FormItem>
                        
                    </Form>
                </Card>
            </div>
        )
    }
}

export default Form.create()(FormRegister)

