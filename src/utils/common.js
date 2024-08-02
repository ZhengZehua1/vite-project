/* 数据重置 */
const formInline = {
    supplyCode: '',
    supplyName: '',
    date: []
}
const page = {
    currentPage: 1,
    pageSize: 10,
    total: 0,
    disabled:false,
    background:true,
    pageSizes:[10, 20, 30, 40, 50, 100],
}
export const onResetValue = () => { 
    return {
        formInline:formInline,
        page:page
    }
}
export const todayA = ()=>{
    // 获取今天的日期
    let today = new Date();
    // 获取今天的00:00:00
    let todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    // 获取今天的23:59:59
    let todayEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000 - 1);
    // 格式化日期为YYYY-MM-DD HH:mm:ss
    function formatDate(date) {
        let year = date.getFullYear();
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
        let hours = date.getHours().toString().padStart(2, '0');
        let minutes = date.getMinutes().toString().padStart(2, '0');
        let seconds = date.getSeconds().toString().padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    // 输出今天的00:00:00到23:59:59
    return [
        formatDate(todayStart),
        formatDate(todayEnd)
    ]
}
export default {
    onResetValue,
    todayA
}