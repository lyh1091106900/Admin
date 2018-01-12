import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Table, Button, Modal, Switch, DatePicker, Input, InputNumber } from 'antd';
import moment, { localeData } from 'moment';
import config from '../../utils/config'

var gstartTime, gendTime, gexchange_item_name;
const { MonthPicker, RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const columns = [
	{ title: '商品ID', dataIndex: 'exchange_itemID' },
	{ title: '英文名称', dataIndex: 'name_En' },
	{ title: '柬埔寨名称', dataIndex: 'name_Km' },
	{ title: '英文介绍', dataIndex: 'introduce_En' },
	{ title: '柬埔寨介绍', dataIndex: 'introduce_Km' },
	{ title: '启用标志位', dataIndex: 'use_flag' },
	{ title: 'hot标志位', dataIndex: 'hot_flag' },
	{ title: '虚拟标志位', dataIndex: 'virtual_flag' },
	{ title: '创建时间', dataIndex: 'creat_time' },
	{ title: '修改时间', dataIndex: 'modify_time' },
	{ title: '英文图片', dataIndex: 'picture_En' },
	{ title: '柬埔寨图片', dataIndex: 'picture_Km' },
	{ title: '价格', dataIndex: 'price'},
	{ title: '操作', width: 150 },

];


const linkStyle = {
	display: 'inline-block',
	padding: '0 10px',
	cursor: 'pointer'
};

class exchangeItem extends Component {
	static contextTypes = {
		router: PropTypes.object
	}

	constructor(props, context) {
		super(props, context);

		const len = columns.length;
		columns[len - 1].render = (text, record, index) => {
			return (<div>
				<span onClick={this.toExchangeItemForm.bind(this, record.exchange_itemID)} style={linkStyle}>编辑</span>
			</div>)
		}
		columns[len - 4].render = (text, record) => {
			
			return <img src={config.attachmentURL+'/'+record.picture_En} width='120' height='97' />
		}
		columns[len - 3].render = (text, record) => {
		
			return <img src={config.attachmentURL+'/'+record.picture_Km} width='120' height='97' />
		}
		columns[len - 5].render = (text, record) => {	
			let time = new Date(record.modify_time)
			return (time.getFullYear() + '-' + (parseInt(time.getMonth())+1).toString() + '-' + time.getDate())
		}
		columns[len - 6].render = (text, record) => {
			let time = new Date(record.creat_time)
			return (time.getFullYear() + '-' + (parseInt(time.getMonth())+1).toString() + '-' + time.getDate())
		}
		columns[len -8].render = (text,record) => {
			return <Switch checked={!!!text} onChange={this.changeExchangeItemHotState.bind(this, record)} checkedChildren={'开'} unCheckedChildren={'关'}/>
		} 
		columns[len -9].render = (text,record) => {
			return <Switch checked={!!!text} onChange={this.changeExchangeItemUseState.bind(this, record)} checkedChildren={'开'} unCheckedChildren={'关'}/>
		} 
		columns[len -7].render = (text,record) => {
			return <Switch checked={!!!text} onChange={this.changeExchangeItemVirtualState.bind(this, record)} checkedChildren={'开'} unCheckedChildren={'关'}/>
		} 
	}

	componentDidMount() {
		this.loadTableData();
	}

	loadTableData(page = 1, pageSize = 10, startTime, endTime, gexchange_item_name) {
		console.log('loadTableData',gexchange_item_name);
		this.props.dispatch({ type: 'exchangeItem/loadExchangeItem', payload: { page, pageSize, startTime, endTime, name_En:JSON.stringify(gexchange_item_name) } });
	}

	tableChange(pagination) {
		// if (gstartTime && gendTime)
		// 	this.loadTableData(pagination.current, pagination.pageSize, gstartTime, gendTime);
		// else
		// 	this.loadTableData(pagination.current, pagination.pageSize);
	}

	selectRow(selectedRowKeys) {
		console.log('selectRow',selectedRowKeys)
		this.props.dispatch({ type: 'exchangeItem/selectedRowKeys', payload: { selectedRowKeys } });
	}

	toExchangeItemForm(exchange_itemID) {
		if (exchange_itemID) {
			this.context.router.push({ pathname: `/CambodiaChress/exchangeItem/edit/${exchange_itemID}` });
		} else {
			this.context.router.push({ pathname: '/CambodiaChress/exchangeItem/create' });
		}
	}

	changeExchangeItemHotState(record) {
		//console.log("switchChangeHot", record);
		const hot_flag = record.hot_flag ? 0 : 1;
		this.props.dispatch({
			type: 'exchangeItem/updateExchangeItem', payload: {
				...record,
				hot_flag,
				page: this.props.pagination.current,
				pageSize: this.props.pagination.pageSize
			}
		});
	}
	changeExchangeItemUseState(record) {
		console.log("switchChangeUse", record);
		const use_flag = record.use_flag ? 0 : 1;
		this.props.dispatch({
			type: 'exchangeItem/updateExchangeItem', payload: {
				...record,
				use_flag,
				page: this.props.pagination.current,
				pageSize: this.props.pagination.pageSize
			}
		});
	}

	changeExchangeItemVirtualState(record) {
		console.log("switchChangeVirtual", record.virtual_flag);
		const virtual_flag = record.virtual_flag ? 0 : 1;
		this.props.dispatch({
			type: 'exchangeItem/updateExchangeItem', payload: {
				...record,
				virtual_flag,
				page: this.props.pagination.current,
				pageSize: this.props.pagination.pageSize
			}
		});
	}

	deleteExchangeItem() {

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
					this.props.dispatch({ type: 'exchangeItem/removeExchangeItem', payload: { selectedRowKeys: this.props.selectedRowKeys, templateArr } })
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

	setInputName(e) {
		  const {value}=e.target;
		//   console.log('setInputId',value)
		console.log(value);
		if(value.trim() !='')
		gexchange_item_name = value;
		else
		gexchange_item_name = undefined;
	}

	Search() {

		this.loadTableData(1, 10, gstartTime, gendTime, gexchange_item_name)
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
					<Button type="primary" onClick={this.toExchangeItemForm.bind(this, 0)} style={{ marginRight: 10 }}>新增</Button>
					<Button type="primary" onClick={this.deleteExchangeItem.bind(this)} style={{ marginRight: 10 }}>删除</Button>
					<Input onChange={value =>this.setInputName(value)} style={{ marginRight: 10 ,width:120 }} placeholder="请输入商品英文名称"/>
					<Button type="primary" onClick={this.Search.bind(this)} icon="search">查询</Button>
				</div>

				<Table columns={columns}
					rowSelection={rowSelection}
					pagination={pagination}
					dataSource={this.props.list}
					rowKey="exchange_itemID"
					loading={this.props.loading}
					bordered
					onChange={this.tableChange.bind(this)} />
			</div>
		);
	}
};

export default connect(({ exchangeItem }) => {
	return {
		list: exchangeItem.list,
		loading: exchangeItem.loading,
		total: exchangeItem.total,
		selectedRowKeys: exchangeItem.selectedRowKeys,
		pagination: exchangeItem.pagination
	}
})(exchangeItem);