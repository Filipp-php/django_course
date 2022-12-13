<template>
	<div class="container">
		<form method="POST">
			<div class="input-group mb-3">
			  <input id='search' v-model="params" @input="search" type="text" class="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1">
			  <button id = 'searchButton' class="btn btn-outline-secondary btn-secondary text-white" type="button" @click="search">Поиск &rArr;</button>
			</div>
		</form>
		
		<div v-for="complex of complexes" :key="complex.id" class="card w-75 col-md-3" id="cardAr">
		  <div class="row g-0">
			<div class="col-md-4">
			  <img :src="complex.photo" class="img-fluid rounded-start">
			</div>
			<div class="col-md-8">
			  <div class="card-body">
				<h5 class="card-title">{{ complex.name }}</h5>
				<p class="card-text">{{ complex.information }}</p>
				<router-link :to="complex.url"><a class="btn btn-primary">Подробнее &raquo; </a></router-link>
			  </div>
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
    name: 'ComplexesView',
    data() {
		return {
			complexes: {},
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
				url: "api/complex/?name="+this.params,
				headers: {
					'Content-Type': 'application/json;charset=utf-8'
				}
  			})
			this.complexes = response.data
			for (let i = 0; i < this.complexes.length; i++){
				this.complexes[i].url = "/complex/" + this.complexes[i].id
			}
		}
    }
}
</script>

<style scoped>
#cardAr {
	width: 50%;
  	margin: 0 auto;
	background-color: rgba(245, 245, 245, 0.3);
}
</style>