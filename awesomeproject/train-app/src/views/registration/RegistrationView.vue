<template>
    <form @submit.prevent>
        <div class="rows">
        <h4>Регистрация</h4>
        <my-input class="input"
            v-model:value="newuser.username"
            type="text"
            placeholder="Имя пользователя"
        />
        <my-input class="input"
            v-model:value="newuser.fullname"
            type="text"
            placeholder="Полное имя"
        />
        <my-input class="input"
            v-model:value="newuser.email"
            type="text"
            placeholder="Email"
        />
        <my-input class="input"
            v-model:value="newuser.password1"
            type="password"
            placeholder="Пароль"
        />
        <my-input class="input"
            v-model:value="newuser.password2"
            type="password"
            placeholder="Повторите пароль"
        />    
        <my-button class="butt"
            @click="registerUser"
        >
        Зарегистрироваться
        </my-button>
        <my-button class="butt"
            @click="needLogIn"
        >
        Войти
        </my-button>
        <h2 v-if="isSuccess === false">
           Неправильные данные, поторите ввод 
        </h2>
    </div>
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
            newuser: {
                username:'',
                password1:'',
                password2:'',
                fullname:'',
                email:''
            }
        }
    },
    methods: {
        registerUser(){
            this.$emit('register', this.newuser)
        },
        needLogIn(){
            this.$emit('needlogin')
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
.rows{
    display: flex;
    flex-direction:column;
    align-items: center;
}
</style>