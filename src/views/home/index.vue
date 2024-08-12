<template>
<div style="background-color: #e3efd9;padding: 10px;">
	<el-page-header title="汇总表" :icon="HomeFilled"></el-page-header>
</div>
<div style="padding: 20px">
    <!-- 表单 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="起止日期">
            <el-date-picker
                v-model="formInline.date"
                value-format="YYYY-MM-DD HH:mm:ss"
                format="YYYY-MM-DD HH:mm:ss"
                type="datetimerange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
            />
      	</el-form-item>
		<el-form-item label="供应商名称">
			<el-select
				v-model="formInline.supplyCodeList"
				placeholder="供应商名称"
				clearable
				multiple
				filterable
				remote
				v-loading="loadingSelect"
				:remote-method="remoteMethod"
			>
				<el-option v-for="(i,index) in supplyLIst" :key="i.supply_code" :label="i.supply_name" :value="i.supply_code" />
			</el-select>
			<!-- <el-input v-model="formInline.supplyName" placeholder="供应商名称" clearable /> -->
		</el-form-item>
      	<!-- <el-form-item label="供应商代码">
        	<el-input v-model="formInline.supplyCode" placeholder="供应商代码" clearable />
      	</el-form-item> -->
      
      	<el-form-item>
			<el-button type="primary" @click="onSubmit">查询</el-button>
			<el-button type="primary" @click="onReset">重置</el-button>
			<el-button type="primary" @click="onExport" v-loading="loadingExport" :disabled="tableData.length == 0">导出</el-button>
			<!-- <el-button type="primary" @click="onExport2">导出2</el-button> -->
      	</el-form-item>
    </el-form>

    <!-- 表格 -->	
	<p style='color: #666; font-size: 12px;'>默认只加载当天数据</p>
    <el-table max-height="600px" v-loading="loadingValue" selection :data="tableData" style="width: 100%;margin-bottom: 10px;" border >
        <el-table-column  label="汇总" fixed>
			<!-- <el-table-column type="selection" width="40" /> -->
            <el-table-column type="index" label="序号" min-width="60">
				<template #default="scope">
					{{ scope.$index + 1 + ((page.currentPage -1) * page.pageSize) }}
				</template>
            </el-table-column>
            <el-table-column prop="supply_code" label="供应商代码" min-width="95">

            </el-table-column>
            <el-table-column prop="supply_name" label="供应商名称" min-width="190" show-overflow-tooltip>

            </el-table-column>
        </el-table-column>

        <el-table-column label="订单协调同">
            <el-table-column prop="count" label="已确认订单行数" min-width="90">

            </el-table-column> 
			<!-- 可点击单元格 -->
            <el-table-column prop="unsyncCount" label="已确认订单行量，未同步行数" min-width="150">
				<template #default="scope">
					<el-link target="_blank" type="primary" @click="handleClickOrder(scope.row)">{{ scope.row.unsyncCount }}</el-link>
				</template>
            </el-table-column>
            <el-table-column label="同步率" min-width="85">
				<template #default="scope">
					{{ ((1 - (scope.row.unsyncCount / scope.row.count))*100).toFixed(2)  + '%'}}
				</template>
            </el-table-column>
        </el-table-column>

        <el-table-column  label="生产协同">
            <el-table-column prop="count" label="已确认订单行数" min-width="90">

            </el-table-column>
			<!-- 可点击单元格 -->
            <el-table-column prop="shedulingCount" label="已确认订单行量，未排产行数（无入库数量）" min-width="170">
				<template #default="scope">
					<el-link target="_blank" type="primary" @click="handleClickProduction(scope.row)">{{ scope.row.shedulingCount }}</el-link>
				</template>
            </el-table-column>
            <el-table-column label="排产率" min-width="85">
				<template #default="scope">
					{{ ((1 - (scope.row.shedulingCount / scope.row.count))*100).toFixed(2)  + '%'}}
				</template>
            </el-table-column>
        </el-table-column>

        <el-table-column  label="库存协同">
            <el-table-column prop="houserCount" label="已同步库存行数" min-width="90">

            </el-table-column>
        </el-table-column>

        
    </el-table>
	
    <!-- 分页 -->
    <el-pagination
		style="margin-bottom: 20px;"
		v-model:current-page="page.currentPage"
		v-model:page-size="page.pageSize"
		:page-sizes="page.pageSizes"
		:disabled="page.disabled"
		:background="page.background"
		layout="total, sizes, prev, pager, next, jumper"
		:total="page.total"
		@size-change="handleSizeChange"
		@current-change="handleSizeChange"
    />
	<el-button type="primary" @click="onExport2" v-loading="loadingExport2" :disabled="tableData2.length == 0">导出</el-button>
	<p style='color: #666; font-size: 12px;'>默认只加载当天数据</p>
	<el-table max-height="600px" v-loading="loadingValue2" selection :data="tableData2" style="width: 100%;margin-bottom: 10px;" border>
		<el-table-column  label="汇总" fixed>
			<!-- <el-table-column type="selection" width="40" /> -->
            <el-table-column type="index" label="序号" min-width="60">
				<template #default="scope">
					{{ scope.$index + 1 + ((page.currentPage -1) * page.pageSize) }}
				</template>
            </el-table-column>
            <el-table-column prop="supply_code" label="供应商代码" min-width="95">

            </el-table-column>
            <el-table-column prop="supply_name" label="供应商名称" min-width="190" show-overflow-tooltip>

            </el-table-column>
        </el-table-column>
		<el-table-column  label="送货协同">
            <el-table-column prop="count" label="已确认送货单行数" min-width="90">

            </el-table-column>
			<!-- 可点击单元格 -->
            <el-table-column prop="unSyncCount" label="已确认送货单行量，未同步行数" min-width="150">
				<template #default="scope">
					<el-link type="primary" @click="handleClickDelivery(scope.row)">{{ scope.row.unSyncCount }}</el-link>
				</template>
            </el-table-column>
            <el-table-column label="同步率" min-width="85">
				<template #default="scope">
					{{ ((1 - (scope.row.unSyncCount / scope.row.count))*100).toFixed(2)  + '%'}}
				</template>
            </el-table-column>
        </el-table-column>
	</el-table>

	<el-pagination
		style="margin-bottom: 20px;"
		v-model:current-page="page2.currentPage"
		v-model:page-size="page2.pageSize"
		:page-sizes="page2.pageSizes"
		:disabled="page2.disabled"
		:background="page2.background"
		layout="total, sizes, prev, pager, next, jumper"
		:total="page2.total"
		@size-change="handleSizeChange2"
		@current-change="handleSizeChange2"
    />
