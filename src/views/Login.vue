<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row  justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row  >
                    <v-col cols="12" md="8" >
                      <v-card-text class="mt-12">
                        <h1
                          class="text-center display-2 color-text-login"
                        >{{ $t('loginPage.welcome') }}</h1>
                        
                        <h4 class="text-center mt-4 color-text-login">{{ $t('loginPage.msgEmailEnsure') }}</h4>
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

                          <h3 class="text-center mt-4 color-text-login">{{ $t('loginPage.ForgotPass') }} </h3>

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
import {apiMixins} from '@/mixins/apiMixins.js'
 
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
        
        let response = await this.AuthenticateUser(payload);
        if(response.code == 'OK'){
          axios.defaults.headers.common['Authorization'] = 'Bearer '+response.data.token;
          this.$store.dispatch("login", response.data.user );

          //get property permissons objects
          let responseObjects = await this.getObjectsPermissions();
          
          if(responseObjects.code == 'OK'){
              //set objects permision store in vuex
              this.$store.dispatch("setObjectsPermissions", responseObjects.data.data );
          }

          this.loading = false;
          this.$router.push('/home');
        }else{
          this.showAlertLogin = true;
          this.finallyMsgError();
          console.log('Error general');
        }

        //Finish
        this.ocultarLoading();

    },
    finallyMsgError(){
      setTimeout(()=>{
              this.showAlertLogin= !this.showAlertLogin
              this.loading = false;
            },4000)
    }

  },
  mixins: [apiMixins]
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

  .color-text-login{
    color: var(--v-primary-base);
  }

</style>

<style>

  .v-label{
      font-family: Roboto !important;
      font-size: 17px !important;
      font-weight: 400 !important;
      line-height: 20px !important;
      color: var(--v-textInput-base) !important;
  }

</style>
