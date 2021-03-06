import { request } from '../utils';

export async function loadTable(params) {
	//console.log(params)
	const id = params.userid || 0;
	const url = id ? `/api/restql/t_users/${id}` : '/api/restql/t_users';

	return request({
		url,
		method: 'get'
	});
};

export async function update(params) {
	const id = params.userid || 0;
	if (!id) {
		return;
	}

	delete params.userid;

	return request({
		url: `/api/restql/t_users/${id}`,
		method: 'put',
		data: params
	});
};

export async function save(params) {
	return request({
		url: '/api/restql/t_users',
		method: 'post',
		data: params
	});
};
export async function saveAddOrder(params) {
	return request({
		url: '/api/restql/t_recharge',
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