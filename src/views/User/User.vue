<template>
<v-app>
  <Navbar />
  <v-container>
     <v-toolbar
      
      class="toolbar-margin-person"
      elevation="1"
      color = "headerTable"
      height = 140>  

       <v-toolbar-title>
          <v-avatar
            class="profile mt-5"
            color="grey"
            size="140"
          >
            <v-img src="https://media-exp1.licdn.com/dms/image/C4D03AQEJCS1rboiTug/profile-displayphoto-shrink_800_800/0/1632367456836?e=1649289600&v=beta&t=kND8G24AjDF0wSR01ch9CXKonTEewh0ZoTSLQgxf2fk"></v-img>
          </v-avatar>
        </v-toolbar-title>

         <v-divider class="mx-4" inset vertical></v-divider>
        <v-col
         align-self="center"
          class="pa-5">
          <v-toolbar-title>
            <v-row    no-gutters>
              <v-icon x-large  class="mr-1">perm_identity</v-icon>
             <h1>Sergio Aguilera</h1>
            </v-row>
          </v-toolbar-title>
          <v-row    no-gutters>
             <v-icon class="mr-2 ml-1">email</v-icon>
            <h3>sergio_1396@hotmail.com</h3>
          </v-row>
          <v-row  class="mt-2"   no-gutters>
            <v-icon class="mr-2 ml-1" >work</v-icon>
            <h5>Software Developer</h5>
          </v-row>
        </v-col>
     
        <template v-slot:extension>
          <v-tabs
            v-model="tabUser"
            centered 
            slider-color="primary"
          >
            <v-tab key="One">
              Datos de Usuario
            </v-tab>
            <v-tab key="two">
              Calendario
            </v-tab>
            <v-tab key="Three">
              Notificaciones
            </v-tab>
           
          </v-tabs>
          
        </template>
     </v-toolbar>


    <template>
     <v-tabs-items 
      v-model="tabUser"
     >
      <v-tab-item
        key="One"
        transition= false
      >
        <v-card flat>
          <HelloWorld />
        </v-card>
      </v-tab-item>
      <v-tab-item
        key="two"
        transition= false
      >
        <v-card flat>
           <CalendarUser />
        </v-card>
      </v-tab-item>
      <v-tab-item
        key="Three"
        transition= false
      >
      
        <v-card flat>
           <CalendarUser />
        </v-card>
      </v-tab-item>
      </v-tabs-items >
    </template>
    
  </v-container>
  </v-app>
</template>


<script>
import Navbar from "@/components/General/Navbar";
import TabsUser from "@/components/User/TabsUser";
import HelloWorld from "@/components/HelloWorld";
import CalendarUser from "@/components/User/CalendarUser";

export default {
 name: "user",
 data() {
   return {
     count : 0,
     tabUser : null,
     
   }
 },

components: {
  Navbar,
  TabsUser,
  HelloWorld,
  CalendarUser,
}
}

</script>