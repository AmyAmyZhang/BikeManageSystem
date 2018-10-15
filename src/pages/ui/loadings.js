import React from 'react'
import { Card, Button, Spin, Icon,  Alert} from 'antd'
import './ui.less';

export default class Laodings extends React.Component {

    render() {
        const  icon = <Icon type="plus" style={{fontSize: 24}}/>
        const  iconLoading = <Icon type="loading" style={{ fontSize: 24  }}/>

        return (
            <div>
                <Card title="Spin" className="card-wrap">
                    <Spin size="small" />
                    <Spin style={{margin: '0 10px'}}/>
                    <Spin size="large" />
                    <Spin indicator={iconLoading} style={{marginLeft: 10}} spinning={true}/>
                </Card>
                <Card title="Embedded mode" className="card-wrap">
                    <Alert 
                        message="React"
                        description="Welcome to React spin for alert type info"
                        type="info"
                    />
                    <Spin>
                        <Alert 
                            message="React"
                            description="Welcome to React spin for alert type warning "
                            type="warning"
                        />
                    </Spin>
                    <Spin tip="loading...">
                        <Alert 
                            message="React"
                            description="Welcome to React spin for alert type warning "
                            type="warning"
                        />
                    </Spin>
                    <Spin tip="loading..." indicator={iconLoading}>
                        <Alert 
                            message="React"
                            description="Welcome to React spin for alert type warning "
                            type="warning"
                        />
                    </Spin>

                    
                </Card>
            </div>
        )
    }
}