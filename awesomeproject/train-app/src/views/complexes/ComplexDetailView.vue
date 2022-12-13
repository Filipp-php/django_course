<template>
	<div class="container details">
		<img :src="complex.photo" class="img-fluid rounded-start">
		<p>{{ complex.name }}</p>
		<p>{{ complex.information }}</p>
	</div>
</template>

<script>
import axios from 'axios'
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = "X-CSRFToken";
export default {
    name: 'ComplexDetailView',
    props: {
    	pk: String,
    },
    data() {
		return {
			complex: {}
		}
	},

    mounted: function () {
    	this.search_ex()
    },

    methods: {
    	async search_ex() {
    		let response = await axios({
				method: "get",
				url: "api/complex/?id="+this.pk,
				headers: {
					'Content-Type': 'application/json;charset=utf-8'
				}
  			})
			this.complex = response.data[0]
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