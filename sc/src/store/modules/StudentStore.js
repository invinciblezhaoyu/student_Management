import axios from 'axios'
import Vue from 'vue'
Vue.use(axios)

axios.defaults.baseURL = 'http://localhost:3002';
export default{
	state: {
		students: [],
		studentsNum: [],
		studentsGender: []
	},
	getters: {
		students: state=>state.students,
		studentsNum: state=>state.studentsNum,
		studentsGender: state=>state.studentsGender
	},
	mutations: {
		alterStudent(state,data){
			state.students = data;
		},
		alterStudentNum(state,data){
			var arr = [];
			for(let value of Object.values(data[0])){
				arr.push(value);
			}
			state.studentsNum = arr;
		},
		alterStudentGender(state,data){
			var arr = [
				{value:data[0].values1,name:"男"},
				{value:data[0].values2,name:"女"}
			];
			console.log(arr);
			state.studentsGender = arr;
		}
	},
	actions: {
		findAllStudent(context,currentPage){
			axios.get('/student/findAll',{params:{page:currentPage}}).then(({data})=>{
				context.commit('alterStudent',data);
			}).catch((error)=>{

			});
		},
		updateStudent(context,form){
			return new Promise((resolve,reject)=>{
				axios.post('/student/update',form).then((data)=>{
					resolve(data);
				}).catch((error)=>{
					reject(error);
				});
			})
		},
		batchDeleteStudent(context,ids){
			return new Promise((resolve,reject)=>{
				axios.post('/student/batchDelete',{ids:ids}).then((data)=>{
					resolve(data);
				}).catch((error)=>{
					reject(error);
				});
			})
		},
		fuzzyQueryStudent(context,params){
			axios.get('/student/query',{params}).then(({data})=>{
				context.commit('alterStudent',data);
				context.commit('alterClazz',data);
			}).catch((error)=>{

			});
		},
		saveStudent(context,form){
			return new Promise((resolve,reject)=>{
				axios.post('/student/save',form).then((data)=>{
					resolve(data);
				}).catch((error)=>{
					reject(error);
				});
			})
		},
		batchInStudent(context,multiStudent){
			return new Promise((resolve,reject)=>{
				axios.post('/student/batchIn',{multiStudent}).then((data)=>{
					resolve(data);
				}).catch((error)=>{
					reject(error);
				});
			});
		},
		analyStudentNum(context){
			axios.get('/student/analyStudentNum').then(({data})=>{
				context.commit('alterStudentNum',data);
			}).catch((error)=>{

			});
		},
		analyStudentGender(context){
			axios.get('/student/analyStudentGender').then(({data})=>{
				context.commit('alterStudentGender',data);
			}).catch((error)=>{

			});
		}
	}
}