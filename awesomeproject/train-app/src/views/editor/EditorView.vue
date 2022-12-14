<template>
    <div class="container" id="editor">
        <h2>Конструктор</h2>
        <component v-if = "isLoggedIn" :is="currentTab"></component>
        <login-view-vue v-else-if="isLoginVisible"
			@login="checkLoginAndPassword"
            @registration="showRegistration"
			v-model:is-success="isSuccessLogin"/>
        <registration-view-vue v-else-if="isRegistrationVisible"
			@register="registerUser"
            @needlogin="showLogIn"
			v-model:is-success="isSuccessRegistration"/>
    </div>
</template>

<script>
import ChooseView from './ChooseView.vue'
import WorkoutView from './WorkoutView.vue'
import LoginViewVue from '@/views/registration/LoginView.vue';
import RegistrationViewVue from '@/views/registration/RegistrationView.vue';
import { mapState } from 'vuex'
import axios from 'axios';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = "X-CSRFToken";
export default {
    name: 'EditorView',
    components: {
        ChooseView,
        WorkoutView,
        LoginViewVue,
        RegistrationViewVue
    },
    computed: {
        ...mapState({
            currentTab: state => state.editor.currentTab,
            isLoggedIn: state => state.editor.isLoggedIn
        })
    },
    data(){
	return {
        isSuccessRegistration: true,
        isSuccessLogin: true,
        isRegistrationVisible: false,
        isLoginVisible: true
    }
    },
    methods: {
    showRegistration(){
        this.isRegistrationVisible = true
        this.isLoginVisible = false
        this.isSuccessRegistration = true
    },
    showLogIn(){
        this.isLoginVisible = true
        this.isRegistrationVisible = false
        this.isSuccessLogin = true
    },
	async checkLoginAndPassword(user){
		try{
			const response = await axios({
										method: "post",
										url: "/accounts/loginuser",
										data: {
											'username': user.login,
											'password': user.password									
										},
										headers: {
											//'X-CSRFToken': csrftoken,
											'Content-Type': 'application/json;charset=utf-8'
										}
										});
			console.log(response.data)	
			this.isSuccessLogin = response.data[0];
            this.isLoggedIn = response.data[0];
		}
		catch(e){
			alert('Ошибка' + e)
		}
	},
	async registerUser(user){
		try{
			const response = await axios({
										method: "post",
										url: "/accounts/registrationuser",
										data: {
											'username': user.username,
											'password1': user.password1,
											'password2': user.password2,
											'fullname': user.fullname,
											'email': user.email												
										},
										headers: {
											//'X-CSRFToken': csrftoken,
											'Content-Type': 'application/json;charset=utf-8'
										}
										});
			console.log(response)	
			this.isSuccessRegistration = response.data[0];
		}
		catch(e){
			alert('Ошибка' + e)
		}
	}
}
}
</script>

<style scoped>
#editor {
    padding-top: 5%;
    padding-bottom: 40%;
}

</style>