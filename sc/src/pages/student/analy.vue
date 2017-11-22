<template>
	<div class="StudentAnaly">
		<el-row class='header'>
			<el-col :span = "24">
				<el-tabs v-model="activeName" @tab-click="handleClick">
			    <el-tab-pane label="人数统计" name="first">
			    	<el-col :span="12">
			    		<div ref="main" style="width: 500px;height:400px;margin: 0 auto;"></div>
			    	</el-col>
			    	<el-col :span="12">
			    		<div ref="main1" style="width: 500px;height:400px;margin: 0 auto;"></div>
			    	</el-col>
			    	
			    </el-tab-pane>
			    <el-tab-pane label="性别统计" name="second">
			    	
			    </el-tab-pane>
			    <el-tab-pane label="成绩统计" name="third">
			    	
			    </el-tab-pane>
			  </el-tabs>
			</el-col>
			
		</el-row>
	</div>
	
</template>
<script>
	import {mapGetters,mapActions} from 'vuex';
	import echarts from 'echarts'

	export default({
		name: 'StudentAnaly',
		data(){
			return {
				activeName: ''
			}
		},
		computed: {
			...mapGetters(['studentsNum','studentsGender'])
		},
		created(){
			this.analyStudentNum();
			this.analyStudentGender();
			this.activeName = "first";
		},
		methods: {
			handleClick(tab,event){
				var vm = this;
				// 初始化echarts实例
				var myChart = echarts.init(this.$refs.main);
        var myChart1 = echarts.init(this.$refs.main1);
				// 指定图表的配置项和数据
        var option = {
            title: {
                text: '班级人数统计'
            },
            tooltip: {},
            legend: {
                data:['学生数量']
            },
            xAxis: {
                data: ['web1701','web1702','web1703','web1704','web1705']
            },
            yAxis: {},
            series: [{
                name: '学生数量',
                type: 'bar',
                data: vm.studentsNum
            }]
        };
        var option1 = {
        	title: {
              text: '性别比例'
          },
          tooltip: {
			        trigger: 'item',
			        formatter: "{a} <br/>{b} : {c} ({d}%)"
			    },
          series : [
			        {
			            name: '性别比例',
			            type: 'pie',
			            radius: '55%',
			            data: vm.studentsGender
			        }
			    ]
        }
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        myChart1.setOption(option1);
			},
			...mapActions(['analyStudentNum','analyStudentGender'])
		}
	});
</script>
<style>
	
</style>