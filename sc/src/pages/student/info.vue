<template>
	<div class="StudentInfo">
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
			      :data="students"
			      style="width: 100%">
			      <el-table-column
			        prop="name"
			        label="姓名">
			      </el-table-column>
			      <el-table-column
			        prop="gender"
			        label="性别">
			      </el-table-column>
			      <el-table-column
			        prop="birth"
			        label="出生日期" 
			        :formatter="dateFormat">
			      </el-table-column>
			      <el-table-column
			        prop="class.name"
			        label="班级">
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
		    <el-form-item label="姓名">
		      <el-input v-model="form.name" autofocus></el-input>
		    </el-form-item>
		    <el-form-item label="密码" v-if='show'>
		      <el-input v-model="form.password"></el-input>
		    </el-form-item>
		    <el-form-item label="性别">
		    	<el-radio v-model="form.gender" label="男">男</el-radio>
  				<el-radio v-model="form.gender" label="女">女</el-radio>
		    </el-form-item>
		    <el-form-item label="出生日期">
		    	<el-date-picker
			      v-model="form.birth"
			      type="date"
			      placeholder="选择日期">
    			</el-date-picker>
		    </el-form-item>
		    <el-form-item label="班级">
		      <el-select v-model="form.class_id" placeholder="请选择班级">
		        <el-option v-for="item in clazzes" :label="item.name" :value="item.id"></el-option>
		      </el-select>
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
		name:'StudentInfo',
		data(){
			return {
				title: '',
				keywords: '',
				dialogFormVisible: false,
				form: [],
				currentPage: 1,
				file: [],
				total:100,
				show: false
			}
		},
		computed: {
			...mapGetters(['students','clazzes'])
		},
		created(){
			this.findAllStudent(this.currentPage);
			this.findAllClazz();
		},
		methods: {
			dateFormat:function(row, column) {  
        var date = row[column.property];
        if (date == undefined) {
          return "";
        }
        return moment(date).format("YYYY-MM-DD");  
      },
      handleEdit(index,row){
      	this.form = row;
				this.title = "修改学生信息";
      	this.dialogFormVisible = true;
      },
      handleDelete(index,row) {
        this.$confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        	let ids = [row.id];
	      	this.batchDeleteStudent(ids).then((data)=>{
	      		this.findAllStudent(this.currentPage);
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
      	if(this.title == "新增学生信息"){
      		this.saveStudent(this.form).then((data)=>{
	      		this.findAllStudent(this.currentPage);
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
      		this.updateStudent(this.form).then((data)=>{
	      		this.findAllStudent(this.currentPage);
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
      	this.findAllStudent(this.currentPage);
      },
      getPage(currentPage){
      	this.currentPage = currentPage;
      	this.findAllStudent(this.currentPage);
      	if (this.currentPage == this.total/10) {
      		this.total += 50;
      	}else{
      		this.total = parseInt((this.currentPage + 10)/10)*100;
      	}
      },
      fuzzyQuery(){
      	this.currentPage = 1;
				var params = {keys:this.keywords,currentPage:this.currentPage};
      	this.fuzzyQueryStudent(params);
      },
      //导入
      singleIn(event){
      	this.form = {gender:"男"};
				this.title = "新增学生信息";
				this.show = true;
      	this.dialogFormVisible = true;
      },
      successMessage() {
        this.$message({
          message: '导入成功！',
          type: 'success'
        });
      },
      //批量导入
      batchIn(event){
      	var vm = this;
        if(!event.target.files[0]) {
           return;
        }
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.onload = function(event) {
          var data = event.target.result;
          var wb = XLSX.read(data, {
              type: 'binary'
          });
          var multiStudent = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
          vm.batchInStudent(multiStudent);
          vm.successMessage();
          vm.findAllStudent(vm.currentPage);
        };
        reader.readAsBinaryString(file);
      },
			...mapActions([
				'findAllStudent',
				'findAllClazz',
				'updateStudent',
				'batchDeleteStudent',
				'fuzzyQueryStudent',
				'saveStudent',
				'batchInStudent'
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