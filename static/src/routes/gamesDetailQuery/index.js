import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Table, Button, Modal, Switch, DatePicker, Input, InputNumber } from 'antd';
import moment, { localeData } from 'moment';

var gstartTime, gendTime, gtid;
const { MonthPicker, RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const columns = [
	{ title: '用户ID', dataIndex: 'userid' },
	{ title: '名称', dataIndex: 'name' },
	{ title: '开始时间', dataIndex: 'start_time' },
	{ title: '结束时间', dataIndex: 'end_time' },
	{ title: '游戏种类', dataIndex: 'game_type' },
	{ title: '游戏模式', dataIndex: 'game_mode' },
	{ title: '进入货币', dataIndex: 'thing_take_in' },
	{ title: '出去货币', dataIndex: 'thing_take_out' },
	{ title: '进入积分', dataIndex: 'credits_take_in' },
	{ title: '出去积分', dataIndex: 'credits_take_out' },
	{ title: '中间充值钻石', dataIndex: 'buy_during_game' },
];

const linkStyle = {
	display: 'inline-block',
	padding: '0 10px',
	cursor: 'pointer'
};

class gamesDetailQuery extends Component {
	static contextTypes = {
		router: PropTypes.object
	}

	constructor(props, context) {
		super(props, context);

		 const len = columns.length;
		//console.log('colunm',len,columns)
		columns[len - 9].render = (text, record) => {
			let time = new Date(record.start_time)
			return (time.getFullYear() + '-' + (parseInt(time.getMonth())+1).toString() + '-' + time.getDate())
		}
		columns[len - 8].render = (text, record) => {
			let time = new Date(record.end_time)
			return (time.getFullYear() + '-' + (parseInt(time.getMonth())+1).toString() + '-' + time.getDate())
		}
		columns[len - 8].render = (text, record) => {
			let time = new Date(record.end_time)
			return (time.getFullYear() + '-' + (parseInt(time.getMonth())+1).toString() + '-' + time.getDate())
		}
	}

	componentDidMount() {
		this.loadTableData();
	}

	loadTableData(page = 1, pageSize = 10, startTime, endTime, orderID) {
		this.props.dispatch({ type: 'gamesDetailQuery/loadGamesDetail', payload: { page, pageSize, startTime, endTime, orderID } });
	}

	tableChange(pagination) {
		if (gstartTime && gendTime)
			this.loadTableData(pagination.current, pagination.pageSize, gstartTime, gendTime);
		else
			this.loadTableData(pagination.current, pagination.pageSize);
	}

	selectRow(selectedRowKeys) {
		this.props.dispatch({ type: 'gamesDetailQuery/selectedRowKeys', payload: { selectedRowKeys } });
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
			type: 'expendsManager/loadGamesDetail', payload: {
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
					this.props.dispatch({ type: 'gamesDetailQuery/removeGamesDetail', payload: { selectedRowKeys: this.props.selectedRowKeys, templateArr } })
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
			gstartTime = timeArray[0] ;
			gendTime = timeArray[1] ;
			this.loadTableData(1, 10, gstartTime, gendTime);
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
		gtid = e;
	}

	Search() {

		this.loadTableData(1, 10, gstartTime, gendTime, gtid)
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
					<InputNumber onChange={this.setInputId.bind(this)} style={{ marginRight: 10 }}/>
					{/* <Input onChange={value =>this.setInputId(value)} style={{ marginRight: 10 ,width:120 }}/> */}
					<Button type="primary" onClick={this.Search.bind(this)} icon="search">查询</Button>
				</div>

				<Table columns={columns}
					rowSelection={rowSelection}
					pagination={pagination}
					dataSource={this.props.list}
					rowKey="game_detailID"
					loading={this.props.loading}
					bordered
					onChange={this.tableChange.bind(this)} />
			</div>
		);
	}
};

export default connect(({ gamesDetailQuery }) => {
	return {
		list: gamesDetailQuery.list,
		loading: gamesDetailQuery.loading,
		total: gamesDetailQuery.total,
		selectedRowKeys: gamesDetailQuery.selectedRowKeys,
		pagination: gamesDetailQuery.pagination
	}
})(gamesDetailQuery);