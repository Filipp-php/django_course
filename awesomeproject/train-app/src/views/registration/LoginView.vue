<template>
    <form @submit.prevent>
        <h4>Вход</h4>
        <my-input
            v-model:value="user.login"
            type="text"
            placeholder="Логин"
        />
        <my-input
            v-model:value="user.password"
            type="text"
            placeholder="Пароль"
        />
        <my-button
            @click="loginUser"
        >
        Войти
        </my-button>
        <h2 v-if="isSuccess === false">
           Неправильный логин или пароль 
        </h2>
    </form>
</template>

<script>
export default {
    props:{
        isSuccess: {
            type: Boolean,
            dafault: true
        }
    },
    data(){
        return {
            user: {
                login:'',
                password:''
            }
        }
    },
    methods: {
        loginUser(){
            this.user.login = '';
            this.user.password ='';
            this.$emit('login', this.user)
        }
    }
}
</script>

<style scoped>

</style>