import React from 'react';
import { Card, Table, Modal, message, Button } from 'antd';
import Axios from './../../axios/index';
import Utils from './../../utils/utils';

export default class BasicTable extends React.Component {
    
    state = {
        dataSource2:[]
    }

    params = {
        page: 1
    }

    componentDidMount() {
        const dataSource = [
            {
                id: '0',
                userName: 'Amy',
                gender: '1',
                status: '1',
                hobby: '1',
                birthday: '2000-01-01',
                address: '24 Bridge St',
                time: '08:00'
            },
            {
                id: '1',
                userName: 'Monica',
                gender: '1',
                status: '1',
                hobby: '1',
                birthday: '2000-01-01',
                address: '24 Bridge St',
                time: '08:00'
            },
            {
                id: '2 ',
                userName: 'Steven',
                gender: '1',
                status: '1',
                hobby: '1',
                birthday: '2000-01-01',
                address: '24 Bridge St',
                time: '08:00'
            }
        ]
        dataSource.map((item,index) => {
            item.key = index;
        });

        this.setState({
            dataSource
        })
        this.request();
        console.log(this.state.dataSource2);
    }

    //To get dynamic data
    request = () => {
        let _this = this;
       Axios.ajax({
           url: '/table/list', 
           data: {
               params: {
                   page: this.params.page
               },
            //    isShowLoading: false
           }
       }).then((res) => {
           if (res.code === 0) {
               res.result.list.map((item, index) => {
                   item.key = index;
               });
               this.setState({
                   dataSource2: res.result.list,
                   selectedRowKeys: [],
                   selectedRows: null,
                   pagination: Utils.pagination(res, (current) => {
                       _this.params.page = current;
                        this.request();
                   })
               })
           }
       })

    }

    onRowClick = (record, index) => {
        let selectKey = [index];
        Modal.info({
            title: 'Info',
            content: `Usename:${record.userName}, Hobby: ${record.hobby}`
        })
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record
        })
    }

    //Multiple Table delete 
    handleDelete = (() => {
        let rows = this.state.selectedRows;
        let ids  = [];
        rows.map((item) => {
            ids.push(item.id)
        })
        Modal.confirm({
            title: 'Delete',
            content: `Are you sure you want to delete these data? ${ids.join(',')}`,
            onOk: () => {
                message.success('Delete successful!');
                this.request()
            }

        }) 
    })

    render() {

        const columns = [
            {
                title:'id', 
                dataIndex: 'id',
            },
            {
                title: 'username',
                dataIndex: 'userName'
            },
            {
                title: 'gender',
                dataIndex: 'gender',
                render(gender) {
                    return gender === 1 ? 'male' : 'female'
                }
            },
            {
                title: 'status',
                dataIndex: 'status',
                render(status) {
                    let config = {
                        '1': 'student',
                        '2':'master',
                        '3': 'ui developer',
                        '4':'java developer',
                        '5': 'bachelor',
                    }
                    return config[status];
                }
            },
            {
                title: 'hobby',
                dataIndex: 'hobby',
                render(hobby) {
                    let config = {
                        1:'Swimming',
                        2:'Reading',
                        3:'Playing basketball',
                        4:'Listening Music',
                        5:'Watching Movies',
                        6: 'Travelling',
                        7: 'Running',
                        8: 'Shopping'
                    }
                    return config[hobby];
                }

            },
            {
                title: 'birthday',
                dataIndex: 'birthday'
            },
            {
                title: 'address',
                dataIndex: 'address'
            },
            {
                title: 'time',
                dataIndex: 'time'
            }
        ]
       
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys
        }

        const rowCheckSelection = {
            type: 'checkbox',
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                // let ids = [];
                // selctedRows.map((item) => {
                //     ids.push(item.id)
                // })
                this.setState({
                    selectedRowKeys,
                    selectedRows
                    //selectedIds
                })
            }
        }
        return (
            <div>
                <Card title="Basic Form">
                    <Table columns={columns}
                        dataSource={this.state.dataSource}
                        bordered
                        pagination = {false}
                    />  
                </Card>
                <Card title="Dynamic Form-Mock" style={{margin: '10px 0px'}}>
                    <Table columns={columns}
                        dataSource={this.state.dataSource2}
                        bordered
                        pagination = {true}
                    />  
                </Card>
                <Card title="Select Form" style={{margin: '10px 0px'}}>
                    <Table columns={columns}
                        dataSource={this.state.dataSource2}
                        bordered
                        onRow = {(record, index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record, index);
                                }
                            }
                        }}
                        pagination = {true}
                        rowSelection = { rowSelection }
                    />  
                </Card>
                <Card title="Multiple Selection Form" style={{margin: '10px 0px'}}>
                    <div style={{marginBottom: 10}}>
                        <Button onClick={this.handleDelete}>Delete</Button>
                    </div>
                    <Table columns={columns}
                        dataSource={this.state.dataSource2}
                        bordered
                        pagination = {true}
                        rowSelection = { rowCheckSelection }
                    />  
                </Card>
                <Card title="Pagination Form-Mock" style={{margin: '10px 0px'}}>
                    <Table columns={columns}
                        dataSource={this.state.dataSource2}
                        bordered
                        pagination = {this.state.pagination}
                    />  
                </Card>
            </div>
        );
    }
}