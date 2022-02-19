<template>
  <v-app>
    <!-- Componente Navbar nagacion entre objectos y modulos -->
    <Navbar />
    <v-container>
         <!-- Componente Toolbar para header de visualizacion de objectos -->
        <ToolbarGeneral 
          :titleObject="titleObject" 
          :codeTitle="codeTitle" 
          :source="source" 
          :headersDetail="headersDetail"
          @listenerToolbar="toggleModal"  />  

        <v-card >
        <v-card-text v-for="itemGroup in propsGroup" style="padding : 15px;"  >
       
            <span class="text-h6" >{{itemGroup.name}} </span>
            <v-divider class="divider-group" ></v-divider>
            <v-container>
                <v-row>
                  
                    <!-- interaccion de campos de un determinado objecto -->
                    <v-col v-for="item in itemGroup.fields"
                        cols="12"
                        :sm="item.type == 3 ? null : item.columns == 1 ? '12' : item.columns == 2 ? '8' :'6' "
                        :md="item.type == 3 ? null : item.columns == 1 ? '12' : item.columns == 2 ? '6' :'4' ">

                        <!-- Validate if Type 1 -- text -->
                        <v-text-field
                         class="some-style"
                          v-if = "item.type == '1' "
                          :label="item.description+ (item.required == 1  ?' *' : '')"
                          :counter= item.number_charac 
                          :hint="item.hint == '' ? false : item.hint"
                          :value= item.value
                          readonly
                          disabled
                          dense
                          required>
                        </v-text-field>

                        <!-- Validate if Type 2 -- Email -->
                        <v-text-field
                        class="some-style"
                          v-else-if = "item.type == '2'"
                          prepend-icon="email"
                          :label="item.description+ (item.required == 1  ?' *' : '')"
                          :counter= item.number_charac 
                          :hint="item.hint == null ? '' : item.hint"
                          :value= item.value
                          readonly
                          disabled
                          dense
                          color = "#000000"
                          required>
                        </v-text-field>

                        <!-- Validate if Type 3 -- text Area -->
                         <v-textarea 
                         class="some-style"
                          v-else-if = "item.type == '3'"
                          :autocomplete= item.description
                          :value= item.value
                          readonly
                          auto-grow
                          :counter= item.number_charac
                          rows="2"
                          disabled
                          dense
                          :label="item.description+ (item.required == 1  ?' *' : '')"
                          :hint="item.hint == '' ? false : item.hint"
                          >
                        </v-textarea>

                        <!-- Validate if Type 4 -- Date -->
                        <v-menu
                          v-else-if = "item.type == '4'"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                             class="some-style"
                              :label="item.description+ (item.required == 1  ?' *' : '')"
                              prepend-icon="insert_invitation"
                              readonly
                              dense
                              disabled
                              :value= item.value
                              :hint="item.hint == '' ? false : item.hint"
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                        </v-menu>

                         <!-- Validate if Type 5 -- Number -->
                         <v-text-field
                         class="some-style"
                          v-else-if = "item.type == '5'"
                          :label="item.description+ (item.required == 1  ?' *' : '')"
                          :counter= item.number_charac
                          type="number"
                          :hint="item.hint == '' ? false : item.hint"
                          :value= item.value
                          readonly
                          disabled
                          dense
                          required>
                        </v-text-field>

                        <!-- Validate if Type 6 -- Decimal -->
                         <v-text-field
                         class="some-style"
                          v-else-if = "item.type == '6'"
                          :label="item.description+ (item.required == 1  ?' *' : '')"
                          counter= item.number_charac
                          :hint="item.hint == '' ? false : item.hint"
                          :value= item.value
                          readonly
                          disabled
                          dense
                          required>
                        </v-text-field>
                        
                        <v-divider ></v-divider>
                       
                    </v-col>
                </v-row>
            </v-container>
          </v-card-text>
      </v-card>

      <!-- Componente modal para creación y edicion de registros -->
      <FormGeneral :openModal="visibilityModal" :operationModel="operationModel"
        @listenerModal="toggleModal" />

    </v-container>
