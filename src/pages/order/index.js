import React from 'react';
import { Card, Button, Table, Form, Select, Modal, message, DatePicker} from 'antd';
import axios from './../../axios';
import Utils from './../../utils/utils';
import BaseForm from '../../components/BaseForm';
import ETable from './../../components/ETable/index';

const FormItem = Form.Item;
const Option = Select.Option;

export default class Order extends React.Component {
    
    state = {
        orderInfo: {},
        orderConfirmVisible: false,
        
    }

    params = {
        page: 1
    }
    formList = [
        {
            type: 'SELECT',
            label: 'City',
            placeholder: 'Total',
            field: 'city',
            initialValue: '1',
            width: 80,
            list: [{id: '0', name: 'Total'}, {id: '1', name: 'Beijing'},
                {id: '2', name: 'Tianjin'},{id: '3', name: 'Shanghai'}],
        },
        {
            type: 'Time Search',
        },
        {
            type: 'SELECT',
            label: 'Status',
            placeholder: 'Total',
            field: 'order_status',
            initialValue: '1',
            width: 80,
            list: [{id: '0', name: 'Total'}, 
                {id: '1', name: 'Pending'},
                {id: '2', name: 'Completed'}],
        }
    ]
    componentDidMount () {
        this.requestList();
    }

    handleFilter = (params) => {
        this.params  = params;
        this.requestList();
    }

    requestList = () => {
        let _this  = this;
        axios.requestList(this, '/order/list', this.params, true);
    }
 
    // Confirm the order
    handleConfirm = () => {
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info ({
                title: 'Info',
                content: 'Please select one piece of info to confirm'
            })
            return;
        }
        axios.ajax({ 
            url: '/order/ebike_info',
            data: {
                params: {
                    orderId: item.id 
                }
            }
        }).then((res) => {
            if (res.code === '0') {
                this.setState({
                    orderInfo: res.result,
                    orderConfirmVisible: true,   
                })
            }
        })     
    }

    //Completed order
    handleFinishOrder = () => {
        let item = this.state.selectedItem;  
        axios.ajax({ 
            url: '/order/finish_order',
            data: {
                params: {
                    orderId: item.id 
                }
            }
        }).then((res) => {
            if (res.code === '0') {
                message.success("Order Completed successfully!");
                this.setState({
                    orderConfirmVisible: false   
                })
                this.requestList();
            }
        })     
    }

    onRowClick = (record, index) => {
        let selectKey = [index];
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record
        })
    }

    openOrderDetail = () => {
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info ({
                title: 'Info',
                content: 'Please select one piece of info to see the detail'
            })
            return;
        }
        window.open(`/#/common/order/detail/${item.id}`, '_blank')
        // window.location.href = `/#/common/order/detail/${item.id}`
    }

    render() {
        const columns = [
            {
                title: 'orderNumber',
                dataIndex: 'order_sn'
            },
            {
                title: 'bikeNumber',
                dataIndex: 'bike_sn'
            },
            {
                title: 'userName',
                dataIndex: 'user_name'
            },
            {
                title: 'phoneNumber',
                dataIndex: 'mobile'
            },
            {
                title: 'miles',
                dataIndex: 'distance',
                render(distance) {
                    return distance/1600 + 'mi'
                }
            },
            {
                title: 'totalTime',
                dataIndex: 'total_time'
            },
            {
                title: 'status',
                dataIndex: 'status'
            },
            {
                title: 'startTime',
                dataIndex: 'start_time'
            },
            {
                title: 'endTime',
                dataIndex: 'end_time'
            },
            { 
                title: 'totalPrice',
                dataIndex: 'total_fee'
            },
            {
                title: 'actualPrice',
                dataIndex: 'user_pay'
            },
        ]
        const formItemLayout = {
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 18
            }
        }
        
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys
        }
        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter}/>
                </Card>
                <Card style={{marginop: 10}}>
                    <Button type="primary" onClick={this.openOrderDetail}>Order detail</Button>
                    <Button type="primary" style={{marginLeft: 10}} onClick={this.handleConfirm}>Cancel order</Button>
                </Card>
                <div className="content-wrap">
                    <ETable  
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        columns = {columns}
                        dataSource = {this.state.list}
                        selectedRowKeys = {this.state.selectedRowKeys}
                        pagination = {this.state.pagination}
                       
                    />
                    {/* <Table 
                        bordered
                        columns = {columns}
                        dataSource = {this.state.list}
                        pagination = {this.state.pagination}
                        rowSelection = {rowSelection}
                        onRow = {(record, index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record, index);
                                }
                            };
                        }}
                    >
                    </Table> */}
                    <Modal 
                        title="Order Completed"
                        visible={this.state.orderConfirmVisible}
                        onCancel={() => {
                            this.setState({
                                orderConfirmVisible: false
                            })
                        }}
                        onOk = {this.handleFinishOrder}
                        width={600}
                    >
                        <Form layput="horizontal">
                            <FormItem label="Bike Number" {...formItemLayout}>
                                {this.state.orderInfo.bike_sn}
                            </FormItem>
                            <FormItem label="Current Battery" {...formItemLayout}>
                                {this.state.orderInfo.battery + '%'}
                            </FormItem>
                            <FormItem label="Start Time" {...formItemLayout}>
                                {this.state.orderInfo.start_time}
                            </FormItem>
                            <FormItem label="Current Location" {...formItemLayout}>
                                {this.state.orderInfo.location}
                            </FormItem>
                        </Form>

                    </Modal>

                </div>
            </div>
        )
    }
}
