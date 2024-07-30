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

/* 数据分页 */
export const onPaging = (currentPage,pageSize,data)=>{
    console.log(currentPage,pageSize,data)
    let newArr = data.slice((currentPage-1)*pageSize,currentPage*pageSize)
    return{
        currentPage,
        pageSize,
        dataValue: newArr,
        total:data.length
    }
}
export default {
    onResetValue,
    onPaging
}