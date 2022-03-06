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

      <TableDetail :dataField="propsGroup"  />

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
import TableDetail from "@/components/General/TableDetail";

//import mixins
import {apiMixins} from '@/mixins/apiMixins.js'
import {processData} from '@/mixins/processData.js'

export default {
  name:"detailGeneral",
  data() {
      return {
          titleObject : "",
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
      this.propsGroup = this.structureDataField(this.dataDetail);
  },
   components: {
    ToolbarGeneral,
    FormGeneral,
    Navbar,
    TableDetail
  },
  methods: {
      async getDetailItem(){

          let dataPropListValues = await this.getpropertyFieldValuesObject( this.$route.params.idObject, this.$route.params.idDetail );

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

    //Activate Modal the creation new item
    async toggleModal(action = "",pk="", save = false) {
      //Defined parms for model
      this.operationModel.action = action;
      this.operationModel.pk = pk;
      this.visibilityModal = !this.visibilityModal;

      if(save){
        await this.getDetailItem();
        this.structureDataField(this.dataDetail);
      }  
    }
  },
  mixins: [apiMixins, processData]
  
}
</script>
