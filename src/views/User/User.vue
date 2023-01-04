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
            <v-img src="https://avatars.githubusercontent.com/u/42414987?s=400&u=93512497d48b18e77ccb6c33ad1b22b171bf5694&v=4"></v-img>
          </v-avatar>
        </v-toolbar-title>

         <v-divider class="mx-4" inset vertical></v-divider>
        <v-col
         align-self="center"
          class="pa-5">
          <v-toolbar-title>
            <v-row    no-gutters>
              <v-icon x-large  class="mr-1">perm_identity</v-icon>
             <h1>{{lastNameUser}}</h1>
            </v-row>
          </v-toolbar-title>
          <v-row    no-gutters>
             <v-icon class="mr-2 ml-1">email</v-icon>
            <h3>{{emailUser}}</h3>
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
          <ToolbarGeneral 
          :titleObject="titleObject" 
          :codeTitle="codeTitle" 
          :source="source" 
          :headersDetail="headersDetail"
          @listenerToolbar="toggleModal"
          @listenerToolbarChangePassword="toggleModalChangePassword"  />

          <TableDetail :dataField="propsGroup"  />

          <!-- Componente modal para creación y edicion de registros -->
          <FormGeneral :openModal="visibilityModal" :operationModel="operationModel" :idObject="actualObjectForm" :source="source" :isRelationship="false"
          @listenerModal="toggleModal" />

          <FormChangePassword :openModal="visibilityChangePass" @listenerModal="toggleModalChangePassword"  />
          
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
        </v-card>
      </v-tab-item>
      </v-tabs-items >
    </template>
    
  </v-container>
  </v-app>
</template>


<script>
import Navbar from "@/components/General/Navbar";
import CalendarUser from "@/components/User/CalendarUser";
import ToolbarGeneral from "@/components/General/ToolbarGeneral";
import FormGeneral from "@/components/General/FormGeneral";
import TableDetail from "@/components/General/TableDetail";
import FormChangePassword from "@/components/User/FormChangePassword";

//import mixins
import {apiMixins} from '@/mixins/apiMixins.js'
import {processData} from '@/mixins/processData.js'

export default {
  name: "user",
  data() {
    return {
      count : 0,
      tabUser : null,
      codeTitle : "",
      titleObject : "",
      source : "detailUser",
      
      //Data object field -> value
      dataDetail : [],
      propsGroup : [],

      //params for modal
      visibilityModal: false,
      operationModel : { action: "", pk: "" },
      headersDetail: [
        {text: "Fecha de Creación", value: "", ico : "event_available", chip : false},
        {text: "Fecha de Modificación", value: "", ico : "restore", chip : false},
        {text: "creador", value: "", ico : "person", chip : true}
      ],
      actualObjectForm : this.$route.params.idObject,

      //params for modal change password
      visibilityChangePass : false,

      //data component
      emailUser : "",
      lastNameUser : "",
      
    }
  },
  async mounted(){
    this.lastNameUser = localStorage.getItem('last_name');
    this.emailUser = localStorage.getItem('email');
    await this.getDetailItem();
    this.propsGroup = this.structureDataField(this.dataDetail);
  },

  components: {
    Navbar,
    CalendarUser,
    ToolbarGeneral,
    FormGeneral,
    TableDetail,
    FormChangePassword
  },

  methods : {
    async getDetailItem(){

          let dataPropListValues = await this.getpropertyFieldValuesObject( this.$route.params.idObject, this.$route.params.idDetail );

          if(dataPropListValues.code == 'OK'){
            this.dataDetail = dataPropListValues.data.data;
            this.codeTitle = this.$route.params.idDetail;

            //set values for component ToolbarGeneral
            this.headersDetail[0].value = dataPropListValues.data['created_date'];
            this.headersDetail[1].value = dataPropListValues.data['modified_date'];
            this.headersDetail[2].value = "sergio Aguilera";

          }
      },

      /*---------------------------------------------------
      Name: toggleModal
      Description: Interact with user update modal
      Alters component: 
      ---------------------------------------------------*/

      async toggleModal(action = "edit",pk=this.codeTitle, save = false) {
        this.operationModel.action = action;
        this.operationModel.pk = pk;
        this.visibilityModal = !this.visibilityModal;
      },

      /*---------------------------------------------------
      Name: toggleModalChangePassword
      Description: Interact with change password modal
      Alters component: 
      ---------------------------------------------------*/
      async toggleModalChangePassword() {
        console.log("🚀 ~ file: User.vue:203 ~ toggleModalChangePassword ~ toggleModalChangePassword");
        this.visibilityChangePass = !this.visibilityChangePass;
      }

  },

  mixins: [apiMixins, processData]
}

</script>