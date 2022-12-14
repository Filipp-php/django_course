<template>
    <form @submit.prevent>
        <h4>Вход</h4>
        <div>
        <my-input class="input"
            v-model:value="user.login"
            type="text"
            placeholder="Логин"
        /></div>
        <div>
        <my-input class="input"
            v-model:value="user.password"
            type="text"
            placeholder="Пароль"
        />
    </div>
    
        <my-button class="butt"
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
            this.$emit('login', this.user)
        }
    }
}
</script>

<style scoped>
.butt{
    margin-top: 15px;
}

.input{
    max-width: 50%;
}
</style>