import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Table, Button, Modal, Switch, DatePicker, Input, InputNumber } from 'antd';
import moment, { localeData } from 'moment';

var gstartTime, gendTime, gexchangeID;
const { MonthPicker, RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const columns = [
	{ title: '兑换订单号', dataIndex: 'exchangeID' },
	{ title: '商品ID', dataIndex: 'exchange_itemID' },
	{ title: '英文商品名称', dataIndex: 'name_En' },
	{ title: '英文柬埔寨名称', dataIndex: 'name_Km' },
	{ title: '订单时间', dataIndex: 'time' },
	{ title: '订单状态', dataIndex: 'order_flag' },
	{ title: '用户ID', dataIndex: 'userid' },
	{ title: '用户昵称', dataIndex: 'name' },

];

const linkStyle = {
	display: 'inline-block',
	padding: '0 10px',
	cursor: 'pointer'
};

class playerExInfo extends Component {
	static contextTypes = {
		router: PropTypes.object
	}

	constructor(props, context) {
		super(props, context);

		 const len = columns.length;
		columns[len - 3].render = (text, record) => {
		  return record.order_flag==1?'已处理':'待处理';
		}
		columns[len - 4].render = (text, record) => {
			var time = new Date(record.time)
			return (time.getFullYear() + '-' + (parseInt(time.getMonth())+1).toString() + '-' + time.getDate())
		}
	}

	componentDidMount() {
		this.loadTableData();
	}

	loadTableData(page = 1, pageSize = 10, startTime, endTime, exchangeID) {
		console.log('loadTableData',exchangeID)
		this.props.dispatch({ type: 'playerExInfo/loadPlayerExInfo', payload: { page, pageSize, startTime, endTime, exchangeID } });
	}

	tableChange(pagination) {
		if (gstartTime && gendTime)
			this.loadTableData(pagination.current, pagination.pageSize, gstartTime, gendTime);
		else
			this.loadTableData(pagination.current, pagination.pageSize);
	}

	selectRow(selectedRowKeys) {
		console.log('selectRows',selectedRowKeys)
		this.props.dispatch({ type: 'playerExInfo/selectedRowKeys', payload: { selectedRowKeys } });
	}

	toplayerQueryForm(tid) {
		// if (tid) {
		// 	this.context.router.push({ pathname: `/CambodiaChress/playerQuery/edit/${tid}` });
		// } else {
		// 	this.context.router.push({ pathname: '/CambodiaChress/playerQuery/create' });
		// }
	}

	changeplayerQueryState(record) {
		console.log("switchChange", record);
		const status = record.status ? 0 : 1;
		this.props.dispatch({
			type: 'playerExInfo/loadPlayerExInfo', payload: {
				...record,
				status,
				page: this.props.pagination.current,
				pageSize: this.props.pagination.pageSize
			}
		});
	}

	deleteplayerQuery() {

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
					this.props.dispatch({ type: 'playerExInfo/removePlayerExInfo', payload: { selectedRowKeys: this.props.selectedRowKeys, templateArr } })
				}
			});
		} else {
			Modal.warning({
				title: '未选中任何数据',
				content: '请选择要删除的数据'
			});
		}
	}

	setOrderFlagHandled() {

		if (this.props.selectedRowKeys.length > 0) {
			Modal.confirm({
				title: '修改订单状态?',
				content: '点击确定，订单设置为已处理',
				onOk: () => {
					let templateArr = []
					this.props.list.forEach((v, index) => {
						if (this.props.selectedRowKeys.indexOf(v.id) !== -1) {
							templateArr.push(v.template);
						}
					});
					this.props.dispatch({ type: 'playerExInfo/updatePlayerExInfoOrderFlag', payload: { selectedRowKeys: this.props.selectedRowKeys, flag:1 } })
				}
			});
		} else {
			Modal.warning({
				title: '未选中任何数据',
				content: '请选择要修改的订单'
			});
		}
	}
	setOrderFlagunHandled() {

		if (this.props.selectedRowKeys.length > 0) {
			Modal.confirm({
				title: '修改订单状态?',
				content: '点击确定，订单设置为已处理',
				onOk: () => {
					let templateArr = []
					this.props.list.forEach((v, index) => {
						if (this.props.selectedRowKeys.indexOf(v.id) !== -1) {
							templateArr.push(v.template);
						}
					});
					this.props.dispatch({ type: 'playerExInfo/updatePlayerExInfoOrderFlag', payload: { selectedRowKeys: this.props.selectedRowKeys, flag:0 } })
				}
			});
		} else {
			Modal.warning({
				title: '未选中任何数据',
				content: '请选择要修改的订单'
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
			gstartTime = timeArray[0] ;
			gendTime = timeArray[1] ;
		}
		else {
			gstartTime = null;
			gendTime = null;
		}
		//this.loadTableData(1, 10)
	}

	setInputId(e) {
		//   const {value}=e.target;
		//   console.log('setInputId',value)
		console.log(e)
		gexchangeID = e;
	}

	Search() {
		this.loadTableData(1, 10, gstartTime, gendTime, gexchangeID)
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
					{/* <Button type="primary" onClick={this.toplayerQueryForm.bind(this, 0)} style={{ marginRight: 10 }}>新增</Button>
					<Button type="primary" onClick={this.deleteplayerQuery.bind(this)} style={{ marginRight: 10 }}>删除</Button> */}
					<RangePicker style={{ marginRight: 10 }}
						format={dateFormat}
						onChange={this.dateSearch.bind(this)}
					/>
					<InputNumber onChange={this.setInputId.bind(this)} style={{ marginRight: 10 }} placeholder="输入订单号"/>
					{/* <Input onChange={value =>this.setInputId(value)} style={{ marginRight: 10 ,width:120 }}/> */}
					<Button type="primary" onClick={this.Search.bind(this)} icon="search" style={{ marginRight: 10 }} >查询</Button>
					<Button type="primary" onClick={this.setOrderFlagHandled.bind(this)} style={{ marginRight: 10 }}>已处理</Button>
					<Button type="primary" onClick={this.setOrderFlagunHandled.bind(this)} style={{ marginRight: 10 }} >待处理</Button>
				</div>

				<Table columns={columns}
					rowSelection={rowSelection}
					pagination={pagination}
					dataSource={this.props.list}
					rowKey="exchangeID"
					loading={this.props.loading}
					bordered
					onChange={this.tableChange.bind(this)} />
			</div>
		);
	}
};

export default connect(({ playerExInfo }) => {
	return {
		list: playerExInfo.list,
		loading: playerExInfo.loading,
		total: playerExInfo.total,
		selectedRowKeys: playerExInfo.selectedRowKeys,
		pagination: playerExInfo.pagination
	}
})(playerExInfo);