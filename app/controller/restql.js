// 1 获取内容列表，分页，每页几个
var tableSearchInfo = {
  web_newstype: ['tid'],
  t_player_game_detail : ['userid'],
  t_shop_item : ['productID'],
  t_exchange_item : ['name_En'],
  t_exchange_order : ['exchangeID'],
}
exports.index = function* () {
  const response = { success: false, message: '操作失败', }
  var res = this.params.res;
  const tableList = yield this.service.tableinfo.index();
  console.log('query0',this.query,this.query['productID'],res);
  if (res && this.helper.inarray(tableList, res)) {
    var condition={};
   
    if (this.query.startTime && this.query.endTime) {
      condition = { startTime: this.query.startTime, endTime: this.query.endTime }
    }
    var searchInfo = tableSearchInfo[res];
   
    if(searchInfo)
    for (var i = 0; i < searchInfo.length; i++) {
   //   console.log('query1',this.query[searchInfo[i]],condition[searchInfo[i]]);
      //console.log(this.query[searchInfo[i]]);
      if (this.query[searchInfo[i]]) {
        condition[searchInfo[i]]=this.query[searchInfo[i]]
      }
    }
   console.log('query2',condition);
    let result;
    if(res=='t_player_game_detail'){
       result = yield this.service.restql.indexGameDetail(res, this.query, condition);
    }
    else{
       result = yield this.service.restql.index(res, this.query, condition);
    }
   
    if (result) {
      response.message = '操作成功'
      response.success = true
      response.data = result
    }
  };
  this.body = response;
  this.status = 200;
};
exports.indexDouble =function*(){
  console.log('indexDouble');
  const response = { success: false, message: '操作失败', }
  var res1 = this.params.res1;
  var res2 = this.params.res2;
  var joinid= this.params.joinid;
  const tableList = yield this.service.tableinfo.index();
  if (res1 && this.helper.inarray(tableList, res1) && res2 && this.helper.inarray(tableList, res1)) {
    var condition={};
   
    if (this.query.startTime && this.query.endTime) {
      condition = { startTime: this.query.startTime, endTime: this.query.endTime }
    }
    var searchInfo = tableSearchInfo[res1];
   
    if(searchInfo)
    for (var i = 0; i < searchInfo.length; i++) {
   //   console.log('query1',this.query[searchInfo[i]],condition[searchInfo[i]]);
      //console.log(this.query[searchInfo[i]]);
      if (this.query[searchInfo[i]]) {
        condition[searchInfo[i]]=this.query[searchInfo[i]]
      }
    }
   console.log('query2',condition);
    let result;
    if(res1=='t_player_game_detail'){
     //  result = yield this.service.restql.indexGameDetail(res, this.query, condition);
    }
    else{
       result = yield this.service.restql.indexDouble(res1,res2,joinid,this.query, condition);
    }
   
    if (result) {
      response.message = '操作成功'
      response.success = true
      response.data = result
    }
  };
  this.body = response;
  this.status = 200;
}

// 2 根据ID获取内容信息
exports.show = function* () {
  const response = { success: false, message: '操作失败', }
  var res = this.params.res;
  delete this.params.res;
  const tableList = yield this.service.tableinfo.index();
  if (res && this.helper.inarray(tableList, res)) {
    // 调用 service 获取数据
    const result = yield this.service.restql.show(res, this.params);
    const preOne = yield this.service.restql.preOne(res, this.params);
    const nextOne = yield this.service.restql.nextOne(res, this.params);
    if (result) {
      result.preOne = preOne[0] ? preOne[0] : "没有上一个了";
      result.nextOne = nextOne[0] ? nextOne[0] : "没有下一个了";
      response.message = '操作成功';
      response.success = true;
      response.data = result;
    }
  }
  this.body = response;
  this.status = 200;
};

// 3 创建内容
exports.create = function* () {
  const response = { success: false, message: '操作失败', }
  var res = this.params.res;
  const tableList = yield this.service.tableinfo.index();
  if (res && this.helper.inarray(tableList, res)) {
    const result = yield this.service.restql.create(res, this.request.body);
    if (result.affectedRows) {
      let returnBody = this.request.body;
      returnBody.uid = result.insertId;
      response.message = '操作成功'
      response.success = true
      response.data = returnBody
    }
  }
  this.body = response;
  this.status = 200;
};
// 4 更新内容信息
exports.update = function* () {
  const response = { success: false, message: '操作失败', }
  var res = this.params.res;
  const tableList = yield this.service.tableinfo.index();
  if (res && this.helper.inarray(tableList, res)) {
    const result = yield this.service.restql.update(res, this.params.id, this.request.body);
    if (result.affectedRows) {
      response.message = '操作成功'
      response.success = true
      response.data = result
    }
  }
  this.body = response;
  this.status = 200;
};

// 5 删除内容信息
exports.destroy = function* () {
  const response = { success: false, message: '操作失败', }
  var res = this.params.res;
  const tableList = yield this.service.tableinfo.index();
  if (res && this.helper.inarray(tableList, res)) {
    const result = yield this.service.restql.destroy(res, this.params);
    if (result.affectedRows) {
      response.message = '操作成功'
      response.success = true
      response.data = result.affectedRows//删除的条数
    }
  }
  this.body = response;
  this.status = 200;
};
//修改兑换订单状态
exports.updateExOrderFlag =function*(){
 // console.log('updateExOrderFlag');
  const response = { success: false, message: '操作失败', }
  var res = this.params.res;
  const tableList = yield this.service.tableinfo.index();
  if (res && this.helper.inarray(tableList, res)) {
    const result = yield this.service.restql.updateExOrderFlag(res, this.params);
    if (result.affectedRows) {
      response.message = '操作成功'
      response.success = true
      response.data = result.affectedRows//删除的条数
    }
  }
  this.body = response;
  this.status = 200;
};