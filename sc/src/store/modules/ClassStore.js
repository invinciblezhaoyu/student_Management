import axios from 'axios'
import Vue from 'vue'
Vue.use(axios)

axios.defaults.baseURL = 'http://localhost:3002';
export default{
	state: {
		clazzes: []
	},
	getters: {
		clazzes: state=>state.clazzes
	},
	mutations: {
		alterClazz(state,data){
			state.clazzes = data;
		}
	},
	actions: {
		findAllClazz(context){
			axios.get('/clazz/findAll').then(({data})=>{
				context.commit('alterClazz',data);
			}).catch((error)=>{

			});
		},
		updateClazz(context,form){
			return new Promise((resolve,reject)=>{
				axios.post('/clazz/update',form).then((data)=>{
					resolve(data);
				}).catch((error)=>{
					reject(error);
				});
			})
		},
		batchDeleteClazz(context,ids){
			return new Promise((resolve,reject)=>{
				axios.post('/clazz/batchDelete',{ids:ids}).then((data)=>{
					resolve(data);
				}).catch((error)=>{
					reject(error);
				});
			})
		},
		fuzzyQueryClazz(context,params){
			axios.get('/clazz/query',{params}).then(({data})=>{
				context.commit('alterCourse',data);
			}).catch((error)=>{

			});
		},
		saveClazz(context,form){
			return new Promise((resolve,reject)=>{
				axios.post('/clazz/save',form).then((data)=>{
					resolve(data);
				}).catch((error)=>{
					reject(error);
				});
			})
		}
	}
}