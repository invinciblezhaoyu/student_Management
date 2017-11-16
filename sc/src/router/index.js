import Vue from 'vue'
import Router from 'vue-router'
import Student from '@/pages/student/index'
import StudentInfo from '@/pages/student/info'
import StudentAnaly from '@/pages/student/analy'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/student',
      component: Student,
      children: [{
      	path: 'info',
      	component:StudentInfo
      }]
    },
    {
      path: '/student',
      component: Student,
      children: [{
        path: 'analy',
        component:StudentAnaly
      }]
    }
  ]
})
