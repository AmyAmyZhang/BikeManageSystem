import React from 'react';
import { Card, Table, Modal, message, Button, Badge} from 'antd';
import Axios from './../../axios/index';
import Utils from './../../utils/utils';

export default class AdvanceTable extends React.Component {
    
    state = {

    }
    
    params = {
        page: 1
    }

    componentDidMount() { 
        this.request();   
    }
    //To get dynamic data 
    request = () => { 
       Axios.ajax({
           url: '/table/high/list', 
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
                   dataSource: res.result.list,
                   })
               }
           }) 
    }

    handleChange = (pagination, filters, sorter) => {
        console.log(1);
        console.log("::" + sorter)
        this.setState({
            sortOrder: sorter.order
        }) 
    }

    handleDelete = (item) => {
        let id = item.id;
        Modal.confirm({
            title: 'Confirm',
            content:  'Are you sure you want to delete this data',
            onOk: () => {
                message.success('Delete successfully!');
                this.request();
            }
        })
    }
    
    render() {

        const columns = [
            {
                title:'id', 
                dataIndex: 'id',
                key: 'id',
                width: 80 
            },
            {
                title: 'userName',
                dataIndex: 'userName',
                key: 'userName',
                width: 100
            },
            {
                title: 'gender',
                dataIndex: 'gender',
                key: 'gender',
                width: 80,
                render(gender) {
                    return gender === 1 ? 'male' : 'female'
                }
            },
            {
                title: 'status',
                dataIndex: 'status',
                key: 'status',
                width: 80,
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
                key: 'hobby',
                width: 120,
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
                dataIndex: 'birthday',
                key: 'hobby',
                width: 120,
            },
            {
                title: 'address',
                dataIndex: 'address',
                key: 'address',
                width: 120,
            },
            {
                title: 'time',
                dataIndex: 'time',
                key: 'time',
                width: 80,
            }
        ]
       
        const columns2 = [
            {
                title:'id', 
                dataIndex: 'id',
                key: 'id',
                fixed: 'left',
                width: 80 
            },
            {
                title: 'userName',
                dataIndex: 'userName',
                key: 'userName',
                fixed: 'left',
                width: 100
            },
            
            {
                title: 'gender',
                dataIndex: 'gender',
                key: 'gender',
                width: 80,
                render(gender) {
                    return gender === 1 ? 'male' : 'female'
                }
            },
            {
                title: 'status',
                dataIndex: 'status',
                key: 'status',
                width: 80,
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
                key: 'hobby',
                width: 120,
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
                dataIndex: 'birthday',
                key: 'hobby',
                width: 120,
            },
            {
                title: 'address',
                dataIndex: 'address',
                key: 'address',
                width: 120,
            },
            {
                title: 'address',
                dataIndex: 'address',
                key: 'address',
                width: 120,
            },
            {
                title: 'address',
                dataIndex: 'address',
                key: 'address',
                width: 120,
            },
            {
                title: 'birthday',
                dataIndex: 'birthday',
                key: 'hobby',
                width: 120,
            },
            {
                title: 'birthday',
                dataIndex: 'birthday',
                key: 'hobby',
                width: 120,
            },
            {
                title: 'birthday',
                dataIndex: 'birthday',
                key: 'hobby',
                width: 120,
            },
            {
                title: 'birthday',
                dataIndex: 'birthday',
                key: 'hobby',
                width: 120,
            },
            {
                title: 'time',
                dataIndex: 'time',
                key: 'time',
                width: 80,
                fixed: 'right'
            }
        ]

        const columns3 = [
            {
                title:'id', 
                dataIndex: 'id',
                key: 'id', 
            },
            { 
                title: 'userName',
                dataIndex: 'userName',
                key: 'userName',  
            },
            {
                title: 'age',
                key: 'age',
                dataIndex: 'age',
                sorter: (a, b) => {
                    return a.age - b.age;
                },
                sortOrder: this.state.sortOrder
            },
            {
                title: 'gender',
                dataIndex: 'gender',
                key: 'gender',
                render(gender) {
                    return gender === 1 ? 'male' : 'female'
                }
            },
            {
                title: 'status',
                dataIndex: 'status',
                key: 'status',
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
                key: 'hobby',
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
                title: 'address',
                dataIndex: 'address',
                key: 'address',     
            },
            {
                title: 'birthday',
                dataIndex: 'birthday',
                key: 'birthday',
               
            },
            {
                title: 'time',
                dataIndex: 'time',
                key: 'time',
            }
        ]
       
        const columns4 = [
            {
                title:'id', 
                dataIndex: 'id',
                key: 'id',
                width: 80 
            },
            {
                title: 'userName',
                dataIndex: 'userName',
                key: 'userName',
                width: 100
            },
            {
                title: 'gender',
                dataIndex: 'gender',
                key: 'gender',
                width: 80,
                render(gender) {
                    return gender === 1 ? 'male' : 'female'
                }
            },
            {
                title: 'status',
                dataIndex: 'status',
                key: 'status',
                width: 80,
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
                key: 'hobby',
                 
                render(hobby) {
                    let config = {
                        1:<Badge status="success" text="Success"/>,
                        2:<Badge status="error" text="Error"/>,
                        3:<Badge status="default" text="Default"/>,
                        4:<Badge status="processing" text="Processing"/>,
                        5:<Badge status="warning" text="Warning"/>,
                       
                    }
                    return config[hobby];
                }

            },
            {
                title: 'birthday',
                dataIndex: 'birthday',
                key: 'hobby',
               
            },
            {
                title: 'address',
                dataIndex: 'address',
                key: 'address',
               
            },
            {
                title: 'delete',
                render: (text, item) => {
                    return <Button size="small" onClick={(item) => this.handleDelete(item)}>Delete</Button>
                }
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
                <Card title="Head Fixed">
                    <Table columns={columns}
                        dataSource={this.state.dataSource}
                        bordered
                        pagination = {false}
                        scroll={{y: 240}}
                    />   
                </Card>
                <Card title="Left Columns Fixed" style={{margin: '10px 0px'}}>
                    <Table columns={columns2}
                        dataSource={this.state.dataSource}
                        bordered
                        pagination = {true}
                        scroll = {{x: 1510}}
                    />  
                </Card>
                <Card title="Table Sort">
                    <Table columns={columns3}
                        dataSource={this.state.dataSource}
                        bordered
                        pagination = {false}
                        onChange={this.handleChange}
                    />   
                </Card>

                <Card title="Table Badge">
                    <Table columns={columns4}
                        dataSource={this.state.dataSource}
                        bordered
                        pagination = {false}
                        
                    />   
                </Card>
                
            </div>
        );
    }
}