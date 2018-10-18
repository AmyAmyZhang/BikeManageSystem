import React from 'react';

import { Input, Select, Form, Button, Checkbox, Radio, DatePicker } from 'antd';
import Utils from './../../utils/utils';

const FormItem = Form.Item;
const Option = Select.Option;

class FilterForm extends React.Component {

    handleFilterSubmit = () => {
        let fieldsValue = this.props.form.getFieldsValue();
        this.props.filterSubmit(fieldsValue);
    }

    reset = () => {
        this.props.form.resetFields();
    }

    initFormList = () => {
        const { getFieldDecorator } = this.props.form;
        const formList = this.props.formList;
        const formItemList = [];
        if (formList && formList.length > 0) {
            formList.forEach((item, i) => {
                let label = item.label;
                let field = item.field;
                let initialValue = item.initialValue || '';
                let placeholder = item.placeholder;
                let width = item.width;
                if(item.type === 'Time Search') {
                    const begin_time = <FormItem label="OrderDate" key={field} width='100'>
                        {
                            getFieldDecorator('begin_time', {
                                initialValue: initialValue
                            })(
                                <DatePicker showTime={true} placeholder={placeholder} format="YY-MM-DD HH:mm:ss"/>
                            )
                        }
                        </FormItem>
                    const end_time = <FormItem label="~" colon={false} key={field}>
                    {
                        getFieldDecorator('end_time', {
                            initialValue: initialValue
                        })(
                            <DatePicker showTime={true} placeholder={placeholder} format="YY-MM-DD HH:mm:ss"/>
                        ) 
                    }
                    </FormItem>
                    formItemList.push(begin_time);
                    formItemList.push(end_time);
                } else if (item.type === 'INPUT') {
                    const INPUT = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator([field], {
                                initialValue: initialValue
                            })(
                                <Input type="text" placeholder={placeholder} />
                            )
                        }
                    </FormItem>
                    formItemList.push(INPUT);
                } else if (item.type === 'SELECT') {
                    const SELECT  = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator([field], {
                                initialValue: initialValue
                            })(
                                <Select style={{width: width}}
                                    placeholder={placeholder}>
                                    {Utils.getOptionList(item.list)}
                                </Select>
                            )
                        }
                    </FormItem>
                    formItemList.push(SELECT);
                } else if (item.type === 'CHECKBOX') {
                    const CHECKBOX = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator([field], {
                                valuePropName: 'checked',
                                initialValue: initialValue // true or false
                            })(
                                <Checkbox>
                                    {label}
                                </Checkbox>
                            )
                        }
                    </FormItem>
                    formItemList.push(CHECKBOX);
                }
            })
        }
        return formItemList;

    }

    handleFilterSubmit = () => {
        let fieldsValue = this.props.form.getFieldsValue();
        this.props.filterSubmit(fieldsValue);

    }
    render() {
        return (
            <Form layout="inline">
                { this.initFormList() }
                <FormItem >
                    <Button type="primary" style={{margin:'0 20px'}} onClick={this.handleFilterSubmit}>Search</Button>
                    <Button onClick={this.reset}>Reset</Button>
                </FormItem>
            </Form>
        );
    }
}

export default FilterForm = Form.create({})(FilterForm);