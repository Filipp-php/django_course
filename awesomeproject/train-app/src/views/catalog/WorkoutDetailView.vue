<template>
	<div class = container>
		<h4> {{ workout.name }} </h4>
		<h5>Описание: {{ workout.description }}</h5>
		<h5>Запланирована на {{ workout.data }} </h5>
	</div>

	<div class = container>
		<p>Упражнения:</p>
		<ul class="list-group">
		<li class="list-group-item list-group-item-success" v-for="ex of exs" :key="ex.id">
			{{ ex.exercise.name }}
		</li>
		</ul>
	</div>
		
	<div class = container>
		<p>Комплексы:</p>
		<ul class="list-group">
		<li class="list-group-item list-group-item-success" v-for="cm of cms" :key="cm.id">
			{{ cm.crf_cmplx.name }}
		</li>
		</ul>
	</div>
</template>

<script>
import axios from 'axios'
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = "X-CSRFToken";
export default {
    name: 'WorkoutDetailView',
    props: {
    	pk: String,
    },
    data() {
		return {
			workout: {},
			exs: [],
			cms: []
		}
	},

    mounted: function () {
    	this.search_ex()
    	this.search_cm()
    	this.search_wrkt()
    },

    methods: {
    	async search_wrkt() {
    		let response = await axios({
				method: "get",
				url: "api/workout/?id="+this.pk,
				headers: {
					'Content-Type': 'application/json;charset=utf-8'
				}
  			})
			this.workout = response.data[0]
		},

    	async search_ex() {
    		let response = await axios({
				method: "get",
				url: "api/base/?name="+this.pk,
				headers: {
					'Content-Type': 'application/json;charset=utf-8'
				}
  			})
			this.exs = response.data
		},
		async search_cm() {
    		let response = await axios({
				method: "get",
				url: "api/crossf/?name="+this.pk,
				headers: {
					'Content-Type': 'application/json;charset=utf-8'
				}
  			})
			this.cms = response.data
		}
    }
}
</script>

<style scoped>

</style>