import { request } from '../utils';

export async function loadTable(params) {
	
	const id = params.acID || 0;
	const url = id ? `/api/restql/t_activity/${id}` : '/api/restql/t_activity';
    console.log('loadTable',url);
	return request({
		url,
		method: 'get'
	});
};

export async function update(params) {
	const id = params.acID || 0;
	if (!id) {
		return;
	}
    console.log('update',params)
	delete params.acID;

	return request({
		url: `/api/restql/t_activity/${id}`,
		method: 'put',
		data: params
	});
};

export async function save(params) {
	return request({
		url: '/api/restql/t_activity',
		method: 'post',
		data: params
	});
};

