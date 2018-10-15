import React from 'react';
import { Card, Button, Table, Form, Select} from 'antd';
import axios from './../../axios/index';
import Utils from './../../utils/utils';

const FormItem = Form.Item;
const Option = Select.Option;

export default class City extends React.Component {

    state = {

    }
    params = {
        page: 1
    }
    componentDidMount() {
        this.requestList();
    }
    //Request interface data
    requestList = () => {
        let _this = this; 
        axios.ajax({
            url: '/open_city',
            data: {
                params: {
                    page: this.params.page
                }
            }
        }).then((res) => {
            this.setState({
                list: res.result.item_list.map((item, index) => {
                    item.key  = index;
                    return item;
                }),
                pagination: Utils.pagination(res, (current) => {
                    _this.params.page = current;
                    _this.requestList();
                } )
            })
        })
    }

    //Open city
    handleOpenCity = () => {

    }


    render() {  
        const columns = [
            {
                title: 'CityID',
                dataIndex:'id'
            },
            {
                title: 'Name',
                dataIndex:'name'
            },
            {
                title: 'Mode',
                dataIndex:'mode'
            },
            {
                title: 'Operation',
                dataIndex:'op_mode'
            },
            {
                title: 'Franchisee',
                dataIndex:'franchisee_name'
            },
            {
                title: 'manager',
                dataIndex:'city_admins',
                render(arr) {
                    return arr.map((item) => {
                        return item.user_name;
                    }).join(',');
                }
            },
            {
                title: 'openTime',
                dataIndex:'open_time'
            },
            {
                title: 'updateTime',
                dataIndex:'update_time'
            },
            {
                title: 'operator',
                dataIndex:'sys_user_name'
            },



        ]
        return (
            <div>
                <Card>
                    <FilterForm/>
                </Card>
                <Card>
                    <Button type="primary" onClick={this.handleOpenCity}>City</Button>
                </Card>
                <Table
                    columns = {columns}
                    dataSource={this.state.list}
                    pagination={this.state.pagination}
                    >
                </Table>
  
            </div>
        )
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
                                <Option value="2">New York</Option>
                                <Option value="3">Edison</Option>
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