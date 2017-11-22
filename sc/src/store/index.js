import Vuex from 'vuex'
import Vue from 'vue'
import StudentStore from './modules/StudentStore'
import ClassStore from './modules/ClassStore'
import CourseStore from './modules/CourseStore'

Vue.use(Vuex);

export default new Vuex.Store({
	modules:{
		StudentStore,
		ClassStore,
		CourseStore
	}
});