</div>
</template>
  
<script setup name="Home">
	import { onMounted, ref } from 'vue'
	import {HomeFilled} from "@element-plus/icons-vue"
	/* 引入API */
	import { getTableApi,getTableApiB,getSupplyListApi,exportExcelTableApi,exportExcelTableBApi} from '@/api/home'
	/* 引入公共方法 */
	import { onResetValue,todayA,exportExcel } from '@/utils/common'
	import { ElMessage } from 'element-plus';
	/* 引入路由 */
	import { useRouter } from 'vue-router'
	const router = useRouter()
	/* 表单数据 */  /* ---------------------------------------- */
	const formInline = ref({
		supplyCode: '',
		supplyName: '',
		/* 时间默认是今天 00:00:00 到 今天 23:59:59 */
		supplyCodeList:[],
		date: [],
	})
	/* 供应商列表 */
	const loadingSelect = ref(false)
	const supplyLIst = ref([])
	const remoteMethod = async(query)=>{
		loadingSelect.value = true
		let res = await getSupplyListApi({
			supplyName:query
		})
		// console.log(res,123852);
		supplyLIst.value = res
		loadingSelect.value = false
	}
	/* 查询按钮 */
	const onSubmit = () => {
		sessionStorage.setItem('formInline',JSON.stringify(formInline.value))
		onGetTableData()
	}
	/* 重置按钮 */
	const onReset = () => {
		sessionStorage.removeItem("formInline")
		// 数据初始化
		const newData = onResetValue()
		formInline.value = {
			supplyCode: '',
			supplyName: '',
			/* 时间默认是今天 00:00:00 到 今天 23:59:59 */
			supplyCodeList:[],
			date: [],
		}
		page.value = newData.page
		page2.value = newData.page
		/* 获取今天  */
		const time = todayA()
		formInline.value.date = time
		/* 重新加载数据 */
		onGetTableData()
	}

	/* 表格数据 */ /* ----------------------------------------- */
	const tableData = ref([]) 
	const tableData2 = ref([]) 
	const loadingValue = ref(false)
	const loadingValue2 = ref(false)

	//单元格点击事件 订单	
	const handleClickOrder = (row)=>{
		/* /order */
		/* 路由跳转 */
		// router.push({
		// 	path:`/order/${row.supply_code}`,
		// 	query:{
		// 		supplyCode:row.supply_code,
		// 		supplyName:row.supply_name,
		// 		startDate:formInline.value.date[0],
		// 		endDate:formInline.value.date[1],
		// 	}
		// })
		const link = `/#/order/${row.supply_code}?supplyCode=${row.supply_code}&supplyName=${row.supply_name}&startDate=${formInline.value.date[0]}&endDate=${formInline.value.date[1]}`
		/* 新的页面跳转 */
		// console.log(link);
		const newTab = window.open('', '_blank');
      	newTab.location.href = link;
	}

	//单元格点击事件 生产	
	const handleClickProduction = (row)=>{
		/* /production */
		// router.push({
		// 	path:`/production/${row.supply_code}`,
		// 	query:{
		// 		supplyCode:row.supply_code,
		// 		supplyName:row.supply_name,
		// 		startDate:formInline.value.date[0],
		// 		endDate:formInline.value.date[1],
		// 	}
		// })
		const link = `/#/production/${row.supply_code}?supplyCode=${row.supply_code}&supplyName=${row.supply_name}&startDate=${formInline.value.date[0]}&endDate=${formInline.value.date[1]}`
		/* 新的页面跳转 */
		// console.log(link);
		const newTab = window.open('', '_blank');
      	newTab.location.href = link;
	}

	//单元格点击事件 送货	
	const handleClickDelivery = (row)=>{
		/* /delivery */
		// router.push({
		// 	path:`/delivery/${row.supply_code}`,
		// 	query:{
		// 		supplyCode:row.supply_code,
		// 		supplyName:row.supply_name,
		// 		startDate:formInline.value.date[0],
		// 		endDate:formInline.value.date[1],
		// 	}
		// })
		const link = `/#/delivery/${row.supply_code}?supplyCode=${row.supply_code}&supplyName=${row.supply_name}&startDate=${formInline.value.date[0]}&endDate=${formInline.value.date[1]}`
		/* 新的页面跳转 */
		// console.log(link);
		const newTab = window.open('', '_blank');
      	newTab.location.href = link;
	}

	/* 分页数据 */ /* -------------------------------- */
	const page = ref({
		currentPage: 1,
		pageSize: 10,
		total: 0,
		disabled:false,
		background:true,
		pageSizes:[10, 20, 30, 40, 50, 100],
	})
	const page2 = ref({
		currentPage: 1,
		pageSize: 10,
		total: 0,
		disabled:false,
		background:true,
		pageSizes:[10, 20, 30, 40, 50, 100],
	})
	/* 当前页数和当前展示条数改变时触发 */
	const handleSizeChange = async()=>{
		loadingValue.value = true
		// 获取表格数据
		const res = await onGetTableData1()
		tableData.value = res.records
		loadingValue.value = false
	}
	// const handleCurrentChange = async()=>{
	// 	loadingValue.value = true
	// 	// 获取表格数据
	// 	const res = await onGetTableData1()
	// 	tableData.value = res.records
	// 	loadingValue.value = false
	// }
	const handleSizeChange2 = async()=>{
		loadingValue2.value = true
		// 获取表格数据
		const res = await onGetTableData2()
		tableData2.value = res.records
		loadingValue2.value = false
	}
	// const handleCurrentChange2 = ()=>{
	
	// }
	/* 页面挂载 */ /* ------------------------------ */
	const onGetTableData = async ()=>{
		loadingValue.value = true
		loadingValue2.value = true
		// 获取表格数据
		//请求体
		Promise.allSettled([onGetTableData1(),onGetTableData2()])
		.then((res)=>{
			res[0].status == 'fulfilled' && (tableData.value = res[0].value.records)
			res[1].status == 'fulfilled' && (tableData2.value = res[1].value.records)
			// // 分页数据
			res[0].status == 'fulfilled' && (page.value.total = res[0].value.total)
			res[1].status == 'fulfilled' && (page2.value.total = res[1].value.total)
			loadingValue.value = false
			loadingValue2.value = false
			/* 提示 */
			res[0].status == 'fulfilled' && res[0].value.records.length == 0 && ElMessage({
				message: '暂无数据',
				type: 'warning',
			})
			res[1].status == 'fulfilled' && res[1].value.records.length == 0 && ElMessage({
				message: '暂无数据',
				type: 'warning',
			})
			/* 错误提示 */
			res[0].status == 'rejected' && ElMessage({
				message: res[0].reason.message,
				type: 'error',
			})
			res[1].status == 'rejected' && ElMessage({
				message: res[1].reason.message,
				type: 'error',
			})
		})
	}
	function onGetTableData1(){
		let bodyValue ={
			startDate:formInline.value.date[0],
			endDate:formInline.value.date[1],
			supplyCode:formInline.value.supplyCode,
			supplyName:formInline.value.supplyName,
			supplyCodeList:formInline.value.supplyCodeList,
			current:page.value.currentPage,
			pageSize:page.value.pageSize
		}
		return getTableApi(bodyValue)
	}
	function onGetTableData2(){
		let bodyValue2 ={
			startDate:formInline.value.date[0],
			endDate:formInline.value.date[1],
			supplyCode:formInline.value.supplyCode,
			supplyName:formInline.value.supplyName,
			supplyCodeList:formInline.value.supplyCodeList,
			current:page2.value.currentPage,
			pageSize:page2.value.pageSize
		}
		return getTableApiB(bodyValue2)
	}
	onMounted(async() => {
		/* 获取今天  */
		const time = todayA()
		formInline.value.date = time
		let sessionValue = JSON.parse(sessionStorage.getItem('formInline'))
		if(sessionValue){
			formInline.value = sessionValue
		}
		// 获取表格数据
		onGetTableData()
	})
	/* 导出 */
	const loadingExport = ref(false)
	const loadingExport2 = ref(false)
	const onExport = async()=>{
		let bodyValue ={
			startDate:formInline.value.date[0],
			endDate:formInline.value.date[1],
			supplyCode:formInline.value.supplyCode,
			supplyName:formInline.value.supplyName,
			supplyCodeList:formInline.value.supplyCodeList,
		}
		try {
			loadingExport.value = true
			let res = await exportExcelTableApi(bodyValue)
			/* 导出Excel表 */
			exportExcel(res)
			loadingExport.value = false
		} catch (error) {
			/* 提示 */
			ElMessage.error('导出出错了，请稍后重试')
			loadingExport.value = false
		}
	}
	/* 导出2 */
	const onExport2 = async()=>{
		let bodyValue ={
			startDate:formInline.value.date[0],
			endDate:formInline.value.date[1],
			supplyCode:formInline.value.supplyCode,
			supplyName:formInline.value.supplyName,
			supplyCodeList:formInline.value.supplyCodeList,
		}
		try {
			loadingExport2.value = true
			let res = await exportExcelTableBApi(bodyValue)
			/* 导出Excel表 */
			exportExcel(res)
			loadingExport2.value = false
		} catch (error) {
			/* 提示 */
			ElMessage.error('导出出错了，请稍后重试')
			loadingExport2.value = false
		}
	}
</script>
  
<script>
	export default {
		name:'Home'
	}
</script>

<style scoped>
	.demo-form-inline .el-input {
		--el-input-width: 220px;
	}

	.demo-form-inline .el-select {
		/* --el-select-width: 220px; */
		min-width: 220px;
		max-width: 350px;
	}
	::v-deep .el-table_1_column_1.el-table__cell{
		background-color: #ffff00 !important;
	}
	::v-deep .el-table_1_column_5.el-table__cell{
		background-color: #deeaf6 !important;
	}
	::v-deep .el-table_1_column_9.el-table__cell{
		background-color: #ffff00 !important;
	}
	::v-deep .el-table_1_column_13.el-table__cell{
		background-color: #dbdbdb !important;
	}
	::v-deep .el-table_2_column_15.el-table__cell{
		background-color: #ffff00 !important;
	}
	::v-deep .el-table_2_column_19.el-table__cell{
		background-color: #e3efd9 !important;
	}

</style>
  