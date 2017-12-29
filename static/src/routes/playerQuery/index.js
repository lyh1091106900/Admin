import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Table, Button, Modal, Switch, DatePicker,Input,InputNumber } from 'antd';
import moment, { localeData } from 'moment';

var gstartTime,gendTime,gtid;
const { MonthPicker, RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const columns = [
	{ title: '序号', dataIndex: 'tid' },
	{ title: '模块', dataIndex: 'name' },
	{ title: '链接', dataIndex: 'link' },
	{ title: '顺序', dataIndex: 'ord' },
	{ title: '时间', dataIndex: 'time' },
	{ title: '状态', dataIndex: 'status' },
	{ title: '操作', width: 150 },

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
				<span onClick={this.toplayerQueryForm.bind(this, record.tid)} style={linkStyle}>编辑</span>
			</div>)
		}
		columns[len - 2].render = (text, record) => {
			return <Switch checked={!!text} onChange={this.changeplayerQueryState.bind(this, record)} checkedChildren={'开'} unCheckedChildren={'关'} />
		}
		columns[len - 3].render = (text, record) => {
			var time = new Date(record.time * 1000)
			return (time.getFullYear() + '-' + time.getMonth() + '-' + time.getDate())
		}
	}

	componentDidMount() {
		this.loadTableData();
	}

	loadTableData(page = 1, pageSize = 10, startTime, endTime,tid) {
		
			this.props.dispatch({ type: 'playerQuery/loadPlayerQuery', payload: { page, pageSize, startTime, endTime , tid } });
		    console.log({ page, pageSize, startTime, endTime , tid });
	}

	tableChange(pagination) {
		if(gstartTime&&gendTime)
		this.loadTableData(pagination.current, pagination.pageSize,gstartTime,gendTime);
		else
		this.loadTableData(pagination.current, pagination.pageSize);
	}

	selectRow(selectedRowKeys) {
		this.props.dispatch({ type: 'playerQuery/selectedRowKeys', payload: { selectedRowKeys } });
	}

	toplayerQueryForm(tid) {
		if (tid) {
			this.context.router.push({ pathname: `/CambodiaChress/playerQuery/edit/${tid}` });
		} else {
			this.context.router.push({ pathname: '/CambodiaChress/playerQuery/create' });
		}
	}

	changeplayerQueryState(record) {
		console.log("switchChange", record);
		const status = record.status ? 0 : 1;
		this.props.dispatch({
			type: 'playerQuery/loadPlayerQuery', payload: {
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
		if (date.length != 0) {
			//console.log(date, dateString)
			dateString[0] += ' 00:00:00'
			dateString[1] += ' 23:59:59'
			var timeArray = [];
			for (var i = 0; i < dateString.length; i++) {
				console.log(Date.parse(new Date(dateString[i])), dateString[i])
				timeArray.push(Date.parse(new Date(dateString[i])))
			}
			gstartTime=timeArray[0]/1000;
			gendTime =timeArray[1]/1000;
			this.loadTableData(1, 10, gstartTime, gendTime);
		}
		else
			this.loadTableData(1, 10)
	}

	setInputId(e){
		//   const {value}=e.target;
		//   console.log('setInputId',value)
		console.log(e)
		gtid=e;
	}

	idSearch(){
		
		this.loadTableData(1,10, gstartTime, gendTime,gtid)
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
					<Button type="primary" onClick={this.toplayerQueryForm.bind(this, 0)} style={{ marginRight: 10 }}>新增</Button>
					<Button type="primary" onClick={this.deleteplayerQuery.bind(this)} style={{ marginRight: 10 }}>删除</Button>
					<RangePicker style={{ marginRight: 10 }}
						format={dateFormat}
						onChange={this.dateSearch.bind(this)}
					/>
					<InputNumber  onChange={this.setInputId.bind(this)} />
					{/* <Input onChange={value =>this.setInputId(value)} style={{ marginRight: 10 ,width:120 }}/> */}
					<Button type="primary" onClick={this.idSearch.bind(this)} icon="search">查询</Button>
				</div>

				<Table columns={columns}
					rowSelection={rowSelection}
					pagination={pagination}
					dataSource={this.props.list}
					rowKey="tid"
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