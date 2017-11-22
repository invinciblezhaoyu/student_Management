import axios from 'axios'
import Vue from 'vue'
Vue.use(axios)

axios.defaults.baseURL = 'http://localhost:3002';
export default{
	state: {
		courses: []
	},
	getters: {
		courses: state=>state.courses
	},
	mutations: {
		alterCourse(state,data){
			state.courses = data;
		}
	},
	actions: {
		findAllCourse(context,currentPage){
			axios.get('/course/findAll',{params:{page:currentPage}}).then(({data})=>{
				context.commit('alterCourse',data);
			}).catch((error)=>{

			});
		},
		updateCourse(context,form){
			return new Promise((resolve,reject)=>{
				axios.post('/course/update',form).then((data)=>{
					resolve(data);
				}).catch((error)=>{
					reject(error);
				});
			})
		},
		batchDeleteCourse(context,ids){
			return new Promise((resolve,reject)=>{
				axios.post('/course/batchDelete',{ids:ids}).then((data)=>{
					resolve(data);
				}).catch((error)=>{
					reject(error);
				});
			})
		},
		fuzzyQueryCourse(context,params){
			axios.get('/course/query',{params}).then(({data})=>{
				context.commit('alterCourse',data);
			}).catch((error)=>{

			});
		},
		saveCourse(context,form){
			return new Promise((resolve,reject)=>{
				axios.post('/course/save',form).then((data)=>{
					resolve(data);
				}).catch((error)=>{
					reject(error);
				});
			})
		}
		// batchInCourse(context,multiStudent){
		// 	return new Promise((resolve,reject)=>{
		// 		axios.post('/student/batchIn',{multiStudent}).then((data)=>{
		// 			resolve(data);
		// 		}).catch((error)=>{
		// 			reject(error);
		// 		});
		// 	});
		// },
		// analyCourseNum(context){
		// 	axios.get('/student/analyStudentNum').then(({data})=>{
		// 		context.commit('alterStudentNum',data);
		// 	}).catch((error)=>{

		// 	});
		// }
	}
}