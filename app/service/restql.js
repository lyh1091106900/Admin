module.exports = app => {
  class RestqlService extends app.Service {
    * index(modal, query, condition = {}) {
      // console.log('select',this.app.mysql.select);
      const offset = (parseInt(query.page) - 1) * parseInt(query.pageSize);
      //  console.log(condition)
      let conditionstr = "", conditionstrtotal = "";
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
      conditionstr = conditionstrtotal + ' LIMIT ' + offset + ', ' + parseInt(query.pageSize);
      // console.log(conditionstrtotal,1111)
      let sql = 'select * from ' + modal + conditionstr;
      let totalsql = 'select count(*) as total from ' + modal + conditionstrtotal;
      console.log(sql, totalsql);
      const record = yield this.app.mysql.query(sql);
      const totalRecord = yield this.app.mysql.query(totalsql);
      return { record, totalRecord: totalRecord[0].total };
    }
    * indexGameDetail(modal, query, condition = {}) {
      // console.log('select',this.app.mysql.select);
      const offset = (parseInt(query.page) - 1) * parseInt(query.pageSize);
      // console.log(condition)
      let conditionstr = "", conditionstrtotal = "";
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
      conditionstr = conditionstrtotal + ' LIMIT ' + offset + ', ' + parseInt(query.pageSize);
      // console.log(conditionstrtotal,1111)
      let sql = 'select * from ' + modal + conditionstr;
      let totalsql = 'select count(*) as total from ' + modal + conditionstrtotal;
      //  console.log(sql, totalsql);
      const record = yield this.app.mysql.query(sql);
      const totalRecord = yield this.app.mysql.query(totalsql);
      return { record, totalRecord: totalRecord[0].total };
    }

    * indexDouble(modal1, modal2, joinid, query, condition = {}) {
      // console.log('select',this.app.mysql.select);
      const offset = (parseInt(query.page) - 1) * parseInt(query.pageSize);
      //  console.log(condition)
      let conditionstr = "", conditionstrtotal = "";
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
      conditionstr = conditionstrtotal + ' LIMIT ' + offset + ', ' + parseInt(query.pageSize);
      // console.log(conditionstrtotal,1111)
      let sql = 'select * from ' + modal1 + ' inner join ' + modal2 +' on '+modal1+'.'+joinid + ' = '+modal2+'.'+joinid + conditionstr;
      let totalsql = 'select count(*) as total from ' + modal1 + ' inner join ' + modal2 +' on '+modal1+'.'+joinid + ' = '+modal2+'.'+joinid+ conditionstrtotal;
      console.log(sql, totalsql);
      const record = yield this.app.mysql.query(sql);
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
      console.log('update1', request);
      const modalId = yield this.service.tableinfo.primaryKey(modal);
     // console.log('update2', request);
      let upstr = `update ${modal} set `;
      let upEscape = [];
      for (const key in request) {
        if (upEscape.length != 0) { upstr += ', '; };
        upstr += `${key} = ?`;
        upEscape.push(request[key]);
      }
      upstr += ` where ${modalId} = ?`;
      upEscape.push(id);
       console.log('update', upstr, upEscape)
      let result = yield app.mysql.query(upstr, upEscape);
      return result;
    }
    * create(modal, request) {
      console.log('create', modal, request);
      const result = yield this.app.mysql.insert(modal, request);
      console.log('update3', result);
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
    
    // * updateExOrderFlag(madal,params){
    //   console.log('sqlupdateExOrderFlag1',madal,params.ids);
    //   const modalId = yield this.service.tableinfo.primaryKey(modal);
    //   console.log('sqlupdateExOrderFlag2',madal,params.ids);
    //   // const ids = params.ids;
    //   // let sql = `update ${modal} set order_flag = 1 where ${modalId} in ( ${ids} )`; 
    //   // console.log(sql);
    //   // let result = yield app.mysql.query(sql);
    //   return 1;
    // }
    * updateExOrderFlag(modal, params) {
      const modalId = yield this.service.tableinfo.primaryKey(modal);
     // console.log(modalId);
      const ids = params.ids;
      const flag =params.flag;
      const flag_column =params.flag_column
      let condition = {};
      let sql = `update ${modal} set ${flag_column} = ${flag} where ${modalId} in ( ${ids} )`;
      console.log('updateExOrderFlag',sql); 
      let result = yield app.mysql.query(sql);
      return result;
    }
    * updateExOrderFlagUnHandled(modal, params) {
      const modalId = yield this.service.tableinfo.primaryKey(modal);
     // console.log(modalId);
      const ids = params.ids;
      let condition = {};
      let sql = `update ${modal} set order_flag = 1 where ${modalId} in ( ${ids} )`;
      console.log('updateExOrderFlag',modalId); 
      let result = yield app.mysql.query(sql);
      return result;
    }

  }
  return RestqlService;
};