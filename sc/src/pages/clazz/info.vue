<template>
	<div class="ClassInfo">
		<el-row class="header">
			<el-col :span='6'>
				<el-input 
				v-model="keywords" 
				placeholder="请输入关键字"
				@change="fuzzyQuery"></el-input>
			</el-col>
			<el-col :span='18' class="saveOptions">
				<el-button plain @click="singleIn">单个录入</el-button>
				<input type="file" class="batchIn" @change="batchIn($event)">
				<el-button plain 
				class="upload-demo"
				type="primary">批量导入</el-button>
			</el-col>
		</el-row>
		<el-row>
			<el-col>
				<el-table
			      :data="clazzes"
			      style="width: 100%">
			      <el-table-column
			        prop="name"
			        label="课程名称">
			      </el-table-column>
			      <el-table-column label="操作" width="180">
				      <template slot-scope="scope">
				        <el-button
				          size="mini"
				          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
				        <el-button
				          size="mini"
					        type="danger" 
					        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
				      </template>
				    </el-table-column>
			    </el-table>
			    <el-pagination
			    	@current-change="getPage"
			    	:current-page="currentPage"
			    	class="takePage"
				    layout="prev, pager, next"
				    :total="total">
				  </el-pagination>
			</el-col>
		</el-row>
		<!-- 弹出框 -->
		<el-dialog :title="title" :visible.sync= 'dialogFormVisible' >
		  <el-form :model="form">
		    <el-form-item label="课程名称">
		      <el-input v-model="form.name" autofocus></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="cancel">取 消</el-button>
		    <el-button type="primary" @click="handleSubmit">确 定</el-button>
		  </div>
		</el-dialog>
	</div>
</template>
<script>
	import {mapGetters,mapActions} from 'vuex';
	import moment from 'moment';
	import XLSX from 'xlsx';
	export default{
		name:'CourseInfo',
		data(){
			return {
				title: '',
				keywords: '',
				dialogFormVisible: false,
				form: [],
				currentPage: 1,
				file: [],
				total:100
			}
		},
		computed: {
			...mapGetters(['clazzes'])
		},
		created(){
			this.findAllClazz(this.currentPage);
		},
		methods: {
      handleEdit(index,row){
      	this.form = row;
				this.title = "修改班级信息";
      	this.dialogFormVisible = true;
      },
      handleDelete(index,row) {
        this.$confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        	let ids = [row.id];
	      	this.batchDeleteClazz(ids).then((data)=>{
	      		this.findAllClazz(this.currentPage);
	      		this.$message({
	            type: 'success',
	            message: '操作成功!'
	          });	
	      	}).catch((error)=>{
	      		this.$message({
	            type: 'error',
	            message: '操作失败!'
	          });
	      	});
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });          
        });
      },
      handleSubmit(){
      	this.dialogFormVisible = false;
      	this.form.page = this.currentPage;
      	if(this.title == "新增课程信息"){
      		this.saveClazz(this.form).then((data)=>{
	      		this.findAllClazz(this.currentPage);
	      		this.$message({
	            type: 'success',
	            message: '操作成功!'
	          });
	      	}).catch((error)=>{
	      		this.$message({
	            type: 'error',
	            message: '操作失败!'
	          });
	      	});
      	}else{
      		this.updateClazz(this.form).then((data)=>{
	      		this.findAllClazz(this.currentPage);
	      		this.$message({
	            type: 'success',
	            message: '操作成功!'
	          });
	      	}).catch((error)=>{
	      		this.$message({
	            type: 'error',
	            message: '操作失败!'
	          });
	      	});
      	}
      },
      cancel(){
      	this.dialogFormVisible = false;
      	this.findAllClazz(this.currentPage);
      },
      getPage(currentPage){
      	this.currentPage = currentPage;
      	this.findAllClazz(this.currentPage);
      	if (this.currentPage == this.total/10) {
      		this.total += 50;
      	}else{
      		this.total = parseInt((this.currentPage + 10)/10)*100;
      	}
      },
      fuzzyQuery(){
      	this.currentPage = 1;
				var params = {keys:this.keywords,currentPage:this.currentPage};
      	this.fuzzyQueryClazz(params);
      },
      //导入
      singleIn(event){
      	this.form = {};
				this.title = "新增课程信息";
      	this.dialogFormVisible = true;
      },
      successMessage() {
        this.$message({
          message: '导入成功！',
          type: 'success'
        });
      },
    //   //批量导入
    //   batchIn(event){
    //   	var vm = this;
    //     if(!event.target.files[0]) {
    //        return;
    //     }
    //     var file = event.target.files[0];
    //     var reader = new FileReader();
    //     reader.onload = function(event) {
    //       var data = event.target.result;
    //       var wb = XLSX.read(data, {
    //           type: 'binary'
    //       });
    //       var multiStudent = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
    //       vm.batchInStudent(multiStudent);
    //       vm.successMessage();
    //       vm.findAllStudent(vm.currentPage);
    //     };
    //     reader.readAsBinaryString(file);
    //   },
			...mapActions([
				'findAllClazz',
				'updateClazz',
				'saveClazz',
				'fuzzyQueryClazz',
				'batchDeleteClazz'
			])
		}
	}
</script>

<style scoped>
	.saveOptions{
		text-align: right;
	}
	.StudentInfo .header{
		margin: 5px 0;
	}
	.takePage{
		margin-top: 20px;
		text-align: center;
	}
	.batchIn{
		width: 100px;
		height: 40px;
		position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    filter: alpha(opacity=0);
    cursor: pointer
	}
</style>