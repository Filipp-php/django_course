<template>
	<div class="container details" >
		<img :src="exercise.photo" class="img-fluid rounded-start">
		<p>{{ exercise.name }}</p>
		<p>{{ exercise.information }}</p>
	</div>
</template>

<script>
import axios from 'axios'
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = "X-CSRFToken";
export default {
    name: 'ExerciseDetailView',
    props: {
    	pk: String,
    },
    data() {
		return {
			exercise: {}
		}
	},

    mounted: function () {
    	this.search_ex()
    },

    methods: {
    	async search_ex() {
    		let response = await axios({
				method: "get",
				url: "api/exercise/?id="+this.pk,
				headers: {
					'Content-Type': 'application/json;charset=utf-8'
				}
  			})
			this.exercise = response.data[0]
		}
    }
}
</script>

<style scoped>
.details {
    padding-top: 5%;
    padding-bottom: 40%;
}
</style>