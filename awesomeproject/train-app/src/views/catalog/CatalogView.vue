<template>
	<div class="container catalog">
		<form method="POST">
			<div class="input-group mb-3">
			  <input id ='search' @input="search" v-model="params" type="text" class="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1">
			  <button id='searchButton' class="btn btn-outline-secondary btn-secondary text-white" type="button" @click="search">Поиск &rArr;</button>
			</div>
		</form>
		<div v-for="workout of workouts" :key="workout.id" class ="row">
			
			<div class="card w-75 col-md-3" id='cardAr'>
			  <div class="card-body">
				<h5 class="card-title"> {{ workout.name }} </h5>
				<p class="card-text">{{ workout.description }} </p>
				<a href="{{ workout.get_absolute_url }}" class="btn btn-primary">Подробнее &raquo; </a>
			  </div>
			</div>

		</div>
	</div>
</template>

<script>
import axios from 'axios'
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = "X-CSRFToken";
export default {
    name: 'CatalogView',
    data() {
		return {
			workouts: [],
			params: '',
		}
	},

    mounted: function () {
    	this.search()
    },

    methods: {
    	async search() {
    		let response = await axios({
				method: "get",
				url: "api/workout/?name="+this.params,
				headers: {
					'Content-Type': 'application/json;charset=utf-8'
				}
  			})
			this.workouts = response.data
		}
    }
}
</script>

<style scoped>
#catalog {
    padding-top: 5%;
    
}
#cardAr {
	width: 50%;
  	margin: 0 auto;
	background-color: rgba(245, 245, 245, 0.3);
}
</style>