module.exports = app => {
  class RestqlService extends app.Service {
    * index(modal, query, condition = {}) {
      // console.log('select',this.app.mysql.select);
       const offset = (parseInt(query.page) - 1) * parseInt(query.pageSize);
    //  console.log(condition)
      let conditionstr = "",conditionstrtotal="";
      if (JSON.stringify(condition) != "{}") {
        conditionstr = " where ";
        for (const key in condition) {//key除了StartTime,endTime外对应标的字段名
          if (key == 'startTime') {
          
            conditionstr = conditionstr + 'time' + " >= " + condition[key] + ' and ';
          }
          else if (key == 'endTime') {
            conditionstr = conditionstr + 'time' + " <= " + condition[key] + ' and ';
          }
          else {
            conditionstr = conditionstr + key + " = " + condition[key] + ' and ';
          }
        }
       conditionstrtotal = conditionstr.substring(0, conditionstr.lastIndexOf(' and '));
      // console.log(conditionstrtotal,1)
      };
       conditionstr =conditionstrtotal+' LIMIT ' + offset + ', ' + parseInt(query.pageSize);
      // console.log(conditionstrtotal,1111)
      let sql = 'select * from ' + modal + conditionstr;
      let totalsql = 'select count(*) as total from ' + modal + conditionstrtotal;
      console.log(sql, totalsql);
      const record=yield this.app.mysql.query(sql);
      const totalRecord = yield this.app.mysql.query(totalsql);
      return { record, totalRecord: totalRecord[0].total };
    }
    * indexGameDetail(modal, query, condition = {}) {
      // console.log('select',this.app.mysql.select);
       const offset = (parseInt(query.page) - 1) * parseInt(query.pageSize);
     // console.log(condition)
      let conditionstr = "",conditionstrtotal="";
      if (JSON.stringify(condition) != "{}") {
        conditionstr = " where ";
        for (const key in condition) {//key除了StartTime,endTime外对应标的字段名
          if (key == 'startTime') {
          
            conditionstr = conditionstr + 'start_time' + " >= " + condition[key] + ' and ';
          }
          else if (key == 'endTime') {
            conditionstr = conditionstr + 'start_time' + " <= " + condition[key] + ' and ';
          }
          else {
            conditionstr = conditionstr + key + " = " + condition[key] + ' and ';
          }
        }
       conditionstrtotal = conditionstr.substring(0, conditionstr.lastIndexOf(' and '));
      // console.log(conditionstrtotal,1)
      };
       conditionstr =conditionstrtotal+' LIMIT ' + offset + ', ' + parseInt(query.pageSize);
      // console.log(conditionstrtotal,1111)
      let sql = 'select * from ' + modal + conditionstr;
      let totalsql = 'select count(*) as total from ' + modal + conditionstrtotal;
    //  console.log(sql, totalsql);
      const record=yield this.app.mysql.query(sql);
      const totalRecord = yield this.app.mysql.query(totalsql);
      return { record, totalRecord: totalRecord[0].total };
    }

    * show(modal, params) {
      const modalId = yield this.service.tableinfo.primaryKey(modal);
      let condition = {};
      condition[modalId] = params.id;
    //  console.log(modal, condition);
      let record = yield this.app.mysql.get(modal, condition);
    //  console.log(record);
      return record;
    }
    * update(modal, id, request) {
      console.log('update',request);
      const modalId = yield this.service.tableinfo.primaryKey(modal);
      let upstr = `update ${modal} set `;
      let upEscape = [];
      for (const key in request) {
        if (upEscape.length != 0) { upstr += ', '; };
        upstr += `${key} = ?`;
        upEscape.push(request[key]);
      }
      upstr += ` where ${modalId} = ?`;
      upEscape.push(id);
     // console.log('update', upstr, upEscape)
      let result = yield app.mysql.query(upstr, upEscape);
      return result;
    }
    * create(modal, request) {
      console.log('create', modal, request);
      const result = yield this.app.mysql.insert(modal, request);
      return result;
    }
    * destroy(modal, params) {
      const modalId = yield this.service.tableinfo.primaryKey(modal);
      const ids = params.id.split(',');
      let condition = {};
      condition[modalId] = ids;
      const result = yield this.app.mysql.delete(modal, condition);
      return result;
    }
    * preOne(modal, params) {
      const modalId = yield this.service.tableinfo.primaryKey(modal);
      let queryStr = `select * from ${modal} where ${modalId} < ?  order by ${modalId} desc limit 1 `;
      let sqlEscape = [params.id];
      let result = yield app.mysql.query(queryStr, sqlEscape);

      return result;
    }
    * nextOne(modal, params) {
      const modalId = yield this.service.tableinfo.primaryKey(modal);
      let queryStr = `select * from ${modal} where ${modalId} > ?  order by ${modalId} asc limit 1 `;
      let sqlEscape = [params.id];
      let result = yield app.mysql.query(queryStr, sqlEscape);
      return result;
    }
  }
  return RestqlService;
};