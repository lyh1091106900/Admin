import React, { Component, PropTypes } from 'react';
import { Input, Form, Button, Upload, Icon, message, DatePicker, Switch } from 'antd';
import moment from 'moment';
import Avatar from './uploadImage'
import config from '../../utils/config';
const dateFormat = 'YYYY-MM-DD';
const FormItem = Form.Item;
class TableView extends Component {
	static contextTypes = {
		router: PropTypes.object
	}

	static defaultProps = {
		acID: '',
		headline_En: '',
		headline_Km: '',
		theme_En: '',
		theme_Km: '',
		start_time: 0,
		end_time: 0,
		content_En: '',
		content_Km: '',
		picture_En: '',
		picture_Km:'',
		award:'',
		state_flag:'',
	}
	onSubmit(e) {
		e.preventDefault();

		this.props.form.validateFields((err, values) => {
			if (err) {
				return;
			}
			values.state_flag = values.state_flag ? 0 : 1;
		//	console.log('activityForm', Date.parse(values.start_time._d),values.start_time._d);
			values.start_time = Date.parse(values.start_time._d)
			values.end_time = Date.parse(values.end_time._d)
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
		let time = new Date(this.props.start_time)
		let start_time = (time.getFullYear() + '-' + (parseInt(time.getMonth())+1).toString() + '-' + time.getDate())
		time = new Date(this.props.end_time)
        let end_time = (time.getFullYear() + '-' + (parseInt(time.getMonth())+1).toString() + '-' + time.getDate())
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
									required: true, message: '请输入英文标题',
								}]
							})(<Input placeholder="请输入英文标题" />)
						}
					</FormItem>
					<FormItem {...formItemLayout} label="柬埔寨标题">
						{
							getFieldDecorator('headline_Km', {
								initialValue: this.props.headline_Km,
								rules: [{
									required: true, message: '请输入柬埔寨标题',
								}]
							})(<Input placeholder="请输入柬埔寨标题" />)
						}
					</FormItem>
					<FormItem {...formItemLayout} label="英文主题">
						{
							getFieldDecorator('theme_En', {
								initialValue: this.props.theme_En,
								rules: [{
									required: true, message: '请输入英文主题'
								}]
							})(<Input placeholder="请输入英文主题" />)
						}
					</FormItem>
					<FormItem {...formItemLayout} label="柬埔寨主题">
						{
							getFieldDecorator('theme_Km', {
								initialValue: this.props.theme_Km,
								rules: [{
									required: true, message: '请输入柬埔寨主题'
								}]
							})(<Input placeholder="请输入柬埔寨主题" />)
						}
					</FormItem>
					<FormItem {...formItemLayout} label="开始时间">
						{
							getFieldDecorator('start_time', {
								initialValue: moment(start_time, dateFormat),
								rules: [{
									required: true, message: '请输入开始时间'
								}]
							})(<DatePicker  />)
						}
					</FormItem>
					<FormItem {...formItemLayout} label="结束时间">
						{
							getFieldDecorator('end_time', {
								initialValue: moment(end_time, dateFormat),
								rules: [{
									required: true, message: '请输入结束时间'
								}]
							})(<DatePicker  />)
						}
					</FormItem>
					<FormItem {...formItemLayout} label="英语内容">
						{
							getFieldDecorator('content_En', {
								initialValue: this.props.content_En,
								rules: [{
									required: true, message: '请输入英语内容'
								}]
							})(<Input placeholder="请英语内容" />)
						}
					</FormItem>
					<FormItem {...formItemLayout} label="柬埔寨内容">
						{
							getFieldDecorator('content_Km', {
								initialValue: this.props.content_Km,
								rules: [{
									required: true, message: '请输入柬埔寨内容'
								}]
							})(<Input placeholder="请输入柬埔寨内容" />)
						}
					</FormItem>
					<FormItem {...formItemLayout} label="奖励">
						{
							getFieldDecorator('award', {
								initialValue: this.props.award,
								rules: [{
									required: true, message: '请输入奖励钻石数量'
								}]
							})(<Input placeholder="请输入奖励钻石数量" />)
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
					{this.props.acID != '' ?
						<div>
							<FormItem
								{...formItemLayout}
								label="UploadPictureEn"	>
								<Avatar imageUrl={this.props.picture_En} actionUrl={"//127.0.0.1:7001/api/upload5/" + this.props.acID} />
							</FormItem>
							<FormItem
								{...formItemLayout}
								label="UploadPictureKm"	>
								<Avatar imageUrl={this.props.picture_Km} actionUrl={"//127.0.0.1:7001/api/upload6/" + this.props.acID} />
							</FormItem>
						</div>
						: null
					}

				</Form>
			</div>
		)
	}
};

export default Form.create()(TableView);