<!-- 送货 -->
<template>
<div style="background-color: #e3efd9;padding: 10px;">
	<el-page-header @back="router.go(-1)" title="返回" content="未同步送货表"></el-page-header>
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
      	<!-- <el-form-item label="供应商名称">
        	<el-input v-model="formInline.supplyName" placeholder="供应商名称" clearable />
      	</el-form-item>
      	<el-form-item label="供应商代码">
			<el-select
				v-model="formInline.supplyCode"
				placeholder="供应商代码"
				clearable
			>
				<el-option label="Zone one" value="shanghai" />
				<el-option label="Zone two" value="beijing" />
        	</el-select>
      	</el-form-item>
       -->
      	<el-form-item>
			<el-button type="primary" @click="onSubmit">查询</el-button>
			<el-button type="primary" @click="onReset">重置</el-button>
      	</el-form-item>
    </el-form>

    <!-- 表格 -->
    <el-table v-loading="loadingValue" :data="tableData" style="width: 100%;margin-bottom: 10px;" border >
        <el-table-column type="index" label="序号" width="60">
				<template #default="scope">
					{{ scope.$index + 1 + ((page.currentPage -1) * page.pageSize) }}
				</template>
        </el-table-column>

        <el-table-column label="供应商代码" prop="supply_code" /> 
        <el-table-column  label="供应商名称" prop="supply_name" />
        <!-- <el-table-column  label="采购订单号" prop="bill_no" /> -->
        <el-table-column  label="未同步送货单号" prop="bill_no" />
        <el-table-column  label="未同步确认时间" prop="confirmed_time" />
    </el-table>

    <!-- 分页 -->
    <el-pagination
		v-model:current-page="page.currentPage"
		v-model:page-size="page.pageSize"
		:page-sizes="page.pageSizes"
		:disabled="page.disabled"
		:background="page.background"
		layout="total, sizes, prev, pager, next, jumper"
		:total="page.total"
		@size-change="handleSizeChange"
		@current-change="handleCurrentChange"
    />
</div>
</template>
  
<script setup>
	import { ref , onMounted} from 'vue'
	/* 引入API */
	import {getDeliveryTable} from '@/api/home'
	import { onResetValue } from '@/utils/common'
	import { ElMessage } from 'element-plus';
	/* 获取路由参数 */
	import { useRoute ,useRouter} from 'vue-router';
	const route = useRoute()
	const router = useRouter()
	const { id } = route.params
	const objRow = route.query
	/* 表单数据 */
	const formInline = ref({
		supplyCode: '',
		supplyName: '',
		date: [],
	})
	/* 查询按钮 */
	const onSubmit = () => {
		console.log('submit!')
		onOrderTable()
	}
	/* 重置按钮 */
	const onReset = () => {
		// 数据初始化
		const newData = onResetValue()
		formInline.value.date = [objRow.startDate,objRow.endDate]
		page.value = newData.page
		/* 重新获取数据 */
		onOrderTable()
	}

	/* 表格数据 */
	const loadingValue = ref(false)
	const tableData = ref([])
	

	/* 分页数据 */
	const page = ref({
		currentPage: 1,
		pageSize: 10,
		total: 0,
		disabled:false,
		background:true,
		pageSizes:[10, 20, 30, 40, 50, 100],
	})
	/* 当前页数和当前展示条数改变时触发 */
	const handleSizeChange = ()=>{
		onOrderTable()
	}
	const handleCurrentChange = ()=>{
		onOrderTable()
	}

	/* 组件挂载 */
	async function onOrderTable(){
		let dataValue = {
			supplyCode:objRow.supplyCode,
			startDate:formInline.value.date[0],
			endDate:formInline.value.date[1],
			supplyName:objRow.supplyName,
			current:page.value.currentPage,
			pageSize:page.value.pageSize
		}
		loadingValue.value = true
		try {
			let res = await getDeliveryTable(dataValue)
			res.records && res.records.length ===0 && ElMessage({
				message: '暂无数据',
				type: 'warning',
			})
			tableData.value = res.records
			page.value.total = res.total
			loadingValue.value = false
		} catch (error) {
			ElMessage({
				message: '出错了，请重试',
				type: 'error',
			})
			loadingValue.value = false

		}
	}
	onMounted(()=>{
		formInline.value.date = [objRow.startDate,objRow.endDate]
		onOrderTable()
	})
</script>
  
<style>
	.demo-form-inline .el-input {
		--el-input-width: 220px;
	}

	.demo-form-inline .el-select {
		--el-select-width: 220px;
	}
</style>