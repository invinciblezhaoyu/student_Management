<template>
  <div id="app">
    <header>
      <el-row>
        <el-col :span="4" class="title">
          <i class="el-icon-edit"></i>&nbsp;选课系统
        </el-col>
        <el-col :span="20"></el-col>
      </el-row>
    </header>
    <article>
      <el-row>
        <el-col :span="4" class="navLeft">
          <el-menu
            router
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-submenu index="/student">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>学生管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/student/info">档案</el-menu-item>
                <el-menu-item index="/student/analy">统计</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="/course">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>课程管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/course/info">信息</el-menu-item>
                <el-menu-item index="/course/test">test</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="/clazz">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>班级管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/clazz/info">信息</el-menu-item>
                <el-menu-item index="/clazz/test">test</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
        <el-col :span="20" class="container">
          <router-view>
            
          </router-view>
        </el-col>
      </el-row>
    </article>
  </div>
</template>

<script>

  export default {
    name: 'app'
    // routerValue: true
  }
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
header{
  background: #1f2d3d;
  font-size: 20px;
  color: white; 
}
header .title{
  line-height: 58px;
  text-align: center;
}
.navLeft{
  height: 610px;
  background: rgb(84,92,100);
}
.container{
  padding: 10px;
}
</style>
