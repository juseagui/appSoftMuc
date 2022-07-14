<template>
  <v-app>
    <!-- Navbar component navigation between objects and modules -->
    <Navbar />
    <v-container>
         <!-- Toolbar component for object display header -->
      <ToolbarGeneral 
          :titleObject="titleObject" 
          :codeTitle="codeTitle" 
          :source="source" 
          :headersDetail="headersDetail"
          @listenerToolbar="toggleModal"  />  

      <TableDetail :dataField="propsGroup"  />

      <!-- Modal component for creating and editing records -->
      <FormGeneral :openModal="visibilityModal" :operationModel="operationModel" :idObject="actualObjectForm" 
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

         //parameters for the modal of edition and creation of objects
          visibilityModal: false,
          operationModel : { action: "", pk: "" },
          actualObjectForm : this.$route.params.idObject,
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

    /*---------------------------------------------------
    Name: getDetailItem
    Description: get item detail of item general object
    Alters component: TableDetail
    ---------------------------------------------------*/
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

    /*---------------------------------------------------
    Name: toggleModal
    Description: Activate Modal the creation new item
    Alters component: ToolbarGeneral
    ---------------------------------------------------*/
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
