<template>
    <form @submit.prevent>
        <h4>Вход</h4>
        <div>
            <my-input class="input"
                v-model:value="user.login"
                type="text"
                placeholder="Логин"
            />
        </div>
        <div>
            <my-input class="input"
                v-model:value="user.password"
                type="password"
                placeholder="Пароль"
            />
        </div>
    
        <my-button class="butt"
            @click="login">
        Войти
        </my-button>
        <nav>
            <my-button class="butt"
                 @click="clickRegister">
                Зарегистрироваться
            </my-button>
        </nav>
        <h2 v-if="!isSuccess">
           Неправильный логин или пароль 
        </h2>
    </form>
</template>

<script>
import { mapState } from 'vuex'
import { mapActions } from 'vuex'
import axios from 'axios';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = "X-CSRFToken";
export default {
    data(){
        return {
            isSuccess: true,
            user: {
                login:'',
                password:''
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
        ...mapActions('login', [
            'changeLoggedIn'
        ]),
        ...mapActions([
            'changePosition'
        ]),
        clickRegister () {
            this.$router.push({ name: 'register', 
                query: { redirect: this.$route.query.redirect || '' } });
        },
        async login () {
            try{
                const response = await axios({
                    method: "post",
                    url: "/accounts/loginuser",
                    data: {
                        'username': this.user.login,
                        'password': this.user.password                                   
                    },
                    headers: {
                        //'X-CSRFToken': csrftoken,
                        'Content-Type': 'application/json;charset=utf-8'
                    }
                });
                console.log(response.data)  
                this.isSuccess = response.data[0];
                this.changeLoggedIn(response.data[0]);
                if (this.isSuccess) {
                    this.$router.push(this.$route.query.redirect || '/')
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
    margin: 10px;
}

.input{
    max-width: 50%;
}
</style>