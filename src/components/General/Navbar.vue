<template>
    <nav >
        <v-navigation-drawer  
        v-model="drawer" dark app 
        :permanent="!$vuetify.breakpoint.mdAndUp"
        :temporary="$vuetify.breakpoint.smAndDown"
        :expand-on-hover="!navBarPinned" 
        :mini-variant.sync="mini"
        clipped 
        color = "primary">
            <v-list  >

                <v-list-item link class="px-2"
                :to =" '/user/'+objeUser+'/userDetail/'+idUser"  >
                    <v-list-item-avatar>
                        <v-img src="https://media-exp1.licdn.com/dms/image/C4D03AQEJCS1rboiTug/profile-displayphoto-shrink_800_800/0/1632367456836?e=1649289600&v=beta&t=kND8G24AjDF0wSR01ch9CXKonTEewh0ZoTSLQgxf2fk"></v-img>
                    </v-list-item-avatar>
                  
                    <v-list-item-content>
                        <v-list-item-title class="text-h6">
                        {{username}}
                        </v-list-item-title>
                        <v-list-item-subtitle>{{email}}</v-list-item-subtitle>

                    </v-list-item-content>
                </v-list-item>

                  <v-divider></v-divider>
                

                <v-list-item v-for="link in links"  
                :key="link.id" 
                router 
                :to =" '/'+link.view ? (link.view == 'general' ? '/'+link.view+'/'+link.id : '/'+link.view ) : '/'+routeDefalt "
                active-class="border">
                    <v-list-item-action>
                        <v-icon >{{link.icon}}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content >
                        <v-list-item-title >{{link.name}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>

            
            <template v-slot:append>

              <v-divider></v-divider>
              <div  class="pa-2">
                    <v-btn class="primary--text" color = "white" to ="/system"   v-if="!mini" block>
                        <v-icon >settings</v-icon>
                        System
                    </v-btn>
                    <v-btn color = "white"  to ="/system"  class="primary--text pa-0"   ico v-else block small>
                        <v-icon >settings</v-icon>
                    </v-btn>
                </div>
              
              <v-divider></v-divider>
                <div  class="pa-2">
                    <v-btn class="primary--text" color = "white" @click = "logout" :loading="loading"  v-if="!mini" block>
                        Logout
                    </v-btn>
                    <v-btn color = "white"  @click = "logout" class="primary--text pa-0" :loading="loading"  ico v-else block small>
                        <v-icon >logout</v-icon>
                    </v-btn>
                </div>
            </template>
            

      </v-navigation-drawer>
   </nav>
</template>

<script>

import axios from "axios";
import {mapMutations} from "vuex";
import i18n from '../../i18n';

//import mixins
import {apiMixins} from '@/mixins/apiMixins.js'

export default {
   data: () => ({ 
      drawer: true,
      navBarPinned: false,
      routeDefalt: 'home',
      mini: true,
      links :[],

      //id user
      idUser : "",
      objeUser : "",

      //Data for view loading btn logout
      loading: false,
      msgLoading : "",

    }),
  mounted(){

    this.idUser = localStorage.getItem('id');
    this.objeUser = "1";

    //Get objects Navbar
    //let dataObjects = await this.getObjects();

    let permisions = this.$store.state.objectsPermissions;
    
    permisions.forEach(ele => {
      ele.category_object.forEach(obj => {
        if(obj.visible == 1)
          this.links.push(obj)
      })

    });
  },
  computed : {
      username(){
        return localStorage.getItem('username')
      },
      email(){
          return localStorage.getItem('email')
      }
  },
  methods:{
    ...mapMutations(['mostrarLoading','ocultarLoading',]),
    async logout(){
        var payload = {
          user: localStorage.getItem('id')
        };
        this.msgLoading = i18n.t('msgLoading.logoutSystem');
        this.mostrarLoading({ titulo : this.msgLoading});
        this.loading = true;
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        await this.axios.post('/logout/',payload)
        .then( response =>{
          //console.log(response.data);
          localStorage.removeItem('token');
          localStorage.removeItem('username' );
          localStorage.removeItem('last_name' );
          localStorage.removeItem('email' );
          this.$store.dispatch("logout" );
          this.$store.dispatch("getObjectsPermissions", [] );
          this.loading = false;
          this.$router.push('/');
        })
        .catch(error=>{
          var data = error.response.data;
          this.loading = false;
          //console.log(data);
        })
        .finally(
          this.ocultarLoading()
        )

    },

  },
  mixins: [apiMixins]
}



</script>

<style scoped>
.border {
  border-left: 4px solid #2c3e50;
}
