<template>
	<div class="card mb-3">
		<h5 :for="forForm" class="form-label">
			<strong>
				<label :for="forId">{{ labelData }}</label>
			</strong>
		</h5>
		<input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" 
		class="form-control" :type="typeInput" :name="nameInput" required :id="idInput">
	</div>
</template>

<script>
export default {
	name: "InputUtility",
	props: {
		modelValue: String,
		forForm: String,
		forId: String,
		labelData: String,
		typeInput: String,
		nameInput: String,
		idInput: String
	},
	emits: ['update:modelValue'],
}
</script>