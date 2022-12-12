<template>
    <div class="container" id="editor">
        <h2>Конструктор</h2>
        <component :is="currentTab"></component>
    </div>
</template>

<script>
import ChooseView from './ChooseView.vue'
import WorkoutView from './WorkoutView.vue'
import { mapState } from 'vuex'
export default {
    name: 'EditorView',
    components: {
        ChooseView,
        WorkoutView
    },
    computed: {
        ...mapState({
            currentTab: state => state.editor.currentTab
        })
    }
}
</script>

<style scoped>
#editor {
    padding-top: 5%;
    padding-bottom: 40%;
}

</style>