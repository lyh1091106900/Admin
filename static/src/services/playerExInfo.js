import { request } from '../utils'

export async function query(params) {
	console.log('playPaysInfo',query,params)
	return request({
		url: "/api/restqldoubleTbl/t_exchange_order/t_exchange_item/exchange_itemID",
		method: 'GET',
		data: params
	});
};

export async function remove(params) {
	const selectedRowKeys = params.selectedRowKeys || [];
	const ids = selectedRowKeys.join(',');
	
	return request({
		url: `/api/restql/t_exchange_order/${ids}`,
		method: 'delete'
	});
};
export async function updateOrderFlag(params) {
	const selectedRowKeys = params.selectedRowKeys || [];
	const ids = selectedRowKeys.join(',');
	const flag = params.flag;
	const flag_colu = 'order_flag'
	console.log(flag);
	return request({
		url: `/api/restqlUpdateExOrderFlag/t_exchange_order/${ids}/${flag}/${flag_colu}`,
		method: 'put'
	});
};

export function update(params) {
	const id = params.id;
	delete params.id;

	return request({
		url: `/api/restql/t_exchange_order/${id}`,
		method: 'put',
		data: params
	})
}

