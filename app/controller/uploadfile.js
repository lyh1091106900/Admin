// import Upload from 'antd/lib/upload/Upload';

'use strict';

const fs = require('fs');
const path = require('path');
const sendToWormhole = require('stream-wormhole');

exports.index = function* () {
  
  const stream = yield this.getFileStream();
  const saveFileName = new Date().getTime() + stream.filename;
  let filepath = path.join(this.app.config.baseDir, `app/public/uploads/${saveFileName}`);
  console.log('Upload1',this.params.id);
  try {
      yield saveStream(stream, filepath);
    
    } catch (err) {
      yield sendToWormhole(stream);
      throw err;
    }
  // if (stream.fields.title === 'mock-error') {
  //   filepath = path.join(this.app.config.baseDir, `app/public/uploads/not-exists/dir/${saveFileName}`);
  // } else if (stream.fields.title === 'mock-read-error') {
  //   filepath = path.join(this.app.config.baseDir, `app/public/uploads/read-error-${saveFileName}`);
  // }
  // this.logger.warn('Saving %s to %s', stream.filename, filepath);
  // try {
  //   yield saveStream(stream, filepath);
  // } catch (err) {
  //   yield sendToWormhole(stream);
  //   throw err;
  // }

  // this.body = {
  //   file: saveFileName,
  //   fields: stream.fields,
  // };
  this.body = 'upload';
};

exports.indexUpShopItmeEn = function* () {
  
  const stream = yield this.getFileStream();
  const saveFileName = new Date().getTime() + stream.filename;
  let filepath = path.join(this.app.config.baseDir, `app/public/uploads/${saveFileName}`);
  let option ={ picture_En : saveFileName}
  console.log('Upload12',option);
  try {
      yield saveStream(stream, filepath);
      yield this.service.restql.update('t_shop_item',this.params.id,option)
    } catch (err) {
      yield sendToWormhole(stream);
      throw err;
    }
 
  this.body = 'upload';
};

exports.indexUpShopItmeKm = function* () {
  
  const stream = yield this.getFileStream();
  const saveFileName = new Date().getTime() + stream.filename;
  let filepath = path.join(this.app.config.baseDir, `app/public/uploads/${saveFileName}`);
  let option ={ picture_Km : saveFileName}
  console.log('Upload13',option);
  try {
      yield saveStream(stream, filepath);
      yield this.service.restql.update('t_shop_item',this.params.id,option)
    } catch (err) {
      yield sendToWormhole(stream);
      throw err;
    }
 
  this.body = 'upload';
};

exports.indexUpExItmeEn = function* () {
  
  const stream = yield this.getFileStream();
  const saveFileName = new Date().getTime() + stream.filename;
  let filepath = path.join(this.app.config.baseDir, `app/public/uploads/${saveFileName}`);
  let option ={ picture_En : saveFileName}
  console.log('Upload23',option);
  try {
      yield saveStream(stream, filepath);
      yield this.service.restql.update('t_exchange_item',this.params.id,option)
    } catch (err) {
      yield sendToWormhole(stream);
      throw err;
    }
 
  this.body = 'upload';
};

exports.indexUpExItmeKm = function* () {
  
  const stream = yield this.getFileStream();
  const saveFileName = new Date().getTime() + stream.filename;
  let filepath = path.join(this.app.config.baseDir, `app/public/uploads/${saveFileName}`);
  let option ={ picture_Km : saveFileName}
  console.log('Upload24',option);
  try {
      yield saveStream(stream, filepath);
      yield this.service.restql.update('t_exchange_item',this.params.id,option)
    } catch (err) {
      yield sendToWormhole(stream);
      throw err;
    }
 
  this.body = 'upload';
};


function saveStream(stream, filepath) {
  return new Promise((resolve, reject) => {
    console.log('saveStream',filepath);
    if (filepath.indexOf('/read-error-') > 0) {
      stream.once('readable', () => {
        const buf = stream.read(10240);
        console.log('read %d bytes', buf.length);
        setTimeout(() => {
          reject(new Error('mock read error'));
        }, 1000);
      });
    } else {
      console.log('saveStream1',filepath);
      const ws = fs.createWriteStream(filepath);
      stream.pipe(ws);
      ws.on('error', reject);
      ws.on('finish', resolve);
    }
  });
}