
//  {
//     title: 'CityID',
//     dataIndex:'id'
// },
// {
//     title: 'Name',
//     dataIndex:'name'
// },
// {
//     title: 'Mode',
//     dataIndex:'mode'
// },
// {
//     title: 'Operation',
//     dataIndex:'op_mode'
// },
// {
//     title: 'Franchisee',
//     dataIndex:'franchisee_name'
// },
// {
//     title: 'Manager',
//     dataIndex:'city_admins',
//     render(arr) {
//         return arr.map((item) => {
//             return item.user_name;
//         }).join(',');
//     }
// },
// {
//     title: 'OpenTime',
//     dataIndex:'open_time'
// },
// {
//     title: 'UpdateTime',
//     dataIndex:'update_time'
// },
// {
//     title: 'Operator',
//     dataIndex:'sys_user_name'
// }



//city/index

import JsonP from 'jsonp'
import axios from 'axios';
import { Modal } from 'antd';

export default class Axios {
    static jsonp(options) {
        return new Promise((resolve, reject) => {
            JsonP(options.url, {
                param: 'callback'
            }, function (err, response) {
                // if (response.status) 
                if (response.status === 'success') {
                    resolve(response);
                } else {
                    reject(response.message);
                }
            })
        })
    }

    static ajax(options) {
        let loading;
        if (options.data && options.data.isShowLoading !== false) {
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }
        let baseApi = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api';
        return new Promise((resolve, reject) => {
            axios({
                url: options.url,
                baseURL: baseApi,
                method: 'get',
                timeout: 5000,
                params: (options.data && options.data.params) || ''
            }).then((response) => {
                if (options.data && options.data.isShowLoading !== false) {
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';
                }
                //http protocol
                if (response.status === 200) {
                    let res = response.data;
                    //this code is degined by myself (in the mock database)
                    if (res.code === 0) {
                        resolve(res);
                    } else {
                        Modal.info({
                            title: 'Tips',
                            content: res.msg
                        })
                    }
                } else {
                    reject(response.data);
                }
            })
        });

    }
}


import React from 'react';
import { Card, Button, Table, Form, Select} from 'antd';
import Axios from './../../axios/index';
import Utils from './../../utils/utils';

const FormItem = Form.Item;
const Option = Select.Option;

export default class City extends React.Component {

    state = {
        list:[],
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
        Axios.ajax({
            url: '/open_city',
            data: {
                params: {
                    page: this.params.page
                }
            }
        }).then((res) => {
            if (res.code === 0) {
                let list = res.result.item_list.map((item, index) => {
                    item.key  = index;
                    console.log(item)
                    return item;
                });
                this.setState({
                    list: list,
                    pagination: Utils.pagination(res, (current) => {
                    _this.params.page = current;
                    _this.requestList();
                    })
            })
        }
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
                title: 'Manager',
                dataIndex:'city_admins',
                render(arr) {
                    return arr.map((item) => {
                        return item.user_name;
                    }).join(',');
                }
            },
            {
                title: 'OpenTime',
                dataIndex:'open_time'
            },
            {
                title: 'UpdateTime',
                dataIndex:'update_time'
            },
            {
                title: 'Operator',
                dataIndex:'sys_user_name'
            }
        ]
        return (
            <div>
                <Card>
                    <FilterForm/>
                </Card>
                <Card style={{marginTop: '10px'}}>
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