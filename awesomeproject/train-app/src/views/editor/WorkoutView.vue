<template>
	<div class="row" id='workout'>
		<p> {{ response }} </p>
		<form onsubmit="return false;">

			<input-utility v-model="name"
			for-form="form-select"
			for-id="id_name"
			label-data="Название тренировки:"
			type-input="text"
			name-input="name"
			id-input="id_name"
			>

		</input-utility>

		<input-utility v-model="description"
		@update:model-value="description = $event"
		for-form="form-select"
		for-id="id_description"
		label-data="Описание:"
		type-input="text"
		name-input="description"
		id-input="id_description"
		>

	</input-utility>

	<input-utility v-model="date"
	@update:model-value="date = $event"
	for-form="form-select"
	for-id="id_data"
	label-data="Дата тренировки:"
	type-input="datetime-local"
	name-input="data"
	id-input="id_data"
	>

</input-utility>

<input hidden v-model="user" class="form-control" type="text" name="user" required id="id_user">
<input v-model="checkedForAll" class="form-check-input" type="checkbox" name="for_all" value="1" id="id_for_all" checked>
<strong>
	<label for="id_for_all"> Другие пользователи могут видеть эту тренировку</label>
</strong>
<br>
<br>
<input  @click="submitForm" id='createW' class='btn btn-primary' type="submit" value="Далее">
</form>
</div>
</template>

<script>
import InputUtility from '@/components/utilities/InputUtility.vue'
import { mapActions } from 'vuex'
import axios from 'axios'
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = "X-CSRFToken";
export default {
	name: 'WorkoutView',
	components: {
		InputUtility
	},
	data() {
		return {
			name: '',
			description: '',
			date: new Date(),
			checkedForAll: false,
			user: 1,
			response: '',
		}
	},
	methods: {
		...mapActions('editor', [
			'changeName1',
			'changeName2',
			'changeCurrentTab',
		]),
		async submitForm() {
			try {
				const response = await axios({
					method: "post",
					url: "/api/workout/",
					data: {
						'name': this.name, 
						'description': this.description,
						'data': this.date,
						'user': this.user,
						'for_all': this.checkedForAll
					},
					headers: {
						'Content-Type': 'application/json;charset=utf-8'
					}
				})
				this.changeCurrentTab('choose-view')
				this.changeName1(response.data.id)
				this.changeName2(response.data.id)
				//this.response = JSON.stringify(response, null, 2)
			} catch (error) {
				console.log(error)
				if (error.response.data['name']) {
					this.response = error.response.data['name']
					this.name = '';
				}
				this.response = "Провертьте заполненные поля"
			}

		}
	}
}
</script>