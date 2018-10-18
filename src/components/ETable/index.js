import React from 'react';
import Utils from './../../utils/utils';
import { Table } from 'antd';

export default class ETable extends React.Component {

    tableInit = () => {
        let row_selection = this.props.rowSelection;
        let selectedRowKeys = this.props.selectedRowKeys; 
        const rowSelection = {
            type: 'radio',
            selectedRowKeys,
            onChange: this.onSelectChange
        }
        if (row_selection === false || row_selection === null) {
            row_selection = false;
        } else if (row_selection === 'checkbox') {
            rowSelection.type = 'checkbox';
        } else {
            row_selection = 'radio';
        }
        return (
            <Table 
                bordered
                {...this.props}
                rowSelection = {rowSelection ? rowSelection: null}
            >  
            </Table>
        )
            
    }

    render() {
        return (
            <div>
                {this.tableInit()}
            </div>
        )
    }
}