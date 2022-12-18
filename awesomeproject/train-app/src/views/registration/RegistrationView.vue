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
            <my-button class="butt"
                @click="clickLogin">
                Войти
            </my-button>
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
import { mapState } from 'vuex'
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
    computed: {
        ...mapState({
            isLoggedIn: state => state.login.isLoggedIn
        })
    },
    mounted () {
        if (this.isLoggedIn) {
            this.$router.push({ name: 'home' });
        }
        this.changePosition('fixed')
    },
    unmounted () {
      this.changePosition('relative')
    },
    methods: {
        ...mapActions([
            'changePosition'
        ]),
        clickLogin () {
            this.$router.push({ name: 'login', 
                query: { redirect: this.$route.query.redirect || '' } });
        },
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
                if (this.isSuccess) {
                    alert('Вы успешно зарегистрированы, можете войти в аккаут')
                    this.clickLogin()
                }
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