</v-app>
</template>

<script>
import Navbar from "@/components/General/Navbar";
import ToolbarGeneral from "@/components/General/ToolbarGeneral";
import FormGeneral from "@/components/General/FormGeneral";

//import mixins
import {apiMixins} from '@/mixins/apiMixins.js'

export default {
    name:"detailGeneral",
  data() {
      return {
          deta : 0,
          titleObject : "",
          valid : true,
          codeTitle : "",
          source : "detailGeneral",
          //Data object field -> value
          dataDetail : [],
          propsGroup : [],

          //params for modal
          visibilityModal: false,
          operationModel : { action: "", pk: "" },
          headersDetail: [
            { text: "Fecha de Creación", value: "", ico : "event_available"},
            {text: "Fecha de Modificación", value: "", ico : "restore"},
            {text: "creador", value: "", ico : "person"}
          ],

      }
  }, 
  async mounted() {
      await this.getDetailItem();
      this.structureDataField();
  },
   components: {
    ToolbarGeneral,
    FormGeneral,
    Navbar
  },
  methods: {
        async getDetailItem(){

            let dataPropListValues = await this.getpropertyFieldValuesObject(this.$route.params.idObject,this.$route.params.idDetail );

            if(dataPropListValues.code == 'OK'){
              this.dataDetail = dataPropListValues.data.data;
              this.titleObject = this.dataDetail[0]['representation'];
              this.codeTitle = this.$route.params.idDetail;

              //set values for component ToolbarGeneral
              this.headersDetail[0].value = dataPropListValues.data['created_date'];
              this.headersDetail[1].value = dataPropListValues.data['modified_date'];
              this.headersDetail[2].value = "sergio Aguilera";

            }
        },

        structureDataField(){
        
        let groupId = [];
        if(this.dataDetail ){
            this.propsGroup = [];
            let arrayTemp = [];
            let arrayGroup = [];
            let countData = this.dataDetail.length;
            let countInt = 0;
            

            this.dataDetail.forEach(ele => {                 
                let register = false;
                if ( ele.object_group.id != groupId.id && groupId.id != undefined  ){
                    
                    arrayGroup = groupId;
                    arrayGroup['fields']= arrayTemp;
                    //this.propsGroup[countInt] = arrayGroup ;
                    this.propsGroup.push( arrayGroup );
                    arrayTemp = [];
                    arrayGroup=[];
                    register = true;
                    //prueba = this.propsGroup;
                    
                }
                arrayTemp.push(ele);
                groupId = ele.object_group;
                countInt++;

                if(countInt == countData ){
                    arrayGroup = groupId;
                    arrayGroup['fields']= arrayTemp;
                    this.propsGroup.push( arrayGroup );
                    //this.propsGroup[countInt] = arrayGroup;
                    //prueba = this.propsGroup;
                }
            });


        }

        //console.log('final',this.propsGroup)
    },

    //Activate Modal the creation new item
    async toggleModal(action = "",pk="", save = false) {
      //Defined parms for model
      this.operationModel.action = action;
      this.operationModel.pk = pk;
      this.visibilityModal = !this.visibilityModal;

      if(save){
        await this.getDetailItem();
        this.structureDataField();
      }  

    }

  },
  mixins: [apiMixins]
  
}
</script>

<style scoped>

.some-style >>> .v-input__slot::before {
  border-style: none !important;
}

.divider-group{
  margin-bottom: 10px;
}


</style>

<style >

.theme--light.v-label--is-disabled{
  color: rgba(0, 0, 0, 0.87) !important;
  font-size: 18px;
}

.theme--light.v-input--is-disabled input, .theme--light.v-input--is-disabled textarea {
  color: rgb(0 0 0) !important;
}

.theme--light.v-input--is-disabled .v-input__prepend-outer{
  margin-top: 0px;

}

</style>