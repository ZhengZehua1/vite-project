import request from "@/utils/request";
/* 获取汇总表格数据 */
export const getTableApi = (data)=>{
    return request({
        url: '/reportControlle/getPurchaseRecord',
        method: 'POST',
        /* 查询参数 */
        params: data
    })
}
// /reportControlle/getDeliveryRecord 
export const getTableApiB = (data)=>{
    return request({
        url: '/reportControlle/getDeliveryRecord',
        method: 'POST',
        /* 查询参数 */
        params: data
    })
}

/* 获取未同步订单列表 */
export const getOrderTable = (data)=>{
    return request({
        // url: '/reportControlle/getDeliveryRecord',
        method: 'POST',
        /* 查询参数 */
        params: data
    })
}