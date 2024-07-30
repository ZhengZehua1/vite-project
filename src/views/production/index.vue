<!-- 生产 -->
<template>
<div style="padding: 20px">
    <!-- 表单 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="起止日期">
            <el-date-picker
                v-model="formInline.date"
                value-format="YYYY-MM-DD"
                format="YYYY-MM-DD"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
            />
      	</el-form-item>
      	<el-form-item label="供应商名称">
        	<el-input v-model="formInline.user" placeholder="供应商名称" clearable />
      	</el-form-item>
      	<el-form-item label="供应商代码">
			<el-select
				v-model="formInline.region"
				placeholder="供应商代码"
				clearable
			>
				<el-option label="Zone one" value="shanghai" />
				<el-option label="Zone two" value="beijing" />
        	</el-select>
      	</el-form-item>
      
      	<el-form-item>
			<el-button type="primary" @click="onSubmit">查询</el-button>
			<el-button type="primary" @click="onReset">重置</el-button>
      	</el-form-item>
    </el-form>

    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%;margin-bottom: 10px;" border >
        <el-table-column type="index" label="序号" width="60">
				<template #default="scope">
					{{ scope.$index + 1 + ((page.currentPage -1) * page.pageSize) }}
				</template>
        </el-table-column>

        <el-table-column label="供应商代码">
           
        </el-table-column>

        <el-table-column  label="供应商名称">
            
        </el-table-column>

        <el-table-column  label="未同步采购订单号">
           
        </el-table-column>

        <el-table-column  label="生产订单号">
           
        </el-table-column>
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
	import { ref } from 'vue'
	/* 引入API */


	/* 表单数据 */
	const formInline = ref({
		user: '',
		region: '',
		date: [],
	})
	/* 查询按钮 */
	const onSubmit = () => {
		console.log('submit!')
	}
	/* 重置按钮 */
	const onReset = () => {
		console.log('reset!')
	}

	/* 表格数据 */
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

	}
	const handleCurrentChange = ()=>{

	}
</script>
  
<style>
	.demo-form-inline .el-input {
		--el-input-width: 220px;
	}

	.demo-form-inline .el-select {
		--el-select-width: 220px;
	}
</style>