import React from 'react';
import { Card, Button, Table, Form, Select, Modal, message } from 'antd';
import axios from './../../axios/index';
import Utils from './../../utils/utils';
const FormItem = Form.Item;
const Option = Select.Option;
export default class City extends React.Component{

    state = {
        list:[],
        isShowOpenCicy: false
    }
    params = {
        page:1
    }
    componentDidMount(){
        this.requestList();
    }

    // Interface data
    requestList = ()=>{
        let _this = this;
        axios.ajax({
            url: '/open_city',
            data:{
                params:{
                    page:this.params.page
                }
            }
        }).then((res)=>{
            let list = res.result.item_list.map((item, index) => {
                item.key = index;
                return item;
            });
            this.setState({
                list:list,
                pagination: Utils.pagination(res,(current)=>{
                    _this.params.page = current;
                    _this.requestList();
                })
            })
        })
    }

    // Open city to open a modal 
    handleOpenCity = ()=>{
        this.setState({
            isShowOpenCicy: true
        })
       
    }
    // To submit open city
    handleSubmit = ()=>{
        let cityInfo = this.cityForm.props.form.getFieldsValue();
        console.log(cityInfo);
        axios.ajax({
            url: '/city/open',
            data: {
                params: cityInfo
            }
        }).then((res) => {
            if (res.code === 0) {
                message.success("Open successful!")
                this.setState({
                    isShowOpenCicy: false
                })
            }
        })

    }

    render(){
        const columns = [
            {
                title:'CityId',
                dataIndex:'id'
            }, {
                title: 'City Name',
                dataIndex: 'name'
            }, {
                title: 'Bike Model',
                dataIndex: 'mode',
                render(mode) {
                    return mode === 1 ? 'Parking spot' : 'Forbid area';
                }
               
            }, {
                title: 'Operation',
                dataIndex: 'op_mode',
                render(op_mode) {
                    return op_mode === 1 ? 'self-supporting' : 'Franchisee';
                }
                
            }, {
                title: 'Franchisee',
                dataIndex: 'franchisee_name'
            }, {
                title: 'Manager',
                dataIndex: 'city_admins',
                render(arr){
                    return arr.map((item)=>{
                        return item.user_name;
                    }).join(',');
                }
            }, {
                title: 'Open Time',
                dataIndex: 'open_time'
            }, {
                title: 'Update Time',
                dataIndex: 'update_time',
                render: Utils.formatDate
            }, {
                title: 'Operator',
                dataIndex: 'sys_user_name'
            }
        ]
        return (
            <div>
                <Card>
                    <FilterForm />
                </Card>
                <Card style={{marginTop:10}}>
                    <Button type="primary" onClick={this.handleOpenCity}>Open City</Button>
                </Card>
                <div className="content-wrap">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                    />
                </div>
                <Modal 
                    title="Open City" 
                    visible={this.state.isShowOpenCicy}
                    onCancel = {() => {
                        this.setState({
                            isShowOpenCicy: false 
                        })
                    }}
                    onOk={this.handleSubmit}
                >
                    <OpenCityForm wrappedComponentRef={(inst) => {this.cityForm = inst;}}/>

                </Modal>
                
            </div>
        );
    }
}

class FilterForm extends React.Component {
    
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="inline">
                <FormItem label="City">
                    {
                        getFieldDecorator('city_id') (
                            <Select placeholder="Select City"
                                    style={{width: 100}}>
                                <Option value="1">Metuchen</Option>
                                <Option value="2">Beijing</Option>
                                <Option value="3">Xi'an</Option>
                            </Select>
                        )   
                    }
                </FormItem>
                <FormItem label="Bike Mode">
                    {
                        getFieldDecorator('mode') (
                            <Select placeholder="Select mode"
                                    style={{width: 120}}>
                                <Option value="">Total</Option>
                                <Option value="1">Designated area</Option>
                                <Option value="2">Forbid area</Option>
                            </Select>
                        )   
                    }
                </FormItem>
                <FormItem label="Operation Model">
                    {
                        getFieldDecorator('op_mode') (
                            <Select placeholder="Select mode"
                                    style={{width: 120}}>
                                <Option value="">Total</Option>
                                <Option value="1">Self-supporting mode</Option>
                                <Option value="2">Franchise mode</Option>
                            </Select>
                        )   
                    }
                </FormItem>
                <FormItem label="Franchisee Status">
                    {
                        getFieldDecorator('auth_status') (
                            <Select placeholder="Total"
                                    style={{width: 120}}>
                                <Option value="">Total</Option>
                                <Option value="1">Authorized</Option>
                                <Option value="2">Unauthorized</Option>
                            </Select>
                        )   
                    } 
                </FormItem>
                <FormItem >
                    <Button type="primary" style={{margin:'0 20'}}>Search</Button>
                    <Button>Reset</Button>
                </FormItem>

            </Form>
        );
    }
}

FilterForm = Form.create({})(FilterForm);

class OpenCityForm extends React.Component {


    render() {
        const formItemLayout = {
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 18
            }
        }
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="horizontal"> 
                <FormItem label="Select city" {...formItemLayout}>
                    {
                        getFieldDecorator('city_id', {
                            initialValue: '1'
                        })
                    }
                    <Select style={{width: 100}}>
                        <Option value="">Total</Option>
                        <Option value="1">Beijing</Option>
                        <Option value="2">Xi'an</Option>
                    </Select>
                </FormItem>
                <FormItem label="Operation Model" {...formItemLayout}> 
                    {
                        getFieldDecorator('op_mode', {
                            initialValue: '1'
                        })
                    }
                    <Select style={{width: 100}}>
                        <Option value="1">Self-supporting mode</Option>
                        <Option value="2">Franchise mode</Option>
                        
                    </Select>
                </FormItem>
                <FormItem label="Bike Model" {...formItemLayout}>
                    {
                        getFieldDecorator('mode', {
                            initialValue: '1'
                        })
                    }
                    <Select style={{width: 100}}>
                        <Option value="1">Designated area</Option>
                        <Option value="2">Forbid area</Option> 
                    </Select>
                </FormItem>
            </Form>
        )
    }
}
//two way data binding
OpenCityForm = Form.create({})(OpenCityForm)