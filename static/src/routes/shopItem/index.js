import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Table, Button, Modal, Switch, DatePicker, Input, InputNumber } from 'antd';
import moment, { localeData } from 'moment';
import config from '../../utils/config'

var gstartTime, gendTime, gproductID;
const { MonthPicker, RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const columns = [
	{ title: '商品ID', dataIndex: 'productID' },
	{ title: '英文名称', dataIndex: 'name_En' },
	{ title: '柬埔寨名称', dataIndex: 'name_Km' },
	{ title: '英文介绍', dataIndex: 'introduce_En' },
	{ title: '柬埔寨介绍', dataIndex: 'introduce_Km' },
	{ title: '启用标志位', dataIndex: 'use_flag' },
	{ title: 'hot标志位', dataIndex: 'hot_flag' },
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

class shopItem extends Component {
	static contextTypes = {
		router: PropTypes.object
	}

	constructor(props, context) {
		super(props, context);

		const len = columns.length;
		columns[len - 1].render = (text, record, index) => {
			return (<div>
				<span onClick={this.toShopItemForm.bind(this, record.productID)} style={linkStyle}>编辑</span>
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
		columns[len -7].render = (text,record) => {
			return <Switch checked={!!!text} onChange={this.changeShopItemFormHotState.bind(this, record)} checkedChildren={'开'} unCheckedChildren={'关'}/>
		} 
		columns[len -8].render = (text,record) => {
			return <Switch checked={!!!text} onChange={this.changeShopItemFormUseState.bind(this, record)} checkedChildren={'开'} unCheckedChildren={'关'}/>
		} 
	}

	componentDidMount() {
		this.loadTableData();
	}

	loadTableData(page = 1, pageSize = 10, startTime, endTime, productID) {
		this.props.dispatch({ type: 'shopItem/loadShopItem', payload: { page, pageSize, startTime, endTime, productID:JSON.stringify(productID) } });
	}

	tableChange(pagination) {
		// if (gstartTime && gendTime)
		// 	this.loadTableData(pagination.current, pagination.pageSize, gstartTime, gendTime);
		// else
		// 	this.loadTableData(pagination.current, pagination.pageSize);
	}

	selectRow(selectedRowKeys) {
		console.log('selectRow',selectedRowKeys)
		this.props.dispatch({ type: 'shopItem/selectedRowKeys', payload: { selectedRowKeys } });
	}

	toShopItemForm(productID) {
		if (productID) {
			this.context.router.push({ pathname: `/CambodiaChress/shopItem/edit/${productID}` });
		} else {
			this.context.router.push({ pathname: '/CambodiaChress/shopItem/create' });
		}
	}

	changeShopItemFormHotState(record) {
		//console.log("switchChangeHot", record);
		const hot_flag = record.hot_flag ? 0 : 1;
		this.props.dispatch({
			type: 'shopItem/updateShopItem', payload: {
				...record,
				hot_flag,
				page: this.props.pagination.current,
				pageSize: this.props.pagination.pageSize
			}
		});
	}
	changeShopItemFormUseState(record) {
		console.log("switchChangeUse", record);
		const use_flag = record.use_flag ? 0 : 1;
		this.props.dispatch({
			type: 'shopItem/updateShopItem', payload: {
				...record,
				use_flag,
				page: this.props.pagination.current,
				pageSize: this.props.pagination.pageSize
			}
		});
	}

	deleteShopItemForm() {

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
					this.props.dispatch({ type: 'shopItem/removeShopItem', payload: { selectedRowKeys: this.props.selectedRowKeys, templateArr } })
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
		console.log(value);
		gproductID = value;
	}

	Search() {

		this.loadTableData(1, 10, gstartTime, gendTime, gproductID)
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
					<Button type="primary" onClick={this.toShopItemForm.bind(this, 0)} style={{ marginRight: 10 }}>新增</Button>
					<Button type="primary" onClick={this.deleteShopItemForm.bind(this)} style={{ marginRight: 10 }}>删除</Button>
					<Input onChange={value =>this.setInputId(value)} style={{ marginRight: 10 ,width:120 }}/>
					<Button type="primary" onClick={this.Search.bind(this)} icon="search">查询</Button>
				</div>

				<Table columns={columns}
					rowSelection={rowSelection}
					pagination={pagination}
					dataSource={this.props.list}
					rowKey="productID"
					loading={this.props.loading}
					bordered
					onChange={this.tableChange.bind(this)} />
			</div>
		);
	}
};

export default connect(({ shopItem }) => {
	return {
		list: shopItem.list,
		loading: shopItem.loading,
		total: shopItem.total,
		selectedRowKeys: shopItem.selectedRowKeys,
		pagination: shopItem.pagination
	}
})(shopItem);