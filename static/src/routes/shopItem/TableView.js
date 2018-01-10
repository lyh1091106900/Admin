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
    imageUrl='http://127.0.0.1:7001/public/uploads/1515566462404detail1.jpg';
	onSubmit(e) {
		e.preventDefault();

		this.props.form.validateFields((err, values) => {
			if (err) {
				return;
			}
			values.time = Date.parse(new Date()) / 1000;
			console.log('playerformsubmit', values);
			//this.props.onSubmit(values);
		})
	}

	goBack() {
		this.context.router.goBack();
	}
	setImageUrl(value){
       
	}

	render() {
		const { getFieldDecorator } = this.props.form;

		const formItemLayout = {
			labelCol: { span: 3 },
			wrapperCol: { span: 12 }
		}
		
		return (
			<div className="content-inner">
				<div style={{ borderBottom: '1px solid #ddd', marginBottom: 20, paddingBottom: 10 }}>
					<Button style={{ marginRight: 10 }} onClick={this.goBack.bind(this)}>返回</Button>
					<Button type="primary" onClick={this.onSubmit.bind(this)}>确认</Button>
				</div>

				<Form>
					<FormItem {...formItemLayout} label="名称">
						{
							getFieldDecorator('name', {
								initialValue: this.props.name,
								rules: [{
									required: true, message: '请输入名称',
								}]
							})(<Input placeholder="请输入名称" />)
						}
					</FormItem>
					<FormItem {...formItemLayout} label="链接">
						{
							getFieldDecorator('link', {
								initialValue: this.props.link,
								rules: [{
									required: true, message: '请输入链接'
								}]
							})(<Input placeholder="请输入链接" />)
						}
					</FormItem>
					<FormItem {...formItemLayout} label="排序">
						{
							getFieldDecorator('ord', {
								initialValue: this.props.ord,
								rules: [{
									required: true, message: '请输入序号'
								}]
							})(<Input placeholder="请输入序号" />)
						}
					</FormItem>
					<FormItem {...formItemLayout} label="状态">
						{
							getFieldDecorator('status', {
								valuePropName: 'checked',
								initialValue: !!this.props.status,
							})(<Switch checkedChildren={'开'} unCheckedChildren={'关'} />)
						}
					</FormItem>
					<FormItem {...formItemLayout} label="uid">
						{
							getFieldDecorator('uid', {
								initialValue: this.props.uid,
								rules: [{
									required: true, message: '请输入uid'
								}]
							})(<Input type="textarea" />)
						}
					</FormItem>
					<FormItem
						{...formItemLayout}
						label="UploadPicture1"	>
							<Avatar imageUrl={this.imageUrl}  />
					</FormItem>

				</Form>
			</div>
		)
	}
};

export default Form.create()(TableView);