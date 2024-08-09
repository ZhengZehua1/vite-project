import request from "@/utils/request";
/* 获取汇总表格数据 */
export const getTableApi = (data)=>{
    return request({
        url: '/reportControlle/getPurchaseRecord',
        method: 'POST',
        /* 查询参数 */
        data: data
    })
}
// /reportControlle/getDeliveryRecord 
export const getTableApiB = (data)=>{
    return request({
        url: '/reportControlle/getDeliveryRecord',
        method: 'POST',
        /* 查询参数 */
        data: data
    })
}

// /api/reportControlle/getSupplyList
/* 获取名称 */
export const getSupplyListApi = (data)=>{
    return request({
        url: '/reportControlle/getSupplyList',
        method: 'get',
        /* 查询参数 */
        params: data
    })
}

/* 获取未同步订单列表 */
export const getOrderTable = (data)=>{
    return request({
        url: '/reportControlle/getUnsyncRecord',
        method: 'POST',
        /* 查询参数 */
        data: data
    })
}
/* 获取未同步送货列表 */
export const getDeliveryTable = (data)=>{
    return request({
        url: '/reportControlle/getUnsyncDelivery',
        method: 'POST',
        /* 查询参数 */
        data: data
    })
}
/* 获取未排产列表 */
export const getProductionTable = (data)=>{
    return request({
        url: '/reportControlle/getShedulingRecord',
        method: 'POST',
        /* 查询参数 */
        data: data
    })
}


/* 导出 1 */
export const exportExcelTableApi = (data)=>{
    return request({
        url: '/reportControlle/exportExcel',
        method: 'POST',
        /* 文件 */
        responseType: 'blob',
        /* 查询参数 */
        data: data
    })
}
/* 导出 2 */
export const exportExcelTableBApi = (data)=>{
    return request({
        url: '/reportControlle/exportDeliveryExcel',
        method: 'POST',
        /* 文件 */
        responseType: 'blob',
        /* 查询参数 */
        data: data
    })
}

/* /exportUnSysExcel
未同步订单导出 */
export const exportUnSysExcelTableApi = (url,data)=>{
    return request({
        url: `/reportControlle${url}`,
        method: 'POST',
        /* 文件 */
        responseType: 'blob',
        /* 查询参数 */
        data: data
    })
}

/* /exportUnSheuing
未排产订单导出 */

/* /exportUnDelivery
发货未确认订单导出 */
