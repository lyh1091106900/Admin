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
		productID: '',
		name_En: '',
		name_Km: '',
		introduce_En :'',
		introduce_Km : '',
		use_flag : 0 ,
		hot_flag : 0 ,
		picture_En : '',
		picture_Km : '',
		price : '',
		
	}
	onSubmit(e) {
		e.preventDefault();

		this.props.form.validateFields((err, values) => {
			if (err) {
				return;
			}
			values.time = Date.parse(new Date()) / 1000;
			values.use_flag=values.use_flag ? 0 : 1;
			values.hot_flag=values.hot_flag ? 0 : 1;
			values.isCreate=this.props.productID ==''?true:false; 
			console.log('shopItemForm', values);
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
					<FormItem {...formItemLayout} label="商品ID">
						{
							getFieldDecorator('productID', {
								initialValue: this.props.productID,
								rules: [{
									required: true, message: '请输入商品ID',
								}]
							})(<Input placeholder="请输入商品ID" disabled={this.props.productID !=''? true :false }/>)
						}
					</FormItem>
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
					{ this.props.productID != '' ?
					<div>
						<FormItem
							{...formItemLayout}
							label="UploadPicture1"	>
							<Avatar imageUrl={ this.props.picture_En} actionUrl={"//127.0.0.1:7001/api/upload1/" + this.props.productID} />
						</FormItem>
						<FormItem
							{...formItemLayout}
							label="UploadPicture1"	>
							<Avatar imageUrl={ this.props.picture_Km} actionUrl={"//127.0.0.1:7001/api/upload2/" + this.props.productID}/>
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