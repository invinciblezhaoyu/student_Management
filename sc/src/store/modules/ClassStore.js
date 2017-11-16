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
		}
	}
}