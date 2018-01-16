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
					<FormItem {...formItemLayout} label="英文标题">
						{
							getFieldDecorator('headline_En', {
								initialValue: this.props.headline_En,
								rules: [{
									required: true, message: '请输入用户ID'
								}]
							})(<Input placeholder="请输入用户ID" />)
						}
					</FormItem>
					<FormItem {...formItemLayout} label="柬埔寨标题">
						{
							getFieldDecorator('headline_Km', {
								initialValue: this.props.headline_Km,
								rules: [{
									required: true, message: '请输入名称',
								}]
							})(<Input placeholder="请输入名称" />)
						}
					</FormItem>
					<FormItem {...formItemLayout} label="状态">
						{
							getFieldDecorator('state_flag', {
								valuePropName: 'checked',
								initialValue: !!!this.props.state_flag,
							})(<Switch checkedChildren={'开'} unCheckedChildren={'关'} />)
						}
					</FormItem>
					<FormItem {...formItemLayout} label="次数">
						{
							getFieldDecorator('frequency', {
								initialValue: this.props.frequency,
								rules: [{
									required: true, message: '请输入次数'
								}]
							})(<Input placeholder="请输入次数" />)
						}
					</FormItem>
					<FormItem {...formItemLayout} label="间隔">
						{
							getFieldDecorator('cycles_time', {
								initialValue: this.props.cycles_time,
								rules: [{
									required: true, message: '请输入间隔'
								}]
							})(<Input placeholder="请输入间隔" />)
						}
					</FormItem>
					<FormItem {...formItemLayout} label="英文内容">
						{
							getFieldDecorator('msg_En', {
								initialValue: this.props.msg_En,
								rules: [{
									required: true, message: '请输入英文内容'
								}]
							})(<Input placeholder="请输入英文内容" />)
						}
					</FormItem>
					<FormItem {...formItemLayout} label="柬埔寨内容">
						{
							getFieldDecorator('msg_Km', {
								initialValue: this.props.msg_Km,
								rules: [{
									required: true, message: '请输入柬埔寨内容'
								}]
							})(<Input placeholder="请输入柬埔寨内容" />)
						}
					</FormItem>
					<FormItem {...formItemLayout} label="开始时间">
						{
							getFieldDecorator('start_time', {
								initialValue: this.props.start_time,
								rules: [{
									required: true, message: '请输入开始时间'
								}]
							})(<Input placeholder="请输入开始时间" />)
						}
					</FormItem>
					<FormItem {...formItemLayout} label="结束时间">
						{
							getFieldDecorator('end_time', {
								initialValue: this.props.end_time,
								rules: [{
									required: true, message: '请输入结束时间'
								}]
							})(<Input placeholder="请输入结束时间" />)
						}
					</FormItem>
				</Form>
			</div>
		)
	}
};

export default Form.create()(TableView);