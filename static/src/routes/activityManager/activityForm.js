import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import TableView from './TableView';

import { message } from 'antd';
import { attachmentURL } from '../../utils/config';

const Const = {
	module: 'activityManager'
}

class activityForm extends Component {
	static contextTypes = {
		router: PropTypes.object
	}

	constructor(props, context) {
		super(props, context);
	}

	componentDidMount() {
		console.log(this.props.params.acID, this.props.params)
		const id = this.props.params && this.props.params.acID;
		const { dispatch } = this.props;

		if (id) {
			dispatch({ type: 'activityForm/load', payload: { acID: id, ...Const } });
		}
	}

	componentWillUnmount() {
		this.props.dispatch({
			type: 'activityForm/resetState'
		});
	}

	goBack() {
		this.context.router.goBack();
	}

	onSubmit(values) {
		const hide = message.loading('正在保存...', 0);

		this.props.dispatch({
			type: 'activityForm/save',
			payload: {
				...this.props,
				headline_En: values.headline_En,
				headline_Km: values.headline_Km,
				theme_En: values.theme_En,
				theme_Km: values.theme_Km,
				start_time : values.start_time,
				end_time : values.end_time,
				content_En : values.content_En,
				content_Km : values.content_Km,
				award : values.award,
				state_flag : values.state_flag,
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
			    acID={props.acID}
				headline_En={props.headline_En}
				headline_Km={props.headline_Km}
				theme_En={props.theme_En}
				theme_Km={props.theme_Km}
				start_time={props.start_time}
				end_time={props.end_time}
				content_En={props.content_En}
				content_Km={props.content_Km}
				award={props.award}
				state_flag={props.state_flag}
				picture_En={props.picture_En}
				picture_Km={props.picture_Km}
				onSubmit={this.onSubmit.bind(this)} />
		)
	}
}

export default connect(({ activityForm, app }) => {
	return {
		...activityForm,
	}
})(activityForm);