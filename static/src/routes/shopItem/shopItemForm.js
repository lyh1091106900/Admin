import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import TableView from './TableView';

import { message } from 'antd';
import { attachmentURL } from '../../utils/config';

const Const = {
	module: 'shopItem'
}

class shopItemForm extends Component {
	static contextTypes = {
		router: PropTypes.object
	}

	constructor(props, context) {
		super(props, context);
	}

	componentDidMount() {
		console.log(this.props.params.productID, this.props.params)
		const id = this.props.params && this.props.params.productID;
		const { dispatch } = this.props;

		if (id) {
			dispatch({ type: 'shopItemForm/load', payload: { productID: id, ...Const } });
		}
	}

	componentWillUnmount() {
		this.props.dispatch({
			type: 'shopItemForm/resetState'
		});
	}

	goBack() {
		this.context.router.goBack();
	}

	onSubmit(values) {
		const hide = message.loading('正在保存...', 0);

		this.props.dispatch({
			type: 'shopItemForm/save',
			payload: {
				...this.props,
				productID: values.productID,
				name_En: values.name_En,
				name_Km: values.name_Km,
				introduce_En: values.introduce_En,
				introduce_Km: values.introduce_Km,
				use_flag : values.use_flag,
				hot_flag : values.hot_flag,
				price : values.price,
				isCreate :values.isCreate,
				...Const,
				callback: (data) => {
					hide();
					if (data && data.success) {
						message.success('保存成功');
						this.goBack();
					} else {
						message.error('保存失败');
					}
				}
			}
		});
	}

	render() {

		const props = this.props;
		console.log('rendershopItemForm', props);
		return (
			<TableView
			    productID={props.productID}
				name_En={props.name_En}
				name_Km={props.name_Km}
				introduce_En={props.introduce_En}
				introduce_Km={props.introduce_Km}
				use_flag={props.use_flag}
				hot_flag={props.hot_flag}
				picture_En={props.picture_En}
				picture_Km={props.picture_Km}
				price={props.price}
				onSubmit={this.onSubmit.bind(this)} />
		)
	}
}

export default connect(({ shopItemForm, app }) => {
	return {
		...shopItemForm,
	}
})(shopItemForm);