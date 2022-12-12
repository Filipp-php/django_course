<template>
	<div class="card w-75 col-md-3">
		<div class="card-body">
			<h5 class="card-title">{{ title }}</h5>
			<p class="card-text">{{ desc }}</p>
			<router-link :to="url"><a class="btn btn-primary">{{ text_url }}</a></router-link>
		</div>
	</div>
</template>

<script>
export default {
	name: 'CardUtility',
	props: {
		title: String,
		desc: String,
		text_url: String,
		url: String,
	}
}
</script>