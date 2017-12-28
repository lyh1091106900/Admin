import { request } from '../utils';

export async function loadTable(params) {
	//console.log(params)
	const id = params.tid || 0;
	const url = id ? `/api/restql/web_newstype/${id}` : '/api/restql/web_newstype';

	return request({
		url,
		method: 'get'
	});
};

export async function update(params) {
	const id = params.tid || 0;
	if (!id) {
		return;
	}

	delete params.tid;

	return request({
		url: `/api/restql/web_newstype/${id}`,
		method: 'put',
		data: params
	});
};

export async function save(params) {
	return request({
		url: '/api/restql/web_newstype',
		method: 'post',
		data: params
	});
};

export async function addTable(params) {
	return request({
		url: '/api/table',
		method: 'post',
		data: params
	});
};
export async function updateTable(params) {
	return request({
		url: '/api/table',
		method: 'put',
		data: params
	});
};