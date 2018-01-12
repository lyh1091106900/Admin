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
		exchange_itemID: '',
		name_En: '',
		name_Km: '',
		introduce_En: '',
		introduce_Km: '',
		use_flag: 1,
		hot_flag: 1,
		virtual_flag: 1,
		price: '',
		price_gold: '',

	}
	onSubmit(e) {
		e.preventDefault();

		this.props.form.validateFields((err, values) => {
			if (err) {
				return;
			}
			values.time = Date.parse(new Date()) / 1000;
			values.use_flag = values.use_flag ? 0 : 1;
			values.hot_flag = values.hot_flag ? 0 : 1;
			values.virtual_flag = values.virtual_flag ? 0 : 1;
			values.isCreate = this.props.exchange_itemID == '' ? true : false;
			console.log('exchangeItem', values);
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

		return (
			<div className="content-inner">
				<div style={{ borderBottom: '1px solid #ddd', marginBottom: 20, paddingBottom: 10 }}>
					<Button style={{ marginRight: 10 }} onClick={this.goBack.bind(this)}>返回</Button>
					<Button type="primary" onClick={this.onSubmit.bind(this)}>确认</Button>
				</div>

				<Form>
					
					<FormItem {...formItemLayout} label="英文名称">
						{
							getFieldDecorator('name_En', {
								initialValue: this.props.name_En,
								rules: [{
									required: true, message: '请输入名称',
								}]
							})(<Input placeholder="请输入名称" />)
						}
					</FormItem>
					<FormItem {...formItemLayout} label="柬埔寨文名称">
						{
							getFieldDecorator('name_Km', {
								initialValue: this.props.name_Km,
								rules: [{
									required: true, message: '请输入柬埔寨名称',
								}]
							})(<Input placeholder="请输入柬埔寨名称" />)
						}
					</FormItem>
					<FormItem {...formItemLayout} label="英文介绍">
						{
							getFieldDecorator('introduce_En', {
								initialValue: this.props.introduce_En,
								rules: [{
									required: true, message: '请输入英文介绍'
								}]
							})(<Input placeholder="请输入英文介绍" />)
						}
					</FormItem>
					<FormItem {...formItemLayout} label="柬埔寨文介绍">
						{
							getFieldDecorator('introduce_Km', {
								initialValue: this.props.introduce_Km,
								rules: [{
									required: true, message: '请输入柬埔寨文介绍'
								}]
							})(<Input placeholder="请输入柬埔寨文介绍" />)
						}
					</FormItem>
					<FormItem {...formItemLayout} label="使用标志位">
						{
							getFieldDecorator('use_flag', {
								valuePropName: 'checked',
								initialValue: !!!this.props.use_flag,
							})(<Switch checkedChildren={'开'} unCheckedChildren={'关'} />)
						}
					</FormItem>
					<FormItem {...formItemLayout} label="hot标志位">
						{
							getFieldDecorator('hot_flag', {
								valuePropName: 'checked',
								initialValue: !!!this.props.hot_flag,
							})(<Switch checkedChildren={'开'} unCheckedChildren={'关'} />)
						}
					</FormItem>
					<FormItem {...formItemLayout} label="virtual标志位">
						{
							getFieldDecorator('virtual_flag', {
								valuePropName: 'checked',
								initialValue: !!!this.props.virtual_flag,
							})(<Switch checkedChildren={'开'} unCheckedChildren={'关'} />)
						}
					</FormItem>
					<FormItem {...formItemLayout} label="价格">
						{
							getFieldDecorator('price', {
								initialValue: this.props.price,
								rules: [{
									required: true, message: '请输入价格'
								}]
							})(<Input placeholder="请输入价格" />)
						}
					</FormItem>
					<FormItem {...formItemLayout} label="兑换金币">
						{
							getFieldDecorator('price_gold', {
								initialValue: this.props.price,
								rules: [{
									required: true, message: '请输入兑换金币'
								}]
							})(<Input placeholder="请输入兑换金币" />)
						}
					</FormItem>
					{this.props.exchange_itemID != '' ?
						<div>
							<FormItem
								{...formItemLayout}
								label="UploadPicture1"	>
								<Avatar imageUrl={this.props.picture_En} actionUrl={"//127.0.0.1:7001/api/upload3/" + this.props.exchange_itemID} />
							</FormItem>
							<FormItem
								{...formItemLayout}
								label="UploadPicture2"	>
								<Avatar imageUrl={this.props.picture_Km} actionUrl={"//127.0.0.1:7001/api/upload4/" + this.props.exchange_itemID} />
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