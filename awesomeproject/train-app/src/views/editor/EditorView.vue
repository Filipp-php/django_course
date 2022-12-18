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
import { mapActions } from 'vuex'
export default {
    name: 'EditorView',
    components: {
        ChooseView,
        WorkoutView
    },
    mounted () {
        if (!this.isLoggedIn) {
            this.$router.push({ name: 'login', query: { redirect: '/editor' } });
        }
        this.changePosition('fixed')
    },
    unmounted () {
      this.changePosition('relative')
    },
    methods: {
        ...mapActions([
            'changePosition'
        ])
    },
    computed: {
        ...mapState({
            isLoggedIn: state => state.login.isLoggedIn,
            currentTab: state => state.editor.currentTab,
            currentStyle: state => state.currentStyle
        })
    }
}
</script>
