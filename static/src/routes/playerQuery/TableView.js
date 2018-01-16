import React, { Component, PropTypes } from 'react';
import { Input, Form, Button, Upload, Icon, message, DatePicker, Switch } from 'antd';
import moment from 'moment';
import Avatar from './uploadImage'
import config from '../../utils/config';

const FormItem = Form.Item;
class TableView extends Component {
	static contextTypes = {
		router: PropTypes.object
	}

	static defaultProps = {
		template: '',
		cont: '',
		template_name: '',
		status: 1,
		time: '',
	}
	onSubmit(e) {
		e.preventDefault();

		this.props.form.validateFields((err, values) => {
			if (err) {
				return;
			}
			values.time = Date.parse(new Date()) / 1000;
			console.log('playerformsubmit', values);
			this.props.onSubmit(values);
		})
	}

	goBack() {
		this.context.router.goBack();
	}
	setImageUrl(value) {

	}

	render() {
		const { getFieldDecorator } = this.props.form;

		const formItemLayout = {
			labelCol: { span: 3 },
			wrapperCol: { span: 12 }
		}
        console.log(this.props)
		return (
			
			<div className="content-inner">
				<div style={{ borderBottom: '1px solid #ddd', marginBottom: 20, paddingBottom: 10 }}>
					<Button style={{ marginRight: 10 }} onClick={this.goBack.bind(this)}>返回</Button>
					<Button type="primary" onClick={this.onSubmit.bind(this)}>确认</Button>
				</div>

				<Form>
					<FormItem {...formItemLayout} label="用户ID">
						{
							getFieldDecorator('userid', {
								initialValue: this.props.userid,
								rules: [{
									required: true, message: '请输入用户ID'
								}]
							})(<Input placeholder="请输入用户ID" disabled={true}/>)
						}
					</FormItem>
					<FormItem {...formItemLayout} label="名称">
						{
							getFieldDecorator('name', {
								initialValue: this.props.name,
								rules: [{
									required: true, message: '请输入名称',
								}]
							})(<Input placeholder="请输入名称" disabled={true} />)
						}
					</FormItem>
					<FormItem {...formItemLayout} label="当前钻石">
						{
							getFieldDecorator('gems', {
								initialValue: this.props.gems,
								rules: [{
									required: true, message: '请输入钻石数量',
								}]
							})(<Input placeholder="请输入钻石数量" disabled={true} />)
						}
					</FormItem>
					<FormItem {...formItemLayout} label="充值金额">
						{
							getFieldDecorator('addGems', {
								initialValue: 0,
								rules: [{
									required: true, message: '请输入充值金额'
								}]
							})(<Input placeholder="请输入充值金额" />)
						}
					</FormItem>
				</Form>
			</div>
		)
	}
};

export default Form.create()(TableView);