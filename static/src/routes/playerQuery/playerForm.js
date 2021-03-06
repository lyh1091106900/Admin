import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import TableView from './TableView';

import { message } from 'antd';
import { attachmentURL } from '../../utils/config';

const Const = {
	module: 'playerQuery'
}

class playerForm extends Component {
	static contextTypes = {
		router: PropTypes.object
	}

	constructor(props, context) {
		super(props, context);
	}

	componentDidMount() {
		console.log( this.props.params.userid, this.props.params)
		const id = this.props.params && this.props.params.userid;
		const { dispatch } = this.props;

		if (id) {
			dispatch({ type: 'playerForm/load', payload: { userid:id, ...Const } });
		}
	}

	componentWillUnmount() {
		this.props.dispatch({
			type: 'playerForm/resetState'
		});
	}

	goBack() {
		this.context.router.goBack();
	}

	onSubmit(values) {
		const hide = message.loading('正在保存...', 0);

		this.props.dispatch({ 
			type: 'playerForm/save',
			payload: {
				...this.props,
				name: values.name,
				gems : values.gems,
				addGems :values.addGems,
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
			    name={props.name}
				userid={props.userid}
				gems={props.gems}
				onSubmit={this.onSubmit.bind(this)}/>
		)
	}
}

export default connect(({ playerForm, app }) => {
	return {
		...playerForm,
	}
})(playerForm);