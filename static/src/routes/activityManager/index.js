import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Table, Button, Modal, Switch, DatePicker, Input, InputNumber } from 'antd';
import moment, { localeData } from 'moment';
import config from '../../utils/config'

var gstartTime, gendTime, gheadline_En;
const { MonthPicker, RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const columns = [
	{ title: '活动ID', dataIndex: 'acID' },
	{ title: '英文标题', dataIndex: 'headline_En' },
	{ title: '柬埔寨标题', dataIndex: 'headline_Km' },
	{ title: '英文主题', dataIndex: 'theme_En' },
	{ title: '柬埔寨主题', dataIndex: 'theme_Km' },
	{ title: '开始时间', dataIndex: 'start_time' },
	{ title: '结束时间', dataIndex: 'end_time' },
	{ title: '英语内容', dataIndex: 'content_En' },
	{ title: '柬埔寨内容', dataIndex: 'content_Km' },
	{ title: '英文图片名称', dataIndex: 'picture_En' },
	{ title: '柬埔寨图片名称', dataIndex: 'picture_Km' },
	{ title: '奖励', dataIndex: 'award' },
	{ title: '状态', dataIndex: 'state_flag' },
	{ title: '操作', width: 150 },

];


const linkStyle = {
	display: 'inline-block',
	padding: '0 10px',
	cursor: 'pointer'
};

class activityManager extends Component {
	static contextTypes = {
		router: PropTypes.object
	}

	constructor(props, context) {
		super(props, context);

		const len = columns.length;
		columns[len - 1].render = (text, record, index) => {
			return (<div>
				<span onClick={this.toActivityForm.bind(this, record.acID)} style={linkStyle}>编辑</span>
			</div>)
		}
		columns[len - 5].render = (text, record) => {
			
			return <img src={config.attachmentURL+'/'+record.picture_En} width='120' height='97' />
		}
		columns[len - 4].render = (text, record) => {
		
			return <img src={config.attachmentURL+'/'+record.picture_Km} width='120' height='97' />
		}
		columns[len - 9].render = (text, record) => {	
			let time = new Date(record.start_time)
			return (time.getFullYear() + '-' + (parseInt(time.getMonth())+1).toString() + '-' + time.getDate())
		}
		columns[len - 8].render = (text, record) => {
			let time = new Date(record.end_time)
			return (time.getFullYear() + '-' + (parseInt(time.getMonth())+1).toString() + '-' + time.getDate())
		}
		columns[len -2].render = (text,record) => {
			return <Switch checked={!!!text} onChange={this.changeActivityState.bind(this, record)} checkedChildren={'开'} unCheckedChildren={'关'}/>
		} 
		
	}

	componentDidMount() {
		this.loadTableData();
	}

	loadTableData(page = 1, pageSize = 10, startTime, endTime, headline_En) {
		this.props.dispatch({ type: 'activityManager/loadActivity', payload: { page, pageSize, startTime, endTime, headline_En:JSON.stringify(headline_En) } });
	}

	tableChange(pagination) {
		if (gstartTime && gendTime)
			this.loadTableData(pagination.current, pagination.pageSize, gstartTime, gendTime);
		else
			this.loadTableData(pagination.current, pagination.pageSize);
	}

	selectRow(selectedRowKeys) {
		console.log('selectRow',selectedRowKeys)
		this.props.dispatch({ type: 'activityManager/selectedRowKeys', payload: { selectedRowKeys } });
	}

	toActivityForm(acID) {
		if (acID) {
			this.context.router.push({ pathname: `/CambodiaChress/activityManager/edit/${acID}` });
		} else {
			this.context.router.push({ pathname: '/CambodiaChress/activityManager/create' });
		}
	}

	// changeShopItemFormHotState(record) {
	// 	//console.log("switchChangeHot", record);
	// 	const hot_flag = record.hot_flag ? 0 : 1;
	// 	this.props.dispatch({
	// 		type: 'activityManager/activityManager', payload: {
	// 			...record,
	// 			hot_flag,
	// 			page: this.props.pagination.current,
	// 			pageSize: this.props.pagination.pageSize
	// 		}
	// 	});
	// }
	changeActivityState(record) {   

		console.log("switchChangeUse", record);
		const use_flag = record.use_flag ? 0 : 1;
		this.props.dispatch({
			type: 'activityManager/updateActivity', payload: {
				...record,
				use_flag,
				page: this.props.pagination.current,
				pageSize: this.props.pagination.pageSize
			}
		});
	}

	deleteActivity() {

		if (this.props.selectedRowKeys.length > 0) {
			Modal.confirm({
				title: '确定要删除所选数据?',
				content: '点击确定，数据则被删除',
				onOk: () => {
					let templateArr = []
					this.props.list.forEach((v, index) => {
						if (this.props.selectedRowKeys.indexOf(v.id) !== -1) {
							templateArr.push(v.template);
						}
					});
					this.props.dispatch({ type: 'activityManager/removeActivity', payload: { selectedRowKeys: this.props.selectedRowKeys, templateArr } })
				}
			});
		} else {
			Modal.warning({
				title: '未选中任何数据',
				content: '请选择要删除的数据'
			});
		}
	}

	dateSearch(date, dateString) {
		console.log(date, dateString)
		if (date.length != 0) {
			dateString[0] += ' 00:00:00'
			dateString[1] += ' 23:59:59'
			var timeArray = [];
			for (var i = 0; i < dateString.length; i++) {
				console.log(Date.parse(new Date(dateString[i])), dateString[i])
				timeArray.push(Date.parse(new Date(dateString[i])))
			}
			gstartTime = timeArray[0] / 1000;
			gendTime = timeArray[1] / 1000;
			//this.loadTableData(1, 10, gstartTime, gendTime);
		}
		else {
			gstartTime = null;
			gendTime = null;
		}
		//this.loadTableData(1, 10)
	}

	setInputId(e) {
		  const {value}=e.target;
		//   console.log('setInputId',value)
		//console.log(value);
		gheadline_En = value;
	}

	Search() {
        console.log('gheadline_En',gheadline_En);
		this.loadTableData(1, 10, gstartTime, gendTime, gheadline_En)
	}
	render() {
		const rowSelection = {
			selectedRowKeys: this.props.selectedRowKeys,
			onChange: this.selectRow.bind(this)
		}

		const pagination = {
			showTotal: total => `共${total}条数据`,
			showSizeChanger: true,
			showQuickJumper: true,
			...this.props.pagination
		}

		return (
			<div className="content-inner">
				<div style={{ paddingBottom: 10, marginBottom: 20, borderBottom: '1px solid #ddd' }}>
					<Button type="primary" onClick={this.toActivityForm.bind(this, 0)} style={{ marginRight: 10 }}>新增</Button>
					<Button type="primary" onClick={this.deleteActivity.bind(this)} style={{ marginRight: 10 }}>删除</Button> 
					<Input onChange={value =>this.setInputId(value)} style={{ marginRight: 10 ,width:120 }} placeholder="请输入英文标题"/>
					<Button type="primary" onClick={this.Search.bind(this)} icon="search">查询</Button>
				</div>

				<Table columns={columns}
					rowSelection={rowSelection}
					pagination={pagination}
					dataSource={this.props.list}
					rowKey="acID"
					loading={this.props.loading}
					bordered
					/>
			</div>
		);
	}
};

export default connect(({ activityManager }) => {
	return {
		list: activityManager.list,
		loading: activityManager.loading,
		total: activityManager.total,
		selectedRowKeys: activityManager.selectedRowKeys,
		pagination: activityManager.pagination
	}
})(activityManager);