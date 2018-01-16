import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import TableView from './TableView';

import { message } from 'antd';
import { attachmentURL } from '../../utils/config';

const Const = {
	module: 'playerQuery'
}

class carouselForm extends Component {
	static contextTypes = {
		router: PropTypes.object
	}

	constructor(props, context) {
		super(props, context);
	}

	componentDidMount() {
		console.log( this.props.params.meID, this.props.params)
		const id = this.props.params && this.props.params.meID;
		const { dispatch } = this.props;

		if (id) {
			dispatch({ type: 'carouselForm/load', payload: { meID:id, ...Const } });
		}
	}

	componentWillUnmount() {
		this.props.dispatch({
			type: 'carouselForm/resetState'
		});
	}

	goBack() {
		this.context.router.goBack();
	}

	onSubmit(values) {
		const hide = message.loading('正在保存...', 0);

		this.props.dispatch({ 
			type: 'carouselForm/save',
			payload: {
				...this.props,
				headline_En: values.headline_En,
				headline_Km : values.headline_Km,
				state_flag :values.state_flag,
				frequency : values.frequency,
				cycles_time : values.cycles_time,
				msg_En : values.msg_En,
				msg_Km : values.msg_Km,
				start_time : values.start_time,
				end_time : values.end_time,
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
		console.log('renderplayerForm',props);
		return (
			<TableView
			headline_En={props.headline_En}
			headline_Km={props.headline_Km}
			state_flag={props.state_flag}
			frequency={props.frequency}
			cycles_time ={props.cycles_time}
			msg_En ={props.msg_En}
			msg_Km ={props.msg_Km}
			start_time ={props.start_time}
			end_time ={props.end_time}
			onSubmit={this.onSubmit.bind(this)}/>
		)
	}
}

export default connect(({ carouselForm, app }) => {
	return {
		...carouselForm,
	}
})(carouselForm);