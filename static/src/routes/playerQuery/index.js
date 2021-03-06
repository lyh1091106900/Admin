import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Table, Button, Modal, Switch, DatePicker, Input, InputNumber } from 'antd';
import moment, { localeData } from 'moment';

var gstartTime, gendTime, guserid;
const { MonthPicker, RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const columns = [
	{ title: '用户ID', dataIndex: 'userid' },
	{ title: '账号', dataIndex: 'account' },
	{ title: '昵称', dataIndex: 'name' },
	{ title: '性别', dataIndex: 'sex' },
	{ title: '用户等级', dataIndex: 'lv' },
	{ title: '用户经验', dataIndex: 'exp' },
	{ title: '用户金币', dataIndex: 'coins' },
	{ title: '用户存款', dataIndex: 'deposit' },
	{ title: '用户钻石', dataIndex: 'gems' },
	{ title: '语言', dataIndex: 'numlangu' },
	{ title: '黑名单标志', dataIndex: 'black_flag' },
	{ title: '机器人标志', dataIndex: 'robot_flag' },
	{ title: '充值', width: 150 },

];

const linkStyle = {
	display: 'inline-block',
	padding: '0 10px',
	cursor: 'pointer'
};

class playerQuery extends Component {
	static contextTypes = {
		router: PropTypes.object
	}

	constructor(props, context) {
		super(props, context);

		const len = columns.length;
		columns[len - 1].render = (text, record, index) => {
			return (<div>
				<span onClick={this.toplayerQueryForm.bind(this, record.userid)} style={linkStyle}>充值</span>
			</div>)
		}
		columns[len - 2].render = (text, record) => {
			return <Switch checked={!!!text} onChange={this.changeplayerQueryRobState.bind(this, record)} checkedChildren={'是'} unCheckedChildren={'否'} />
		}
		columns[len - 3].render = (text, record) => {
			return <Switch checked={!!!text} onChange={this.changeplayerQueryBlaState.bind(this, record)} checkedChildren={'是'} unCheckedChildren={'否'} />
		}
		// columns[len - 3].render = (text, record) => {
		// 	var time = new Date(record.time * 1000)
		// 	return (time.getFullYear() + '-' + (parseInt(time.getMonth())+1).toString() + '-' + time.getDate())
		// }
	}

	componentDidMount() {
		this.loadTableData();
	}

	loadTableData(page = 1, pageSize = 10, startTime, endTime, userid) {
		console.log(userid);
		this.props.dispatch({ type: 'playerQuery/loadPlayerQuery', payload: { page, pageSize, startTime, endTime, userid } });
	}

	tableChange(pagination) {
		if (gstartTime && gendTime)
			this.loadTableData(pagination.current, pagination.pageSize, gstartTime, gendTime);
		else
			this.loadTableData(pagination.current, pagination.pageSize);
	}

	selectRow(selectedRowKeys) {
		console.log('selectRow',selectedRowKeys)
		this.props.dispatch({ type: 'playerQuery/selectedRowKeys', payload: { selectedRowKeys } });
	}

	toplayerQueryForm(userid) {
		if (userid) {
			this.context.router.push({ pathname: `/CambodiaChress/playerQuery/edit/${userid}` });
		} else {
			this.context.router.push({ pathname: '/CambodiaChress/playerQuery/create' });
		}
	}

	changeplayerQueryRobState(record) {
		console.log("switchChange", record.robot_flag);
		const robot_flag = record.robot_flag ? 0 : 1;
		this.props.dispatch({
			type: 'playerQuery/updatePlayerQuery', payload: {
				...record,
				robot_flag,
				page: this.props.pagination.current,
				pageSize: this.props.pagination.pageSize
			}
		});
	}
	changeplayerQueryBlaState(record) {
		console.log("switchChange", record.black_flag);
		const black_flag = record.black_flag ? 0 : 1;
		this.props.dispatch({
			type: 'playerQuery/updatePlayerQuery', payload: {
				...record,
				black_flag,
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
					this.props.dispatch({ type: 'playerQuery/removePlayerQuery', payload: { selectedRowKeys: this.props.selectedRowKeys, templateArr } })
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
		//   const {value}=e.target;
		//   console.log('setInputId',value)
		//console.log(e)
		guserid = e;
	}

	Search() {

		this.loadTableData(1, 10, gstartTime, gendTime, guserid)
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
					<Button type="primary" onClick={this.deleteplayerQuery.bind(this)} style={{ marginRight: 10 }}>删除</Button>
					{/* <RangePicker style={{ marginRight: 10 }}
						format={dateFormat}
						onChange={this.dateSearch.bind(this)}
					/> */}
					<InputNumber onChange={this.setInputId.bind(this)} style={{ marginRight: 10 }}/>
					{/* <Input onChange={value =>this.setInputId(value)} style={{ marginRight: 10 ,width:120 }}/> */}
					<Button type="primary" onClick={this.Search.bind(this)} icon="search">查询</Button>
				</div>

				<Table columns={columns}
					rowSelection={rowSelection}
					pagination={pagination}
					dataSource={this.props.list}
					rowKey="userid"
					loading={this.props.loading}
					bordered
					onChange={this.tableChange.bind(this)} />
			</div>
		);
	}
};

export default connect(({ playerQuery }) => {
	return {
		list: playerQuery.list,
		loading: playerQuery.loading,
		total: playerQuery.total,
		selectedRowKeys: playerQuery.selectedRowKeys,
		pagination: playerQuery.pagination
	}
})(playerQuery);