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
            type="password"
            placeholder="Пароль"
        />
    </div>
    
        <my-button class="butt"
            @click="loginUser"
        >
        Войти
        </my-button>
        <my-button class="butt"
            @click="registration"
        >
        Зарегистрироваться
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
            default: true
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
        },
        registration(){
            this.$emit('registration')
        }
    }
}
</script>

<style scoped>
.butt{
    margin-top: 15px;
    margin: 10px;
}

.input{
    max-width: 50%;
}
</style>