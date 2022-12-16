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
            @click="registerUser">
            Зарегистрироваться
        </my-button>
        <nav>
            <router-link to="/login">Войти</router-link> 
        </nav>
        <h2 v-if="!isSuccess">
           Неправильные данные, поторите ввод 
        </h2>
    </div>
    </form>
</template>

<script>
import axios from 'axios';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = "X-CSRFToken";
import { mapActions } from 'vuex'
export default {
    data(){
        return {
            isSuccess: true,
            newuser: {
                username:'',
                password1:'',
                password2:'',
                fullname:'',
                email:''
            }
        }
    },
    mounted () {
        this.changePosition('fixed')
    },
    unmounted () {
      this.changePosition('relative')
    },
    methods: {
        ...mapActions([
            'changePosition'
        ]),
        async registerUser(user){
            try{
                const response = await axios({
                        method: "post",
                        url: "/accounts/registrationuser",
                        data: {
                            'username': this.newuser.username,
                            'password1': this.newuser.password1,
                            'password2': this.newuser.password2,
                            'fullname': this.newuser.fullname,
                            'email': this.newuser.email                                             
                        },
                        headers: {
                            //'X-CSRFToken': csrftoken,
                            'Content-Type': 'application/json;charset=utf-8'
                        }
                });
                console.log(response)   
                this.isSuccess = response.data[0];
            }
            catch(e){
                alert('Ошибка' + e)
            }
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