import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Table, Button, Modal, Switch, DatePicker, Input, InputNumber } from 'antd';
import moment, { localeData } from 'moment';

var gstartTime, gendTime, gmeID;
const { MonthPicker, RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const columns = [
	{ title: '活动ID', dataIndex: 'meID' },
	{ title: '创建时间', dataIndex: 'creat_time' },
	{ title: '修改时间', dataIndex: 'modify_time' },
	{ title: '英文标题', dataIndex: 'headline_En' },
	{ title: '柬埔寨标题', dataIndex: 'headline_Km' },
	{ title: '状态', dataIndex: 'state_flag' },
	{ title: '次数', dataIndex: 'frequency' },
	{ title: '间隔', dataIndex: 'cycles_time' },
	{ title: '英语内容', dataIndex: 'msg_En' },
	{ title: '柬埔寨内容', dataIndex: 'msg_Km' },
	{ title: '开始时间', dataIndex: 'start_time' },
	{ title: '结束时间', dataIndex: 'end_time' },
	{ title: '编辑', width: 150 },

];

const linkStyle = {
	display: 'inline-block',
	padding: '0 10px',
	cursor: 'pointer'
};

class carouselInfoManager extends Component {
	static contextTypes = {
		router: PropTypes.object
	}

	constructor(props, context) {
		super(props, context);

		const len = columns.length;
		columns[len - 1].render = (text, record, index) => {
			return (<div>
				<span onClick={this.tocarouselInfoForm.bind(this, record.meID)} style={linkStyle}>编辑</span>
			</div>)
		}
	
		columns[len - 8].render = (text, record) => {
			return <Switch checked={!!!text} onChange={this.changeCarouselInfoFormState.bind(this, record)} checkedChildren={'开'} unCheckedChildren={'关'} />
		}
		columns[len - 11].render = (text, record) => {
			var time = new Date(record.modify_time )
			return (time.getFullYear() + '-' + (parseInt(time.getMonth())+1).toString() + '-' + time.getDate())
		}
		columns[len - 12].render = (text, record) => {
			var time = new Date(record.creat_time )
			return (time.getFullYear() + '-' + (parseInt(time.getMonth())+1).toString() + '-' + time.getDate())
		}
	}

	componentDidMount() {
		this.loadTableData();
	}

	loadTableData(page = 1, pageSize = 10, startTime, endTime, meID) {
		console.log(meID);
		this.props.dispatch({ type: 'carouselInfoManager/loadCarouselInfo', payload: { page, pageSize, startTime, endTime, meID } });
	}

	tableChange(pagination) {
		if (gstartTime && gendTime)
			this.loadTableData(pagination.current, pagination.pageSize, gstartTime, gendTime);
		else
			this.loadTableData(pagination.current, pagination.pageSize);
	}

	selectRow(selectedRowKeys) {
		console.log('selectRow',selectedRowKeys)
		this.props.dispatch({ type: 'carouselInfoManager/selectedRowKeys', payload: { selectedRowKeys } });
	}

	tocarouselInfoForm(meID) {
		if (meID) {
			this.context.router.push({ pathname: `/CambodiaChress/carouselInfoManager/edit/${meID}` });
		} else {
			this.context.router.push({ pathname: '/CambodiaChress/carouselInfoManager/create' });
		}
	}

	
	changeCarouselInfoFormState(record) {
		console.log("switchChange", record.state_flag);
		const state_flag = record.state_flag ? 0 : 1;
		this.props.dispatch({
			type: 'carouselInfoManager/updateCarouselInfo', payload: {
				...record,
				state_flag,
				page: this.props.pagination.current,
				pageSize: this.props.pagination.pageSize
			}
		});
	}

	deletecarouselInfo() {

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
					this.props.dispatch({ type: 'carouselInfoManager/removeCarouselInfo', payload: { selectedRowKeys: this.props.selectedRowKeys, templateArr } })
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
				    <Button type="primary" onClick={this.tocarouselInfoForm.bind(this)} style={{ marginRight: 10 }}>新增</Button>
					<Button type="primary" onClick={this.deletecarouselInfo.bind(this)} style={{ marginRight: 10 }}>删除</Button>
					{/* <RangePicker style={{ marginRight: 10 }}
						format={dateFormat}
						onChange={this.dateSearch.bind(this)}
					/> */}
					{/* <InputNumber onChange={this.setInputId.bind(this)} style={{ marginRight: 10 }}/> */}
					{/* <Input onChange={value =>this.setInputId(value)} style={{ marginRight: 10 ,width:120 }}/> */}
					{/* <Button type="primary" onClick={this.Search.bind(this)} icon="search">查询</Button> */}
				</div>

				<Table columns={columns}
					rowSelection={rowSelection}
					pagination={pagination}
					dataSource={this.props.list}
					rowKey="meID"
					loading={this.props.loading}
					bordered
					onChange={this.tableChange.bind(this)} />
			</div>
		);
	}
};

export default connect(({ carouselInfoManager }) => {
	return {
		list: carouselInfoManager.list,
		loading: carouselInfoManager.loading,
		total: carouselInfoManager.total,
		selectedRowKeys: carouselInfoManager.selectedRowKeys,
		pagination: carouselInfoManager.pagination
	}
})(carouselInfoManager);