
<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row  >
                    <v-col cols="12" md="8" >
                      <v-card-text class="mt-12">
                        <h1
                          class="text-center display-2 teal--text " color = "primary"
                        >{{ $t('loginPage.welcome') }}</h1>
                        
                        <h4 class="text-center mt-4">{{ $t('loginPage.msgEmailEnsure') }}</h4>
                        <v-form @submit="login" lazy-validation ref="form" v-model="valid">
                          <v-text-field
                            v-model = "username"
                            label="Email"
                            name="Email"
                            prepend-icon="email"
                            type="text"
                            color="secondary"
                            required
                            :rules="[v => !!v || 'Item is required']"
                          />

                          <v-text-field
                           v-model = "password"
                            id="password"
                            label="Password"
                            name="password"
                            prepend-icon="lock"
                            type="password"
                            color="secondary"
                            required
                            :rules="[v => !!v || 'Item is required']"
                          />
                          <transition name="slide-fade">
                            <v-alert
                              dense
                              v-if="showAlertLogin"
                              outlined
                              transition="scale-transition"
                              type="error"
                            >
                              {{ $t('loginPage.msgErrorLogin')}}
                            </v-alert>
                          </transition>

                          <h3 class="text-center mt-4">{{ $t('loginPage.ForgotPass') }} </h3>

                          <div class="text-center mt-3">
                            <!-- btn login -->
                            <v-btn rounded  color="primary" class = "btn_person_login"  :disabled="!valid" :loading="loading"   @click="login"  dark>{{ $t('loginPage.signLogin') }}</v-btn>
                          </div>
                        </v-form>
                      </v-card-text>
                     
                    </v-col>
                    <v-col cols="12" md="4" class="primary" >
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">{{ $t('loginPage.titleWelcome') }}</h1>
                        <h5
                          class="text-center"
                        > {{ $t('loginPage.msgWelcome') }}</h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step++">{{ $t('loginPage.signUp') }}</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row class="fill-height">
                    <v-col cols="12" md="4" class="primary">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">{{ $t('registerPage.welcome') }}</h1>
                        <h5
                          class="text-center"
                        >{{ $t('registerPage.msgWelcome') }}</h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step--">{{ $t('registerPage.welcome') }}</v-btn>
                      </div>
                    </v-col>

                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1 class="text-center display-2 teal--text" color = "primary">Create Account</h1>
                      
                        <h4 class="text-center mt-4">{{ $t('registerPage.msgWelcome') }}</h4>
                        <v-form>
                          <v-text-field
                            label="Name"
                            name="Name"
                            prepend-icon="person"
                            type="text"
                            color="secondary"
                          />
                          <v-text-field
                            label="Email"
                            name="Email"
                            prepend-icon="email"
                            type="text"
                            color="secondary"
                          />

                          <v-text-field
                            id="password"
                            label="Password"
                            name="password"
                            prepend-icon="lock"
                            type="password"
                            color="secondary"
                          />
                        </v-form>
                        

                      </v-card-text>

                      <div class="text-center mt-n5">
                        <v-btn rounded color="primary" class = "btn_person_login" @click="login"  dark>{{ $t('registerPage.signUp') }}</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>



<script>
import axios from "axios";
import {mapMutations} from "vuex";
import i18n from '../i18n';
 
  export default {
  data: () => ({
    step: 1,
    valid: true,
    username: '',
    password: '',
    
    // Data for message error Login
    msgError : "Error",
    showAlertLogin : false,
    loading: false,
    msgLoading : "",

  }),
  props: {
    source: String
  },
  methods: {
    ...mapMutations(['mostrarLoading','ocultarLoading',]),
    validate () {
        this.$refs.form.validate()
      },
    async login(){
        var payload = {
          username: this.username,
          password: this.password
        };
        this.msgLoading = i18n.t('msgLoading.loginSystem');
        this.mostrarLoading({ titulo : this.msgLoading  });
        this.loading = true;
        await new Promise(resolve => setTimeout(resolve, 1000))
        await this.axios.post('/login/', payload )
        .then( response =>{
          localStorage.setItem('token', response.data.token );
          localStorage.setItem('refresh_token', response.data.refresh_token );
          localStorage.setItem('username', response.data.user.username );
          localStorage.setItem('last_name', response.data.user.last_name );
          localStorage.setItem('email', response.data.user.email );
          localStorage.setItem('id', response.data.user.id );
          axios.defaults.headers.common['Authorization'] = 'Bearer '+response.data.token;
          this.$store.dispatch("login", response.data.user.username );
          this.loading = false;
          this.$router.push('/home');
          
        })
        .catch(error=>{
          var data = error.response;
          debugger
          //Valid response login backend
          if( error.response?.data?.error == "LOGIN_ERROR" ){
            this.showAlertLogin = true;
            this.finallyMsgError();
            
          }else{
            this.showAlertLogin = true;
            this.finallyMsgError();
            console.log('Error general');
          }
          console.log(data);
        })
        .finally(
           this.ocultarLoading()
        )

    },
    finallyMsgError(){
      setTimeout(()=>{
              this.showAlertLogin= !this.showAlertLogin
              this.loading = false;
            },4000)
    }

  }
};
</script>

<style scoped>

  .btn_person_login {
      margin-bottom: 15px !important;
  }

  .slide-fade-enter-active {
    transition: all .2s ease;
  }
  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }

  .theme--dark.v-btn.v-btn--disabled.v-btn--has-bg {
    background-color: rgba(0,0,0,.12) !important;
  }

</style>
